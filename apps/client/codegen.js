const createConfig = require('@smg/config-graphql-codegen');
const path = require('path');

module.exports = createConfig({
	generates: {
		'src/generated/graphql.tsx': {
			documents: path.resolve('src', '**', '*.graphql'),
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: { withHooks: true },
			hooks: { afterOneFileWrite: ['prettier --write'] }
		}
	}
});
