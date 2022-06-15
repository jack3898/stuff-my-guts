import { mealsSeeder } from './meal';
import { usersSeeder } from './user';

type Seeder = () => Promise<string>;

export default [usersSeeder, mealsSeeder] as Seeder[]; // Getting a type error here? Check the seeder you just made!
