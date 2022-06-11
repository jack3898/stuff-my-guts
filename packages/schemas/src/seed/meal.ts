import prismaClient from '../prismaClient';

const meals = [
	{
		id: 1,
		name: 'Chicken Burgers',
		about: 'Come try em!',
		userId: 1
	}
];

export const mealsSeeder = async () => {
	const progress = meals.map((meal) => {
		return prismaClient.meal.create({ data: meal });
	});

	await Promise.all(progress);

	return 'meals';
};
