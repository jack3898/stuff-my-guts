import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type Meal = {
	__typename?: 'Meal';
	about: Scalars['String'];
	id: Scalars['ID'];
	name: Scalars['String'];
	ownerId: Scalars['Int'];
};

export type Mutation = {
	__typename?: 'Mutation';
	authenticate?: Maybe<Scalars['String']>;
};

export type MutationAuthenticateArgs = {
	email: Scalars['String'];
	password: Scalars['String'];
};

export type Query = {
	__typename?: 'Query';
	meal?: Maybe<Meal>;
	meals?: Maybe<Array<Maybe<Meal>>>;
	user: User;
	users: Array<User>;
};

export type User = {
	__typename?: 'User';
	bio?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	email: Scalars['String'];
	firstname: Scalars['String'];
	id: Scalars['ID'];
	lastname: Scalars['String'];
	mealIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
	tel?: Maybe<Scalars['String']>;
	username: Scalars['String'];
};

export type MealsQueryVariables = Exact<{ [key: string]: never }>;

export type MealsQuery = {
	__typename?: 'Query';
	meals?: Array<{ __typename?: 'Meal'; id: string; name: string; about: string } | null> | null;
};

export type MealQueryVariables = Exact<{ [key: string]: never }>;

export type MealQuery = {
	__typename?: 'Query';
	meal?: { __typename?: 'Meal'; id: string; name: string; about: string } | null;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
	__typename?: 'Query';
	users: Array<{
		__typename?: 'User';
		id: string;
		firstname: string;
		lastname: string;
		bio?: string | null;
		country?: string | null;
		tel?: string | null;
	}>;
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = {
	__typename?: 'Query';
	user: {
		__typename?: 'User';
		id: string;
		firstname: string;
		lastname: string;
		bio?: string | null;
		country?: string | null;
		tel?: string | null;
	};
};

export type AuthenticateMutationVariables = Exact<{
	email: Scalars['String'];
	password: Scalars['String'];
}>;

export type AuthenticateMutation = { __typename?: 'Mutation'; authenticate?: string | null };

export const MealsDocument = gql`
	query Meals {
		meals {
			id
			name
			about
		}
	}
`;

/**
 * __useMealsQuery__
 *
 * To run a query within a React component, call `useMealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMealsQuery(
	baseOptions?: Apollo.QueryHookOptions<MealsQuery, MealsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<MealsQuery, MealsQueryVariables>(MealsDocument, options);
}
export function useMealsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<MealsQuery, MealsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<MealsQuery, MealsQueryVariables>(MealsDocument, options);
}
export type MealsQueryHookResult = ReturnType<typeof useMealsQuery>;
export type MealsLazyQueryHookResult = ReturnType<typeof useMealsLazyQuery>;
export type MealsQueryResult = Apollo.QueryResult<MealsQuery, MealsQueryVariables>;
export const MealDocument = gql`
	query Meal {
		meal {
			id
			name
			about
		}
	}
`;

/**
 * __useMealQuery__
 *
 * To run a query within a React component, call `useMealQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealQuery({
 *   variables: {
 *   },
 * });
 */
export function useMealQuery(baseOptions?: Apollo.QueryHookOptions<MealQuery, MealQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<MealQuery, MealQueryVariables>(MealDocument, options);
}
export function useMealLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<MealQuery, MealQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<MealQuery, MealQueryVariables>(MealDocument, options);
}
export type MealQueryHookResult = ReturnType<typeof useMealQuery>;
export type MealLazyQueryHookResult = ReturnType<typeof useMealLazyQuery>;
export type MealQueryResult = Apollo.QueryResult<MealQuery, MealQueryVariables>;
export const UsersDocument = gql`
	query Users {
		users {
			id
			firstname
			lastname
			bio
			country
			tel
		}
	}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
	baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
	query User {
		user {
			id
			firstname
			lastname
			bio
			country
			tel
		}
	}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const AuthenticateDocument = gql`
	mutation Authenticate($email: String!, $password: String!) {
		authenticate(email: $email, password: $password)
	}
`;
export type AuthenticateMutationFn = Apollo.MutationFunction<
	AuthenticateMutation,
	AuthenticateMutationVariables
>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthenticateMutation(
	baseOptions?: Apollo.MutationHookOptions<AuthenticateMutation, AuthenticateMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(
		AuthenticateDocument,
		options
	);
}
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = Apollo.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<
	AuthenticateMutation,
	AuthenticateMutationVariables
>;
