const path = require('path');
const { ROOT } = require('@smg/constants');

module.exports = {
	overwrite: true,
	schema: path.resolve(ROOT, 'packages', 'database', 'src', 'typedefs'),
	generates: {
		'codegen/backend.ts': {
			plugins: ['@graphql-codegen/typescript', '@graphql-codegen/typescript-resolvers'],
			config: { contextType: '../types#Context' },
			hooks: { afterOneFileWrite: ['prettier --write'] }
		},
		'codegen/client.ts': {
			documents: path.resolve(ROOT, 'apps', 'client', 'src', '**', '*.graphql'),
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: { withHooks: true },
			hooks: { afterOneFileWrite: ['prettier --write'] }
		}
	}
};
