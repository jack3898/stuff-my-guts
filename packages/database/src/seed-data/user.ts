import { Prisma } from '@prisma/client';
import { userResolvers } from '../resolvers/user.resolvers';

const users: Prisma.UserCreateArgs['data'][] = [
	{
		firstname: 'Jack',
		lastname: 'Wright',
		username: 'jack',
		email: 'jack@email.com',
		password: 'password123',
		country: 'United Kingdom',
		bio: 'Made the app.'
	},
	{
		firstname: 'Justin',
		lastname: 'Collinsonemundo',
		username: 'jman123',
		email: 'justin@email.com',
		password: 'justin123',
		bio: 'Author of the famous novel: How to accept that not being cool is a way of life.'
	},
	{
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
		// @ts-ignore create does exist
		return userResolvers.Mutation.create(null, user);
	});

	await Promise.all(progress);

	return 'users';
};
