import prismaClient from './prismaClient';
import importedResolvers from './resolvers';
import seedData from './seed';
import importedTypeDefs from './typedefs';

export const resolvers = importedResolvers;
export const typeDefs = importedTypeDefs;
export const seedable = seedData;
export const prismaSeederClient = prismaClient;

export default [...typeDefs, ...resolvers];
