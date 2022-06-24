import { ExpressContext } from 'apollo-server-express';

export type Context = {
	user: {
		token: string;
	};
	req: ExpressContext['req'];
	res: ExpressContext['res'];
};
