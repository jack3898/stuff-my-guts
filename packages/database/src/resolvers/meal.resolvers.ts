import prisma from '../prismaClient';

export const mealResolvers = {
	Query: {
		meal: () => {
			return prisma.meal.findFirst();
		},
		meals: () => {
			return prisma.meal.findMany();
		}
	}
};
