import { render, screen, waitFor } from '@testing-library/react';
import Heading from './Heading';

describe('heading component', () => {
	test('should be in the dom', () => {
		render(<Heading level="1" text="heading1" />);

		waitFor(() => {
			expect(screen.getByText('heading1')).toBeInTheDocument();
		});
	});

	test('should be a heading element', () => {
		render(
			<div data-testid="div">
				<Heading level="1" text="heading1" />
				<Heading level="2" text="heading2" />
				<Heading level="3" text="heading3" />
				<Heading level="4" text="heading4" />
				<Heading level="5" text="heading5" />
				<Heading level="6" text="heading6" />
			</div>
		);

		waitFor(() => {
			const element = screen.getByTestId('div');

			expect(element.querySelector('h1')).toBeInTheDocument();
			expect(element.querySelector('h2')).toBeInTheDocument();
			expect(element.querySelector('h3')).toBeInTheDocument();
			expect(element.querySelector('h4')).toBeInTheDocument();
			expect(element.querySelector('h5')).toBeInTheDocument();
			expect(element.querySelector('h6')).toBeInTheDocument();
		});
	});
});
