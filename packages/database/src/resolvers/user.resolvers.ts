import { AuthenticationError } from '@smg/graphql/apollo/server';
import type { Resolvers } from '@smg/graphql/codegen/backend';
import { createHash, verifyHash } from '@smg/utils/src/node/hash';
import { decodeJwt, signJwt } from '@smg/utils/src/node/jwt';
import { createUserValidation, updateUserValidation } from '@smg/validation/src/user.validation';

export const userResolvers: Resolvers = {
	Query: {
		current: async (root, input, { client, req }) => {
			const userToken: string = req.cookies['auth-token'];
			const { id } = decodeJwt<{ id: string }>(userToken);

			const currentUser = await client.user.findFirst({
				where: { id: id }
			});

			if (!currentUser) {
				throw Error('User not found!');
			}

			return currentUser;
		}
	},
	Mutation: {
		authenticate: async (root, input, { res, client }) => {
			const user = await client.user.findFirst({ where: { email: input.email } });
			const validPassword = await verifyHash(input.password, user?.password);

			if (user && validPassword) {
				const { id, username, firstname, lastname, email, bio, country, tel } = user;

				const token = signJwt({
					id,
					username,
					firstname,
					lastname,
					email,
					bio,
					country,
					tel
				});

				res.cookie('auth-token', token, { sameSite: 'none', secure: true });

				return true;
			}

			throw new AuthenticationError('Invalid email and/or password!');
		},
		create: async (root, input, { client }) => {
			const hashedPassword = await createHash(input.password);

			await createUserValidation.validate(input);

			const { email, username, firstname, lastname } = input;

			const createdUser = await client.user.create({
				data: { email, firstname, lastname, password: hashedPassword, username }
			});

			return !!createdUser;
		},
		updateAccount: async (root, input, { client }) => {
			const validJwt = decodeJwt<{ id: string; password: string }>(input.token);

			const currentUser = await client.user.findFirst({
				select: { password: true, email: true },
				where: { id: validJwt.id }
			});

			const validatedInput = await updateUserValidation.validate(input);
			const validPassword = await verifyHash(input.currentPassword, currentUser?.password);

			if (!validPassword || !currentUser) {
				throw new AuthenticationError('Invalid password!');
			}

			const { newEmail, newPassword } = validatedInput;
			const newCredentialsAreUniqe =
				newPassword !== currentUser.password || newEmail !== currentUser.email;

			if (!newCredentialsAreUniqe && !validJwt.id) {
				return true;
			}

			const newHashedPassword = newPassword
				? await createHash(newPassword)
				: currentUser.password;

			await client.user.update({
				where: { id: validJwt.id },
				data: { password: newHashedPassword, email: newEmail }
			});

			return true;
		}
	}
};
