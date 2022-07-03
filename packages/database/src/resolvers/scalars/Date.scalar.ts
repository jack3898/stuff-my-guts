import { GraphQLScalarType } from 'graphql';

const dateScalarType = new GraphQLScalarType({
	name: 'Date',
	description: 'Convert values to a valid date.',
	serialize: (value: any) => {
		try {
			return new Date(value).toISOString();
		} catch (error) {
			return null;
		}
	}
});

export const dateResolverFunction = {
	Date: dateScalarType
};
