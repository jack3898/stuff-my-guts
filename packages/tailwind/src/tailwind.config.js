const defaultTheme = require('tailwindcss/defaultTheme');
const path = require('path');
const { ROOT } = require('@mealideas/paths');

const locations = ['client', 'components']; // Package must be prefixed with '@mealideas'

module.exports = {
	content: locations.map((location) =>
		path.resolve(ROOT, 'node_modules', '@mealideas', location, 'src', '**', '*.tsx')
	),
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sens', ...defaultTheme.fontFamily.sans],
				serif: ['Charis SIL', ...defaultTheme.fontFamily.serif]
			}
		}
	}
};
