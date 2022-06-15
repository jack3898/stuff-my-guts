import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { resolvers, typeDefs } from '@mealideas/database';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const mergedTypeDefs = stitchSchemas({
	subschemas: typeDefs.map((schema) => ({
		schema: makeExecutableSchema({ typeDefs: schema })
	}))
});

const server = new ApolloServer({
	resolvers,
	typeDefs: mergedTypeDefs,
	introspection: true,
	plugins: [ApolloServerPluginLandingPageLocalDefault]
});

server.listen({ port: 3001 }).then(() => {
	console.log('Backend gateway online!');
});
