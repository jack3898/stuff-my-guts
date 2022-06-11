import prismaClient from '../prismaClient';

const users = [
	{
		id: 1,
		firstname: 'Jack',
		lastname: 'Wright',
		email: 'jack@email.com',
		oauth: 'askjhdkasjhd',
		tel: '192384',
		country: 'United Kingdom',
		bio: 'App maker!'
	},
	{
		id: 2,
		firstname: 'Justin',
		lastname: 'Collins',
		email: 'justin@email.com',
		oauth: 'ajshdkjas'
	}
];

export const usersSeeder = async () => {
	const progress = users.map((user) => {
		return prismaClient.user.create({ data: user });
	});

	await Promise.all(progress);

	return 'users';
};
