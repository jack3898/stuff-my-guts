const base = require('@smg/config-jest/src/jest.config.base');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const override = {
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json'
		}
	}
};

module.exports = Object.assign(base, override);
