import { ROOT } from '@mealideas/paths';
import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import path from 'path';
import prisma from '../prismaClient';

dotenv.config({
	path: path.resolve(ROOT, '.env')
});

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
		authenticate: async (
			root: unknown,
			{ email, password }: { email: string; password: string }
		) => {
			const user = await prisma.user.findFirst({ where: { email } });
			const validPassword = await bcrypt.compare(password, String(user?.password));

			if (user && validPassword) {
				return jwt.sign(
					{
						firstname: user.firstname,
						lastname: user.lastname
					},
					process.env.JWT_SECRET!,
					{}
				);
			}

			throw new AuthenticationError('Invalid email and/or password!');
		},
		create: async (
			root: unknown,
			{
				email,
				username,
				firstname,
				lastname,
				password
			}: {
				email: string;
				username: string;
				firstname: string;
				lastname: string;
				password: string;
			}
		) => {
			try {
				const salt = await bcrypt.genSalt(11);
				const hashedPassword = await bcrypt.hash(password, salt);

				const user = await prisma.user.create({
					data: { email, firstname, lastname, password: hashedPassword, username }
				});

				return !!user;
			} catch (error: any) {
				throw Error(error);
			}
		}
	}
};
