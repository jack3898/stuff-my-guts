import { customDirectives, resolvers, typeDefs } from '@smg/database';
import prismaClient from '@smg/database/src/prismaClient';
import { ApolloServer } from '@smg/graphql/apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@smg/graphql/apollo/server-core';
import { makeExecutableSchema } from '@smg/graphql/gql-tools/schema';
import { stitchSchemas } from '@smg/graphql/gql-tools/stitch';
import { stitchingDirectives } from '@smg/graphql/gql-tools/stitching-directives';
import { Context } from '@smg/graphql/types';
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
			const context: Context = {
				user: {
					token: req.headers.cookie || ''
				},
				client: prismaClient,
				req,
				res
			};

			return context;
		} catch (error: any) {
			return null;
		}
	}
});

server.listen({ port: 3001 }).then(() => {
	console.log('Backend gateway online!');
});
