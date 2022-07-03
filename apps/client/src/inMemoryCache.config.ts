import { InMemoryCache, relayStylePagination } from '@smg/graphql/apollo/client';

export default new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				meals: relayStylePagination()
			}
		}
	}
});
