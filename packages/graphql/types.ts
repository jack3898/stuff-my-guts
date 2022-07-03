import { PrismaClient } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';
import { paginateFindMany } from './findManyCursorConnection';

export type Context = {
	user: {
		token?: string;
	};
	client: PrismaClient;
	paginateFindMany: typeof paginateFindMany;
	req: ExpressContext['req'];
	res: ExpressContext['res'];
};
