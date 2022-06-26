import jwt from 'jsonwebtoken';
import rootenv from './env';

rootenv();

export function verify(toVerify: string) {
	try {
		jwt.verify(toVerify, process.env.JWT_SECRET!);

		return true;
	} catch (error) {
		return false;
	}
}

export function sign(data: string | object | Buffer) {
	return jwt.sign(data, process.env.JWT_SECRET!);
}
