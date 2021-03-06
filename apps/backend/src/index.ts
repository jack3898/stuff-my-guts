import { customDirectives, paginateFindMany, resolvers, typeDefs } from '@smg/database';
import prismaClient from '@smg/database/src/prismaClient';
import { ApolloServer } from '@smg/graphql/apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@smg/graphql/apollo/server-core';
import { makeExecutableSchema } from '@smg/graphql/gql-tools/schema';
import { stitchSchemas } from '@smg/graphql/gql-tools/stitch';
import { stitchingDirectives } from '@smg/graphql/gql-tools/stitching-directives';
import { Context } from '@smg/graphql/types';
import cookie from 'cookie';
import env from 'dotenv';

env.config();

let mergedTypeDefs = stitchSchemas({
	subschemas: typeDefs.map((schemaItem) => ({
		schema: makeExecutableSchema({ typeDefs: schemaItem })
	})),
	subschemaConfigTransforms: [stitchingDirectives().stitchingDirectivesTransformer],
	resolvers,
	mergeDirectives: true
});

mergedTypeDefs = customDirectives.auth().directiveTransformer(mergedTypeDefs, 'auth');

const server = new ApolloServer({
	schema: mergedTypeDefs,
	csrfPrevention: true,
	plugins: [ApolloServerPluginLandingPageLocalDefault],
	cache: 'bounded',
	cors: {
		origin: process.env.CORS_ORIGIN,
		credentials: true
	},
	context: ({ req, res }) => {
		try {
			const token = cookie.parse(req.headers.cookie || '')['auth-token'];

			return {
				user: { token },
				client: prismaClient,
				paginateFindMany,
				req,
				res
			} as Context;
		} catch (error: any) {
			return null;
		}
	}
});

server.listen({ port: 3001 }).then(() => {
	console.log('Backend gateway online!');
});
