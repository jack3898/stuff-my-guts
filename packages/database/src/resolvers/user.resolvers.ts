import { ROOT } from '@mealideas/paths';
import {
	createUserValidation,
	updateUserValidation
} from '@mealideas/validation/src/user.validation';
import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import path from 'path';
import { Context } from '../../types/Context';
import prisma from '../prismaClient';

dotenv.config({
	path: path.resolve(ROOT, '.env')
});

type AuthenticateInput = {
	email: string;
	password: string;
};

type CreateInput = {
	email: string;
	username: string;
	firstname: string;
	lastname: string;
	password: string;
};

type UpdateAccountInput = {
	newEmail?: string;
	newPassword?: string;
	currentPassword: string;
	token: string;
};

export const userResolvers = {
	Query: {
		user: () => {
			return prisma.user.findFirst();
		},
		users: () => {
			return prisma.user.findMany();
		}
	},
	Mutation: {
		authenticate: async (root: unknown, input: AuthenticateInput, context: Context) => {
			const user = await prisma.user.findFirst({ where: { email: input.email } });
			const validPassword = await bcrypt.compare(input.password, String(user?.password));

			if (user && validPassword) {
				const { id, username, firstname, lastname, email, bio, country, tel } = user;

				const token = jwt.sign(
					{
						id,
						username,
						firstname,
						lastname,
						email,
						bio,
						country,
						tel
					},
					process.env.JWT_SECRET!,
					{}
				);

				context.res.cookie('auth-token', token, { sameSite: 'none', secure: true });

				return true;
			}

			throw new AuthenticationError('Invalid email and/or password!');
		},
		create: async (root: unknown, input: CreateInput) => {
			const salt = await bcrypt.genSalt(11);
			const hashedPassword = await bcrypt.hash(input.password, salt);

			await createUserValidation.validate(input);

			const { email, username, firstname, lastname } = input;

			const createdUser = await prisma.user.create({
				data: { email, firstname, lastname, password: hashedPassword, username }
			});

			return !!createdUser;
		},
		updateAccount: async (root: unknown, input: UpdateAccountInput) => {
			const validJwt = jwt.verify(input.token, process.env.JWT_SECRET!) as {
				id: number;
				password: string;
			};

			const currentUser = await prisma.user.findFirst({
				select: { password: true, email: true },
				where: { id: validJwt.id }
			});

			await updateUserValidation.validate(input);

			const validPassword = await bcrypt.compare(
				input.currentPassword,
				String(currentUser?.password)
			);

			if (!validPassword || !currentUser) {
				throw new AuthenticationError('Invalid password!');
			}

			const { newEmail, newPassword } = input;

			if (
				(newPassword !== currentUser.password || newEmail !== currentUser.email) &&
				validJwt.id
			) {
				const salt = await bcrypt.genSalt(11);
				const newHashedPassword = newPassword
					? await bcrypt.hash(newPassword, salt)
					: currentUser.password;

				await prisma.user.update({
					where: {
						id: validJwt.id
					},
					data: {
						password: newHashedPassword,
						email: newEmail
					}
				});
			}

			return true;
		}
	}
};
