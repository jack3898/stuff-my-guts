import { Resolvers } from '../generated/graphql';

export const mealResolvers: Resolvers = {
	Query: {
		meals: (root, input, { client }) => {
			return client.meal.findMany({ where: { ownerId: input.ownerId } });
		}
	}
};
