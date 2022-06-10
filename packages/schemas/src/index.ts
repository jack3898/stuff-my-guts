import { usersResolvers } from './resolvers/users.resolvers';
import seedData from './seed';
import { usersTypeDefs } from './typedefs/users.typedefs';

export const resolvers = [usersResolvers];
export const typeDefs = [usersTypeDefs];
export const seedable = seedData;

export default [...typeDefs, ...resolvers];
