import { usersResolvers } from './resolvers/users.resolvers';
import { usersTypeDefs } from './typedefs/users.typedefs';

export const resolvers = [usersResolvers];
export const typeDefs = [usersTypeDefs];

export default [...typeDefs, ...resolvers];
