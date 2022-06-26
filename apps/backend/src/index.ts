import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { stitchingDirectives } from '@graphql-tools/stitching-directives';
import { customDirectives, resolvers, typeDefs } from '@mealideas/database';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import env from 'dotenv';

env.config();

let mergedTypeDefs = stitchSchemas({
	subschemas: typeDefs.map((schemaItem) => ({
		schema: makeExecutableSchema({ typeDefs: schemaItem })
	})),
	subschemaConfigTransforms: [stitchingDirectives().stitchingDirectivesTransformer],
	// @ts-ignore the type is compatible
	resolvers,
	mergeDirectives: true
});

mergedTypeDefs = customDirectives.auth().directiveTransformer(mergedTypeDefs, 'auth');

const server = new ApolloServer({
	schema: mergedTypeDefs,
	csrfPrevention: true,
	introspection: true,
	plugins: [ApolloServerPluginLandingPageLocalDefault],
	cache: 'bounded',
	cors: {
		origin: process.env.CORS_ORIGIN,
		credentials: true
	},
	context: ({ req, res }) => {
		try {
			return {
				user: {
					token: req.headers.cookie || ''
				},
				req,
				res
			};
		} catch (error: any) {
			return null;
		}
	}
});

server.listen({ port: 3001 }).then(() => {
	console.log('Backend gateway online!');
});
