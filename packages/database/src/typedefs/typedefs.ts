import { gql } from '@smg/graphql/apollo/server';

export const typeDefs = gql`
	scalar Date
	directive @auth on OBJECT
	directive @auth on FIELD_DEFINITION

	# ROOT

	type Query {
		users: [User!]!
		user: User! @auth
		loggedInUser: User @auth
		meal(id: ID!): Meal
		meals(ownerId: ID!, first: Int, after: String): MealEdges
	}

	type Mutation {
		authenticate(email: String!, password: String!): Boolean
		create(
			email: String!
			username: String!
			firstname: String!
			lastname: String!
			password: String!
		): Boolean
		updateAccount(
			newEmail: String
			newPassword: String
			currentPassword: String!
			token: String!
		): Boolean
	}

	# PAGINATION

	type PageInfo {
		startCursor: String
		endCursor: String
		hasNextPage: Boolean
		hasPreviousPage: Boolean
	}

	# TYPES

	type User {
		id: ID!
		firstname: String!
		lastname: String!
		username: String!
		email: String!
		tel: String
		country: String
		bio: String
		created: Date!
		updated: Date!
		mealIds: [ID!]
	}

	type MealEdge {
		cursor: String
		node: Meal
	}

	type MealEdges @auth {
		edges: [MealEdge]
		pageInfo: PageInfo!
	}

	type Meal @auth {
		id: ID!
		name: String!
		about: String!
		image: String
		created: Date!
		updated: Date!
		ownerId: ID!
	}
`;
