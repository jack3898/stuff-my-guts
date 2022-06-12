import { gql } from 'apollo-server';

export const userTypeDefs = gql`
	type User {
		id: ID!
		firstname: String!
		lastname: String!
		email: String!
		tel: String
		country: String
		bio: String
	}

	type Query {
		users: [User!]!
		user: User!
	}

	type Mutation {
		authenticate(email: String!, password: String!): String
	}
`;
