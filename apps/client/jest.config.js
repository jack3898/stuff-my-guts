const react = require('@smg/config-jest/src/jest.config.react');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const override = {
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json'
		}
	}
};

module.exports = Object.assign(react, override);
