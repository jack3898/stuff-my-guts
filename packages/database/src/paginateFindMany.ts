import {
	ConnectionArguments,
	findManyCursorConnection
} from '@devoxa/prisma-relay-cursor-connection';

type TQuery<TFunc> = TFunc extends (A: infer A) => any ? A : any;

export default function paginateFindMany<TFindMany extends { findMany: any; count: any }>(
	model: TFindMany,
	query: TQuery<TFindMany['findMany']>,
	paginateOptions: ConnectionArguments
) {
	return findManyCursorConnection(
		(args) => model.findMany({ ...args, ...query }),
		() => model.count({ ...query }),
		paginateOptions
	);
}
