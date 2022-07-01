const CONSTANTS = require('./index');
const fs = require('fs');
const path = require('path');

describe('constants', () => {
	test('root is correct', () => {
		const rootPackageJson = require(path.join(CONSTANTS.ROOT, 'package.json'));

		expect(rootPackageJson.name).toStrictEqual('stuff-my-guts');
	});
});
