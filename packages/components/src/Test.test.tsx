import { render, screen } from '@testing-library/react';
import Test from './Test';

it('should run basic component test', () => {
	render(<Test />);

	const element = screen.getByText('Component from component lib works!');

	expect(element).toBeInTheDocument();
});
