import prisma from '../prismaClient';

export const usersResolvers = {
	Query: {
		users: () => {
			return prisma.users.findMany();
		}
	}
};
