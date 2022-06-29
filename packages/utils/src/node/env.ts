import { ROOT } from '@smg/constants';
import dotenv from 'dotenv';
import path from 'path';

export default function rootenv() {
	dotenv.config({
		path: path.resolve(ROOT, '.env')
	});
}
