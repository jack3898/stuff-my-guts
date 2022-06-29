const defaultTheme = require('tailwindcss/defaultTheme');
const path = require('path');
const { ROOT } = require('@mealideas/paths');
const colors = require('tailwindcss/colors');

const locations = ['apps/client', 'packages/components'];

module.exports = {
	content: locations.map((location) => path.resolve(ROOT, location, 'src', '**', '*.tsx')),

	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
				serif: ['Charis SIL', ...defaultTheme.fontFamily.serif]
			},
			colors: {
				primary: colors.black,
				secondary: colors.gray['300'],
				danger: colors.red['300'],
				'primary-light': colors.white,
				'primary-dark': colors.black
			}
		}
	}
};
