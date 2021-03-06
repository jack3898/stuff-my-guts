import { defaultFieldResolver, GraphQLFieldConfig, GraphQLSchema } from '@smg/graphql';
import { AuthenticationError } from '@smg/graphql/apollo/server';
import { getDirective, MapperKind, mapSchema } from '@smg/graphql/gql-tools/utils';
import { Context } from '@smg/graphql/types';
import { verifyJwt } from '@smg/utils/src/node/jwt';

export default function authDirective() {
	const typeDirectiveArgumentMaps = new Map<string, unknown>();

	return {
		directiveTransformer: (schema: GraphQLSchema, directiveName: string) => {
			return mapSchema(schema, {
				// This method will run for every field
				[MapperKind.OBJECT_FIELD]: (fieldConfig, _, typeName) => {
					// Check if a directive exists for this field, or the object definition for this current field
					const authDirective =
						getDirective(schema, fieldConfig, directiveName)?.[0] ??
						typeDirectiveArgumentMaps.get(typeName);

					// If a directive exists in either of the above locations, apply custom auth middleware to this field
					if (authDirective) {
						return modifyCurrentFieldWithAuthMiddleware(fieldConfig);
					}
				},
				// This method will run for every type definition, like a query, which can also have an auth directive
				[MapperKind.TYPE]: (typeName) => {
					const authDirective = getDirective(schema, typeName, directiveName)?.[0];

					// If the auth directive exists on the type definition, register it
					if (authDirective) {
						typeDirectiveArgumentMaps.set(typeName.name, authDirective);
					}

					return undefined;
				}
			});
		}
	};
}

function modifyCurrentFieldWithAuthMiddleware(fieldConfig: GraphQLFieldConfig<any, any, any>) {
	const { resolve = defaultFieldResolver } = fieldConfig;

	fieldConfig.resolve = async function (source, args, context: Context, info) {
		const result = await resolve(source, args, context, info);

		if (verifyJwt(context.user.token || '')) {
			return result;
		}

		throw new AuthenticationError(`Access to field: '${info.fieldName}' not authorised!`);
	};

	return fieldConfig;
}
