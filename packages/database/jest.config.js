const base = require('@mealideas/jest/src/jest.config.base');
const { ROOT } = require('@mealideas/paths');
const path = require('path');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const override = {
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json'
		}
	},
	setupFiles: [path.resolve('.jest', 'setEnvVars.js')]
};

module.exports = Object.assign(base, override);
