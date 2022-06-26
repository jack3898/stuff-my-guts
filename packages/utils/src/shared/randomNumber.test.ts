import randomNumber from './randomNumber';

describe('Random number', () => {
	it('should generate a random number', () => {
		expect(randomNumber(1, 3)).toBeGreaterThanOrEqual(1);
		expect(randomNumber(1, 3)).toBeLessThanOrEqual(3);
	});

	it('should generate a random number with correct range', () => {
		expect(randomNumber(1, 1)).toBe(1);
		expect(randomNumber(2, 2)).toBe(2);
	});

	it('should pass 100 random samples', () => {
		const numbers = [];

		for (let i = 0; i <= 100; i++) {
			numbers.push(randomNumber(1, 3));
		}

		expect(numbers.find((number) => number < 1 && number > 3)).toBe(undefined);
	});
});
