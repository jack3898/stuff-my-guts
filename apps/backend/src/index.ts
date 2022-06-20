import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { stitchingDirectives } from '@graphql-tools/stitching-directives';
import { customDirectives, resolvers, typeDefs } from '@mealideas/database';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

let mergedTypeDefs = stitchSchemas({
	subschemas: typeDefs.map((schemaItem) => ({
		schema: makeExecutableSchema({ typeDefs: schemaItem })
	})),
	subschemaConfigTransforms: [stitchingDirectives().stitchingDirectivesTransformer],
	resolvers,
	mergeDirectives: true
});

mergedTypeDefs = customDirectives.authenticated(mergedTypeDefs, 'upper');

const server = new ApolloServer({
	schema: mergedTypeDefs,
	csrfPrevention: true,
	introspection: true,
	plugins: [ApolloServerPluginLandingPageLocalDefault],
	cache: 'bounded'
});

server.listen({ port: 3001 }).then(() => {
	console.log('Backend gateway online!');
});
