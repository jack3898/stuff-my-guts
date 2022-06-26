import { ROOT } from '@mealideas/paths';
import dotenv from 'dotenv';
import path from 'path';

export default function rootenv() {
	dotenv.config({
		path: path.resolve(ROOT, '.env')
	});
}
