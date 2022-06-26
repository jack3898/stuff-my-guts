const { ROOT } = require('@mealideas/paths');
const path = require('path');

const config = {
	overwrite: true,
	schema: path.resolve(ROOT, 'packages', 'database', 'src', 'typedefs'),
	documents: path.resolve(ROOT, 'packages', 'database', 'src', 'queries', '**', '*.graphql')
};

const createConfig = (overrides) => Object.assign(config, overrides);

module.exports = createConfig;
