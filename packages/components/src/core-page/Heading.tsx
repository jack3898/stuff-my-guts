import { createElement } from 'react';
import useHeadingFontWeight, { HeadingLevels } from './hooks/useHeadingFontWeight';

export type HeadingProps = {
	level: HeadingLevels;
	text: string;
};

/**
 * The heading component
 *
 * Tailwind does a CSS reset on heading elements, so this provides default styling for various heading levels.
 */
export default function Heading({ level, text }: HeadingProps) {
	const className = useHeadingFontWeight(level);

	return createElement(`h${level}`, { children: text, className });
}
