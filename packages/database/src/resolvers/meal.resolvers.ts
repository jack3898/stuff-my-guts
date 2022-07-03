import { Resolvers } from '@smg/graphql/codegen/backend';

export const mealResolvers: Resolvers = {
	Query: {
		// @ts-ignore
		meals: (root, input, { client, paginateFindMany }) => {
			return paginateFindMany(
				client.meal,
				{ where: { ownerId: input.ownerId } },
				{ first: input.first, after: input.after }
			);
		}
	}
};
