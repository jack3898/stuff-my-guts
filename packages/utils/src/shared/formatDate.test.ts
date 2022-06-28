import formatDate from './formatDate';

describe('format date utility', () => {
	const sampleDateObject = new Date(1656445492000);

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should format to a formal date', () => {
		const formalDate = formatDate(sampleDateObject, 'formal');

		expect(formalDate).toStrictEqual('28th of June, 2022');
	});

	it('should throw when provided with an incorrect date object', () => {
		const formatDateSpy = jest.fn(formatDate);

		try {
			formatDateSpy(true as any, 'formal');
		} catch (error) {}

		expect(formatDateSpy).toThrow(RangeError);
		expect(formatDateSpy).toThrowError('Invalid time value');
	});

	it('should throw when provided with an incorrect date type', () => {
		const formatDateSpy = jest.fn(formatDate);

		try {
			formatDateSpy(sampleDateObject, 'aksjdhaskhjd' as any);
		} catch (error) {}

		expect(formatDateSpy).toThrow(RangeError);
		expect(formatDateSpy).toThrowError('Invalid time value');
	});
});
