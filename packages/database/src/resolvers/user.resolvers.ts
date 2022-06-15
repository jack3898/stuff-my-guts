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
				return jwt.sign({ data: email }, process.env.JWT_SECRET!);
			}

			throw new AuthenticationError('Invalid email and/or password!');
		}
	}
};
