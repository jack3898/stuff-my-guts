import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import verifyJwt from '@mealideas/utils/src/node/verifyJwt';
import { AuthenticationError } from 'apollo-server';
import cookie from 'cookie';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { Context } from '../../types/Context';

export default function authDirective() {
	const typeDirectiveArgumentMaps = new Map<string, unknown>();

	return {
		directiveTransformer: (schema: GraphQLSchema, directiveName: string) => {
			return mapSchema(schema, {
				[MapperKind.OBJECT_FIELD]: (fieldConfig, _, typeName) => {
					const authDirective =
						getDirective(schema, fieldConfig, directiveName)?.[0] ??
						typeDirectiveArgumentMaps.get(typeName);

					if (authDirective) {
						const { resolve = defaultFieldResolver } = fieldConfig;

						fieldConfig.resolve = async function (
							source,
							args,
							context: Context,
							info
						) {
							const result = await resolve(source, args, context, info);
							const token = cookie.parse(context.user.token)['auth-token'];

							if (verifyJwt(token)) {
								return result;
							}

							throw new AuthenticationError(
								`Access to field: '${info.fieldName}' not authorised!`
							);
						};

						return fieldConfig;
					}
				},
				[MapperKind.TYPE]: (type) => {
					const authDirective = getDirective(schema, type, directiveName)?.[0];

					if (authDirective) {
						typeDirectiveArgumentMaps.set(type.name, authDirective); // Apply the directive to the
					}

					return undefined;
				}
			});
		}
	};
}
