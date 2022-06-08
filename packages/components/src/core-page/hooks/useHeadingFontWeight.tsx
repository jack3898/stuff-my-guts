import { useCallback } from 'react';

export type HeadingLevels = '1' | '2' | '3' | '4' | '5' | '6';

/**
 * This hook defines the style of heading for the heading component.
 */
export default function useHeadingFontWeight(headingLevel: HeadingLevels) {
	const calculate = useCallback(
		(level: HeadingLevels) => {
			switch (level) {
				case '1':
					return 'text-3xl font-semibold font-serif';
				case '2':
					return 'text-2xl font-semibold font-serif';
				case '3':
					return 'text-xl font-semibold font-serif';
				case '4':
					return 'text-lg font-bold font-serif';
				case '5':
					return 'text-base font-bold font-serif';
				case '6':
					return 'text-sm font-bold font-serif';
			}
		},
		[headingLevel]
	);

	return calculate(headingLevel);
}
