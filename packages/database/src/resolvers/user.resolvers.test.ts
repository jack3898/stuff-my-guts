import { AuthenticationError } from '@smg/graphql/apollo/server';
import { ValidationError } from 'yup';
import { userResolvers } from './user.resolvers';

function testData() {
	// Must be function as jest.mock hoists
	return {
		id: 1,
		username: 'username',
		firstname: 'First',
		lastname: 'Last',
		email: 'email@email.com',
		bio: 'Bio!',
		country: 'Country!',
		tel: '00000000000',
		password: process.env.TEST_HASH
	};
}

const client = {
	user: {
		findFirst: () => Promise.resolve(testData()),
		create: () => Promise.resolve(testData()),
		update: () => Promise.resolve(true)
	}
};

const cookieMock = jest.fn(() => {});

describe('user resolver', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should authenticate a user', async () => {
		// @ts-ignore
		const result = await userResolvers.Mutation.authenticate(
			null,
			{
				email: 'email',
				password: 'password123'
			},
			{ res: { cookie: cookieMock }, client } as any
		);

		expect(cookieMock).toBeCalledWith(
			'auth-token',
			expect.stringContaining(''), // Any string
			expect.objectContaining({ sameSite: 'none', secure: true })
		);
		expect(result).toBe(true);
	});

	it('should throw an AuthenticationError when invalid credentials are provided', async () => {
		// @ts-ignore
		const result = userResolvers.Mutation.authenticate(
			null,
			{
				email: 'email',
				password: 'invalid password!'
			},
			{ res: { cookie: cookieMock }, client } as any
		);

		expect(result).rejects.toThrow(AuthenticationError);
	});

	it('should create a new user', async () => {
		// @ts-ignore
		const result = userResolvers.Mutation.create(
			null,
			{
				email: 'email@email.com',
				firstname: 'First',
				lastname: 'Last',
				password: 'password!',
				username: 'username'
			},
			{ client } as any
		);

		expect(result).resolves.toStrictEqual(true);
	});

	it("should validate a new user's details", async () => {
		// @ts-ignore
		const result = userResolvers.Mutation.create(
			null,
			{
				email: 'email@email.com',
				firstname: 'First',
				lastname: 'Last',
				password: 'short',
				username: 'username'
			},
			{ client } as any
		);

		expect(result).rejects.toThrow(ValidationError);
		expect(result).rejects.toHaveProperty('message', 'Password is too short');
	});

	it('should edit a current user', async () => {
		// @ts-ignore
		const result = userResolvers.Mutation.updateAccount(
			null,
			{
				token: process.env.TEST_JWT!,
				newPassword: 'newpassword!',
				currentPassword: 'password123',
				newEmail: 'email2@email.com'
			},
			{ client } as any
		);

		expect(result).resolves.toBe(true);
	});

	it('should validate an edited user', async () => {
		// @ts-ignore
		const result = userResolvers.Mutation.updateAccount(
			null,
			{
				token: process.env.TEST_JWT!,
				newPassword: 'newpassword!',
				currentPassword: 'password123',
				newEmail: 'invalidemail'
			},
			{ client } as any
		);

		expect(result).rejects.toThrow(ValidationError);
		expect(result).rejects.toHaveProperty('message', 'Invalid email address');
	});
});
