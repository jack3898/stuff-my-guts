import resolvers from './resolvers';
import typeDefs from './typedefs';

export * as customDirectives from './gql-directives';
export { default as paginateFindMany } from './paginateFindMany';
export { default as prismaClient } from './prismaClient';
export { default as resolvers } from './resolvers';
export { default as seedData } from './seed-data';
export { default as typeDefs } from './typedefs';

export default [...typeDefs, ...resolvers];
