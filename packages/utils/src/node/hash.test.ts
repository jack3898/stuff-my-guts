import { createHash, verifyHash } from './hash';

describe('hash utilities', () => {
	it('should create and verify the hash', async () => {
		const hashedText = await createHash('hash me');
		const verified = await verifyHash('hash me', hashedText);

		expect(verified).toBe(true);
	});

	it('should resolve false on incorrect verify', async () => {
		const hashedText = await createHash('hash me');
		const verified = await verifyHash('different', hashedText);

		expect(verified).toBe(false);
	});

	it('should throw an error when createHash provided with an incorrect subject', async () => {
		const createHashMock = jest.fn(createHash);
		try {
			await createHashMock(true as any);
		} catch (error) {}

		expect(createHashMock).rejects.toThrowError();
	});

	it('should resolve false when provided incorrect verify types', async () => {
		const hashedText = await createHash('hash me');
		const verified = await verifyHash(true as any, hashedText);

		expect(verified).toBe(false);
	});
});
