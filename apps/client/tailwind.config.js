const path = require('path');
const { ROOT } = require('@mealideas/paths');

module.exports = {
	content: [
		path.resolve('src', '**', '*.tsx'),
		path.resolve(ROOT, 'node_modules', '@mealideas', 'components', 'src', '**', '*.tsx')
	]
};
