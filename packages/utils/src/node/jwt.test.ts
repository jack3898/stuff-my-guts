import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { decodeJwt, signJwt, verifyJwt } from './jwt';

describe('jwt utilities', () => {
	it('should allow to sign, and verify signed jwt', () => {
		const token = signJwt({ data: true });
		const verified = verifyJwt(token);

		expect(verified).toBe(true);
	});

	it('should throw when invalid data to sign fn was provided', () => {
		const signMock = jest.fn(signJwt);

		signMock(true as any);

		expect(signMock).toThrowError();
	});

	it('should result in false when the token could not be verified', () => {
		const wrongToken = jwt.sign({ data: true }, 'completely different secret!');
		const verified = verifyJwt(wrongToken);

		expect(verified).toBe(false);
	});

	it('should decode a valid jwt', () => {
		const data = { data: true };
		const token = signJwt(data);
		const decoded = decodeJwt<typeof data>(token);

		expect(decoded.data).toBe(true);
	});

	it('should throw when decoding an invalid jwt', () => {
		const decodeMock = jest.fn(decodeJwt);
		const data = { data: true };
		const token = jwt.sign(data, 'another different secret!');

		try {
			decodeMock(token);
		} catch (error) {}

		expect(decodeMock).toThrow(JsonWebTokenError);
	});
});
