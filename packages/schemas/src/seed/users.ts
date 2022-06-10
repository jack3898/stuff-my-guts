import prismaClient from '../prismaClient';

const users = [
	{
		id: 1,
		name: 'Jack Wright',
		email: 'jack@email.com'
	},
	{
		id: 2,
		name: 'Justin Collins',
		email: 'justin@email.com'
	},
	{
		id: 3,
		name: 'Clara Williams',
		email: 'clara@email.com'
	},
	{
		id: 4,
		name: 'Eduardo Little',
		email: 'eduardo@email.com'
	},
	{
		id: 5,
		name: 'Jay Byrd',
		email: 'jay@email.com'
	},
	{
		id: 6,
		name: 'Bella Kennedy',
		email: 'bella@email.com'
	},
	{
		id: 7,
		name: 'Becky Jacobs',
		email: 'becky@email.com'
	}
];

export const usersSeeder = async () => {
	const progress = users.map((user) => {
		return prismaClient.users.create({ data: user });
	});

	await Promise.all(progress);

	return 'users';
};
