import { PrismaClient } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';

export type Context = {
	user: {
		token: string;
	};
	client: PrismaClient,
	req: ExpressContext['req'];
	res: ExpressContext['res'];
};
