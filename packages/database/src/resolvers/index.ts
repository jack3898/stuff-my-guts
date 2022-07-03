import { mealResolvers } from './meal.resolvers';
import { dateResolverFunction } from './scalars/Date.scalar';
import { userResolvers } from './user.resolvers';

export default [mealResolvers, userResolvers, dateResolverFunction];
