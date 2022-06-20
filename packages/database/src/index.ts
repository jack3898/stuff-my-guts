import * as directives from './gql-directives';
import prismaClient from './prismaClient';
import importedResolvers from './resolvers';
import seedData from './seed-data';
import importedTypeDefs from './typedefs';

export const resolvers = importedResolvers;
export const typeDefs = importedTypeDefs;
export const seedable = seedData;
export const prismaSeederClient = prismaClient;
export const customDirectives = directives;

export default [...typeDefs, ...resolvers];
