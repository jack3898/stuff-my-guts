import rootenv from '@mealideas/utils/src/node/env';
import { createHash, verifyHash } from '@mealideas/utils/src/node/hash';
import { decodeJwt } from '@mealideas/utils/src/node/jwt';
import {
	createUserValidation,
	updateUserValidation
} from '@mealideas/validation/src/user.validation';
import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { Context } from '../../types/Context';
import prisma from '../prismaClient';

rootenv();

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
		authenticate: async (root: unknown, input: AuthenticateInput, { res, client }: Context) => {
			const user = await client.user.findFirst({ where: { email: input.email } });
			const validPassword = await verifyHash(input.password, user?.password);

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

				res.cookie('auth-token', token, { sameSite: 'none', secure: true });

				return true;
			}

			throw new AuthenticationError('Invalid email and/or password!');
		},
		create: async (root: unknown, input: CreateInput, { client }: Context) => {
			const hashedPassword = await createHash(input.password);

			await createUserValidation.validate(input);

			const { email, username, firstname, lastname } = input;

			const createdUser = await client.user.create({
				data: { email, firstname, lastname, password: hashedPassword, username }
			});

			return !!createdUser;
		},
		updateAccount: async (root: unknown, input: UpdateAccountInput, { client }: Context) => {
			const validJwt = decodeJwt<{ id: number; password: string }>(input.token);

			const currentUser = await client.user.findFirst({
				select: { password: true, email: true },
				where: { id: validJwt.id }
			});

			await updateUserValidation.validate(input);

			const validPassword = await verifyHash(input.currentPassword, currentUser?.password);

			if (!validPassword || !currentUser) {
				throw new AuthenticationError('Invalid password!');
			}

			const { newEmail, newPassword } = input;

			if (
				(newPassword !== currentUser.password || newEmail !== currentUser.email) &&
				validJwt.id
			) {
				const newHashedPassword = newPassword
					? await createHash(newPassword)
					: currentUser.password;

				await client.user.update({
					where: { id: validJwt.id },
					data: { password: newHashedPassword, email: newEmail }
				});
			}

			return true;
		}
	}
};
