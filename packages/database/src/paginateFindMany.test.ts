import paginateFindMany from './paginateFindMany';
import prismaMock from './prismaMock';

function generateMockUsers(size = 5, idFrom = 1) {
	const mockData = [];

	for (let i = idFrom; i <= size; i++) {
		mockData.push({
			id: `${i}`,
			email: 'randomemail@email.com',
			firstname: 'Test',
			lastname: 'User',
			password: 'aslhdkasjhd',
			username: 'username',
			tel: '00000000000',
			country: 'UK',
			bio: 'wow!',
			created: new Date(),
			updated: new Date()
		});
	}

	return mockData;
}

// With these tests bear in mind pageInfo is correct, but the pagination does not like mock data
// so the resulting nodes are always full.

describe('paginateFindMany', () => {
	it('should paginate a successful query', async () => {
		prismaMock.user.findMany.mockResolvedValue(generateMockUsers(5));

		const result = await paginateFindMany(prismaMock.user, {}, { first: 5 });

		expect(result.edges.length).toBe(5);
		expect(result.nodes.length).toBe(5);
		expect(result.pageInfo.hasNextPage).toBe(false);
		expect(result.pageInfo.hasPreviousPage).toBe(false);
	});

	it('should show next page available when there is a next page', async () => {
		prismaMock.user.findMany.mockResolvedValue(generateMockUsers(6));

		const result = await paginateFindMany(prismaMock.user, {}, { first: 5 });

		expect(result.pageInfo.hasNextPage).toBe(true);
		expect(result.pageInfo.endCursor).toBe('5');
	});

	it('should fetch second page', async () => {
		prismaMock.user.findMany.mockResolvedValue(generateMockUsers(8, 5));

		const result = await paginateFindMany(prismaMock.user, {}, { after: '5', first: 5 });

		expect(result.pageInfo.hasNextPage).toBe(false);
		expect(result.pageInfo.hasPreviousPage).toBe(true);
		expect(result.pageInfo.endCursor).toBe('8');
	});
});
