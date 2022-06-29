const createConfig = require('@smg/config-graphql-codegen');

module.exports = createConfig({
	generates: {
		'src/generated/graphql.ts': {
			plugins: ['@graphql-codegen/typescript', '@graphql-codegen/typescript-resolvers'],
			config: { contextType: '../types#Context' },
			hooks: { afterOneFileWrite: ['prettier --write'] }
		}
	}
});
