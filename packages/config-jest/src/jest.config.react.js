const base = require('./jest.config.base');
const path = require('path');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const reactConfig = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.js')]
};

module.exports = Object.assign(base, reactConfig);
