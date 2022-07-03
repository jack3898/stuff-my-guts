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
	Date: any;
};

export type Meal = {
	__typename?: 'Meal';
	about: Scalars['String'];
	created: Scalars['Date'];
	id: Scalars['ID'];
	image?: Maybe<Scalars['String']>;
	name: Scalars['String'];
	ownerId: Scalars['ID'];
	updated: Scalars['Date'];
};

export type MealEdge = {
	__typename?: 'MealEdge';
	cursor?: Maybe<Scalars['String']>;
	node?: Maybe<Meal>;
};

export type MealEdges = {
	__typename?: 'MealEdges';
	edges?: Maybe<Array<Maybe<MealEdge>>>;
	pageInfo: PageInfo;
};

export type Mutation = {
	__typename?: 'Mutation';
	authenticate?: Maybe<Scalars['Boolean']>;
	create?: Maybe<Scalars['Boolean']>;
	updateAccount?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticateArgs = {
	email: Scalars['String'];
	password: Scalars['String'];
};

export type MutationCreateArgs = {
	email: Scalars['String'];
	firstname: Scalars['String'];
	lastname: Scalars['String'];
	password: Scalars['String'];
	username: Scalars['String'];
};

export type MutationUpdateAccountArgs = {
	currentPassword: Scalars['String'];
	newEmail?: InputMaybe<Scalars['String']>;
	newPassword?: InputMaybe<Scalars['String']>;
	token: Scalars['String'];
};

export type PageInfo = {
	__typename?: 'PageInfo';
	endCursor?: Maybe<Scalars['String']>;
	hasNextPage?: Maybe<Scalars['Boolean']>;
	hasPreviousPage?: Maybe<Scalars['Boolean']>;
	startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
	__typename?: 'Query';
	loggedInUser?: Maybe<User>;
	meal?: Maybe<Meal>;
	meals?: Maybe<MealEdges>;
	user: User;
	users: Array<User>;
};

export type QueryMealArgs = {
	id: Scalars['ID'];
};

export type QueryMealsArgs = {
	after?: InputMaybe<Scalars['String']>;
	first?: InputMaybe<Scalars['Int']>;
	ownerId: Scalars['ID'];
};

export type User = {
	__typename?: 'User';
	bio?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	created: Scalars['Date'];
	email: Scalars['String'];
	firstname: Scalars['String'];
	id: Scalars['ID'];
	lastname: Scalars['String'];
	mealIds?: Maybe<Array<Scalars['ID']>>;
	tel?: Maybe<Scalars['String']>;
	updated: Scalars['Date'];
	username: Scalars['String'];
};

export type AuthenticateMutationVariables = Exact<{
	email: Scalars['String'];
	password: Scalars['String'];
}>;

export type AuthenticateMutation = { __typename?: 'Mutation'; authenticate?: boolean | null };

export type CreateUserMutationVariables = Exact<{
	email: Scalars['String'];
	username: Scalars['String'];
	firstname: Scalars['String'];
	lastname: Scalars['String'];
	password: Scalars['String'];
}>;

export type CreateUserMutation = { __typename?: 'Mutation'; create?: boolean | null };

export type EditUserMutationVariables = Exact<{
	currentPassword: Scalars['String'];
	token: Scalars['String'];
	newEmail?: InputMaybe<Scalars['String']>;
	newPassword?: InputMaybe<Scalars['String']>;
}>;

export type EditUserMutation = { __typename?: 'Mutation'; updateAccount?: boolean | null };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never }>;

export type LoggedInUserQuery = {
	__typename?: 'Query';
	loggedInUser?: {
		__typename?: 'User';
		id: string;
		username: string;
		email: string;
		firstname: string;
		lastname: string;
		created: any;
		updated: any;
		bio?: string | null;
		country?: string | null;
		tel?: string | null;
	} | null;
};

export type MealsQueryVariables = Exact<{
	ownerId: Scalars['ID'];
	after?: InputMaybe<Scalars['String']>;
}>;

export type MealsQuery = {
	__typename?: 'Query';
	meals?: {
		__typename?: 'MealEdges';
		edges?: Array<{
			__typename?: 'MealEdge';
			cursor?: string | null;
			node?: {
				__typename?: 'Meal';
				id: string;
				name: string;
				about: string;
				created: any;
				updated: any;
				ownerId: string;
			} | null;
		} | null> | null;
		pageInfo: {
			__typename?: 'PageInfo';
			startCursor?: string | null;
			endCursor?: string | null;
			hasNextPage?: boolean | null;
			hasPreviousPage?: boolean | null;
		};
	} | null;
};

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
export const CreateUserDocument = gql`
	mutation CreateUser(
		$email: String!
		$username: String!
		$firstname: String!
		$lastname: String!
		$password: String!
	) {
		create(
			email: $email
			username: $username
			firstname: $firstname
			lastname: $lastname
			password: $password
		)
	}
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
	CreateUserMutation,
	CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
	baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
		CreateUserDocument,
		options
	);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
	CreateUserMutation,
	CreateUserMutationVariables
>;
export const EditUserDocument = gql`
	mutation EditUser(
		$currentPassword: String!
		$token: String!
		$newEmail: String
		$newPassword: String
	) {
		updateAccount(
			currentPassword: $currentPassword
			token: $token
			newEmail: $newEmail
			newPassword: $newPassword
		)
	}
`;
export type EditUserMutationFn = Apollo.MutationFunction<
	EditUserMutation,
	EditUserMutationVariables
>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      token: // value for 'token'
 *      newEmail: // value for 'newEmail'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useEditUserMutation(
	baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(
		EditUserDocument,
		options
	);
}
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<
	EditUserMutation,
	EditUserMutationVariables
>;
export const LoggedInUserDocument = gql`
	query LoggedInUser {
		loggedInUser {
			id
			username
			email
			firstname
			lastname
			created
			updated
			bio
			country
			tel
		}
	}
`;

/**
 * __useLoggedInUserQuery__
 *
 * To run a query within a React component, call `useLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInUserQuery(
	baseOptions?: Apollo.QueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(
		LoggedInUserDocument,
		options
	);
}
export function useLoggedInUserLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(
		LoggedInUserDocument,
		options
	);
}
export type LoggedInUserQueryHookResult = ReturnType<typeof useLoggedInUserQuery>;
export type LoggedInUserLazyQueryHookResult = ReturnType<typeof useLoggedInUserLazyQuery>;
export type LoggedInUserQueryResult = Apollo.QueryResult<
	LoggedInUserQuery,
	LoggedInUserQueryVariables
>;
export const MealsDocument = gql`
	query Meals($ownerId: ID!, $after: String) {
		meals(ownerId: $ownerId, first: 5, after: $after) {
			edges {
				cursor
				node {
					id
					name
					about
					created
					updated
					ownerId
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
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
 *      ownerId: // value for 'ownerId'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useMealsQuery(
	baseOptions: Apollo.QueryHookOptions<MealsQuery, MealsQueryVariables>
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
