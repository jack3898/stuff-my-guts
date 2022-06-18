import { ROOT } from '@mealideas/paths';
import { AuthenticationError } from 'apollo-server';
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
			const user = await prisma.user.findFirst({ where: { email, password } });

			if (user) {
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
		) =>
			new Promise((resolve, reject) => {
				prisma.user
					.create({
						data: { email, firstname, lastname, password, username } // TODO: use bCrypt
					})
					.then((user) => resolve(!!user))
					.catch(reject);
			})
	}
};
