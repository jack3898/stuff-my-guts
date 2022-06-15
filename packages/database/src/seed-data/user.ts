import { Prisma } from '@prisma/client';
import prismaClient from '../prismaClient';

const users: Prisma.UserCreateArgs['data'][] = [
	{
		id: 1,
		firstname: 'Jack',
		lastname: 'Wright',
		username: 'jack',
		email: 'jack@email.com',
		password: 'password123',
		country: 'United Kingdom',
		bio: 'Made the app.'
	},
	{
		id: 2,
		firstname: 'Justin',
		lastname: 'Collinsonemundo',
		username: 'jman123',
		email: 'justin@email.com',
		password: 'justin123',
		bio: 'Author of the famous novel: How to accept that not being cool is a way of life.'
	},
	{
		id: 3,
		firstname: 'Amy',
		lastname: 'Doobenshlinerando',
		username: 'ayitmee',
		email: 'amy.d00benshl1nerrandenator@email.com',
		password: 'dispassissecure',
		bio: 'I like running aimlessly in car parks.'
	}
];

export const usersSeeder = async () => {
	const progress = users.map((user) => {
		return prismaClient.user.create({ data: user });
	});

	await Promise.all(progress);

	return 'users';
};
