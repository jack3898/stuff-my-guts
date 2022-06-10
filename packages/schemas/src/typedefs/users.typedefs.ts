import { gql } from 'apollo-server';

export const usersTypeDefs = gql`
	type User {
		email: String!
		name: String
	}

	type Query {
		users: [User!]!
	}
`;
