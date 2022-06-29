import { Resolvers } from '@smg/graphql/codegen/backend';

export const mealResolvers: Resolvers = {
	Query: {
		meals: (root, input, { client }) => {
			return client.meal.findMany({ where: { ownerId: input.ownerId } });
		}
	}
};
