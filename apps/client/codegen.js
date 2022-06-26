const createConfig = require('@mealideas/graphql-codegen');

module.exports = createConfig({
	generates: {
		'src/generated/graphql.tsx': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: { withHooks: true },
			hooks: { afterOneFileWrite: ['prettier --write'] }
		}
	}
});
