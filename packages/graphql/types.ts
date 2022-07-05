import { PrismaClient } from '@prisma/client';
import { paginateFindMany } from '@smg/database';
import { ExpressContext } from 'apollo-server-express';

// You can find the usage of this type in the backend client
export type Context = {
	user: {
		token?: string;
	};
	client: PrismaClient;
	paginateFindMany: typeof paginateFindMany;
	req: ExpressContext['req'];
	res: ExpressContext['res'];
};
