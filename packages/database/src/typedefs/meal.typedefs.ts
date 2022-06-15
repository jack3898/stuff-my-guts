import { gql } from 'apollo-server';

export const mealTypeDefs = gql`
	type Meal {
		id: ID!
		name: String!
		about: String!
		ownerId: Int!
	}

	type Query {
		meal: Meal
		meals: [Meal]
	}
`;
