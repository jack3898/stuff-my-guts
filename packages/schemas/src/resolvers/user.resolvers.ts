import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';

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
			const user = await prisma.user.findFirst({ where: { email, oauth: password } });

			if (user) {
				return jwt.sign({ data: email }, 'omg!');
			}

			throw new AuthenticationError('Invalid username and/or password!');
		}
	}
};
