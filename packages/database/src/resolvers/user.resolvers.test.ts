import { AuthenticationError } from 'apollo-server';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

jest.mock('../prismaClient', () => ({
	__esModule: true,
	default: {
		user: {
			findFirst: () => Promise.resolve(testData()),
			create: () => Promise.resolve(testData()),
			update: () => Promise.resolve(true)
		}
	}
}));

describe('user resolver', () => {
	afterAll(() => jest.clearAllMocks());

	it.todo('should find a user by id');

	it.todo('should find a user by username');

	it.todo('should find multiple users');

	it.todo('should paginate when there are lots of users');

	it.todo('should return null when no user is found');

	it.todo('should return null when no users are found');

	it('should authenticate a user', async () => {
		const result = await userResolvers.Mutation.authenticate(null, {
			email: 'email',
			password: 'password123'
		});

		const verify = jwt.verify(result, process.env.JWT_SECRET!) as JwtPayload;

		expect(verify.id).toBe(1);
	});

	it('should throw an AuthenticationError when invalid credentials are provided', async () => {
		const result = userResolvers.Mutation.authenticate(null, {
			email: 'email',
			password: 'invalid password!'
		});

		expect(result).rejects.toThrow(AuthenticationError);
	});

	it('should create a new user', async () => {
		const result = userResolvers.Mutation.create(null, {
			email: 'email@email.com',
			firstname: 'First',
			lastname: 'Last',
			password: 'password!',
			username: 'username'
		});

		expect(result).resolves.toStrictEqual(true);
	});

	it("should validate a new user's details", async () => {
		const result = userResolvers.Mutation.create(null, {
			email: 'email@email.com',
			firstname: 'First',
			lastname: 'Last',
			password: 'short',
			username: 'username'
		});

		expect(result).rejects.toThrow(ValidationError);
		expect(result).rejects.toHaveProperty('message', 'Password is too short');
	});

	it('should edit a current user', async () => {
		const result = userResolvers.Mutation.updateAccount(null, {
			token: process.env.TEST_JWT!,
			newPassword: 'newpassword!',
			currentPassword: 'password123',
			newEmail: 'email2@email.com'
		});

		expect(result).resolves.toBe(true);
	});

	it('should validate an edited user', async () => {
		const result = userResolvers.Mutation.updateAccount(null, {
			token: process.env.TEST_JWT!,
			newPassword: 'newpassword!',
			currentPassword: 'password123',
			newEmail: 'invalidemail'
		});

		expect(result).rejects.toThrow(ValidationError);
		expect(result).rejects.toHaveProperty('message', 'Invalid email address');
	});
});
