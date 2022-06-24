import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { Context } from '../../types/Context';

export default function authenticateDirectiveTransformer(
	schema: GraphQLSchema,
	directiveName: string
) {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

			if (upperDirective) {
				const { resolve = defaultFieldResolver } = fieldConfig;

				fieldConfig.resolve = async function (source, args, context: Context, info) {
					const result = await resolve(source, args, context, info);

					// TODO verify token here.

					if (!context.user.token) {
						throw new AuthenticationError(
							`Not authorised to access '${info.fieldName}' field in '${info.parentType}'.`
						);
					}

					return result;
				};

				return fieldConfig;
			}
		}
	});
}
