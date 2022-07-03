import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
	Date: ResolverTypeWrapper<Scalars['Date']>;
	ID: ResolverTypeWrapper<Scalars['ID']>;
	Int: ResolverTypeWrapper<Scalars['Int']>;
	Meal: ResolverTypeWrapper<Meal>;
	MealEdge: ResolverTypeWrapper<MealEdge>;
	MealEdges: ResolverTypeWrapper<MealEdges>;
	Mutation: ResolverTypeWrapper<{}>;
	PageInfo: ResolverTypeWrapper<PageInfo>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']>;
	User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars['Boolean'];
	Date: Scalars['Date'];
	ID: Scalars['ID'];
	Int: Scalars['Int'];
	Meal: Meal;
	MealEdge: MealEdge;
	MealEdges: MealEdges;
	Mutation: {};
	PageInfo: PageInfo;
	Query: {};
	String: Scalars['String'];
	User: User;
};

export type AuthDirectiveArgs = {};

export type AuthDirectiveResolver<
	Result,
	Parent,
	ContextType = Context,
	Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
	name: 'Date';
}

export type MealResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Meal'] = ResolversParentTypes['Meal']
> = {
	about?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	created?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	updated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MealEdgeResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['MealEdge'] = ResolversParentTypes['MealEdge']
> = {
	cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	node?: Resolver<Maybe<ResolversTypes['Meal']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MealEdgesResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['MealEdges'] = ResolversParentTypes['MealEdges']
> = {
	edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['MealEdge']>>>, ParentType, ContextType>;
	pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
	authenticate?: Resolver<
		Maybe<ResolversTypes['Boolean']>,
		ParentType,
		ContextType,
		RequireFields<MutationAuthenticateArgs, 'email' | 'password'>
	>;
	create?: Resolver<
		Maybe<ResolversTypes['Boolean']>,
		ParentType,
		ContextType,
		RequireFields<
			MutationCreateArgs,
			'email' | 'firstname' | 'lastname' | 'password' | 'username'
		>
	>;
	updateAccount?: Resolver<
		Maybe<ResolversTypes['Boolean']>,
		ParentType,
		ContextType,
		RequireFields<MutationUpdateAccountArgs, 'currentPassword' | 'token'>
	>;
};

export type PageInfoResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
	endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
	hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
	startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	loggedInUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
	meal?: Resolver<
		Maybe<ResolversTypes['Meal']>,
		ParentType,
		ContextType,
		RequireFields<QueryMealArgs, 'id'>
	>;
	meals?: Resolver<
		Maybe<ResolversTypes['MealEdges']>,
		ParentType,
		ContextType,
		RequireFields<QueryMealsArgs, 'ownerId'>
	>;
	user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
	users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
	bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	created?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
	email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	mealIds?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
	tel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	updated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
	username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
	Date?: GraphQLScalarType;
	Meal?: MealResolvers<ContextType>;
	MealEdge?: MealEdgeResolvers<ContextType>;
	MealEdges?: MealEdgesResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	PageInfo?: PageInfoResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
	auth?: AuthDirectiveResolver<any, any, ContextType>;
};
