import { gql } from 'apollo-server';

export const userTypeDefs = gql`
	directive @auth on OBJECT

	type User @auth {
		id: ID!
		firstname: String!
		lastname: String!
		username: String!
		email: String!
		tel: String
		country: String
		bio: String
		mealIds: [Int]
	}

	type Query {
		users: [User!]!
		user: User!
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
`;
