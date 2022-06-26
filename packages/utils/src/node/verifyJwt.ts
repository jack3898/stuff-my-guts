import { ROOT } from '@mealideas/paths';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import path from 'path';

dotenv.config({
	path: path.resolve(ROOT, '.env')
});

export default function verifyJwt(toVerify: string) {
	try {
		jwt.verify(toVerify, process.env.JWT_SECRET!);

		return true;
	} catch (error) {
		return false;
	}
}
