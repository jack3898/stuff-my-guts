const { ROOT } = require('@smg/constants');
const path = require('path');

const config = {
	overwrite: true,
	schema: path.resolve(ROOT, 'packages', 'database', 'src', 'typedefs')
};

const createConfig = (overrides) => Object.assign(config, overrides);

module.exports = createConfig;
