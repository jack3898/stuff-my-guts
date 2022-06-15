import { Prisma } from '@prisma/client';
import prismaClient from '../prismaClient';

const meals: Prisma.MealCreateArgs['data'][] = [
	{
		id: 1,
		name: 'Chicken Burgers',
		about: 'Come try em!',
		ownerId: 1
	}
];

export const mealsSeeder = async () => {
	const progress = meals.map((meal) => {
		return prismaClient.meal.create({ data: meal });
	});

	await Promise.all(progress);

	return 'meals';
};
