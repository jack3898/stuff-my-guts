import { Options, special } from 'depcheck';

const config: Options = {
	ignoreMatches: ['@mealideas/*', '@graphql-codegen/*', 'eslint*'],
	ignorePatterns: ['dist'],
	specials: [special.eslint, special.webpack]
};

export default config;
