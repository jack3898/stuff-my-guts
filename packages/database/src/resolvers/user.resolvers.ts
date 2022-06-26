import { createHash, verifyHash } from '@mealideas/utils/src/node/hash';
import { decodeJwt, signJwt } from '@mealideas/utils/src/node/jwt';
import {
	createUserValidation,
	updateUserValidation
} from '@mealideas/validation/src/user.validation';
import { AuthenticationError } from 'apollo-server';
import type { Resolvers } from '../generated/graphql';

export const userResolvers: Resolvers = {
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
			const validJwt = decodeJwt<{ id: number; password: string }>(input.token);

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
