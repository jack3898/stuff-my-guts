import prisma from '../prismaClient';

export const userResolvers = {
	Query: {
		user: () => {
			return prisma.user.findFirst();
		},
		users: () => {
			return prisma.user.findMany();
		}
	}
};
