import { renderHook } from '@testing-library/react';
import useHeadingFontWeight, { HeadingLevels } from './useHeadingFontWeight';

describe('useHeadingFontWeight hook', () => {
	const getHookResult = (level: HeadingLevels) => {
		const { result } = renderHook(() => useHeadingFontWeight(level));
		return result.current;
	};

	test('should have correct style for h1', () => {
		const result = getHookResult('1');

		expect(result).toContain('text-3xl');
		expect(result).toContain('font-semibold');
	});

	test('should have correct style for h2', () => {
		const result = getHookResult('2');

		expect(result).toContain('text-2xl');
		expect(result).toContain('font-semibold');
	});

	test('should have correct style for h3', () => {
		const result = getHookResult('3');

		expect(result).toContain('text-xl');
		expect(result).toContain('font-semibold');
	});

	test('should have correct style for h4', () => {
		const result = getHookResult('4');

		expect(result).toContain('text-lg');
		expect(result).toContain('font-bold');
	});

	test('should have correct style for h5', () => {
		const result = getHookResult('5');

		expect(result).toContain('text-base');
		expect(result).toContain('font-bold');
	});

	test('should have correct style for h6', () => {
		const result = getHookResult('6');

		expect(result).toContain('text-sm');
		expect(result).toContain('font-bold');
	});
});
