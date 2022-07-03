import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as useAuth from '../hooks/useAuth';
import { AuthData } from '../hooks/useAuth';
import { Protect, ProtectProps } from './Protect';

describe('protect component', () => {
	const loginMock = jest.fn(() => {});
	const logoutMock = jest.fn(() => {});

	const ExampleApp = (protectProps?: ProtectProps) => (
		<Routes>
			<Route element={<Protect {...protectProps} />}>
				<Route path="/" element={<p>test!</p>} />
			</Route>
			<Route path="/redirect" element={<p>redirected!</p>} />
		</Routes>
	);

	let mockData: AuthData;

	const useAuthMock = () => {
		jest.spyOn(useAuth, 'useAuthContext').mockImplementationOnce(() => mockData);
	};

	beforeEach(() => {
		mockData = {
			error: null,
			login: loginMock,
			logout: logoutMock,
			token: process.env.TEST_JWT!,
			tokenData: { id: 'id' },
			loginRoute: '/'
		};

		jest.clearAllMocks();
	});

	it('should render the outlet when authenticated', () => {
		useAuthMock();

		render(
			<MemoryRouter>
				<ExampleApp />
			</MemoryRouter>
		);

		expect(screen.getByText('test!')).toBeInTheDocument();
	});

	it('should not render the outlet when not authenticated', () => {
		mockData.token = null;

		useAuthMock();

		render(
			<MemoryRouter>
				<ExampleApp />
			</MemoryRouter>
		);

		expect(screen.queryByText('test!')).not.toBeInTheDocument();
	});

	it('should not redirect when authenticated', () => {
		useAuthMock();

		render(
			<MemoryRouter>
				<ExampleApp to="/redirect" />
			</MemoryRouter>
		);

		expect(screen.queryByText('test!')).toBeInTheDocument();
		expect(screen.queryByText('redirected!')).not.toBeInTheDocument();
	});

	it('should redirect when not authenticated', () => {
		mockData.token = null;

		useAuthMock();

		render(
			<MemoryRouter>
				<ExampleApp to="/redirect" />
			</MemoryRouter>
		);

		expect(screen.queryByText('test!')).not.toBeInTheDocument();
		expect(screen.queryByText('redirected!')).toBeInTheDocument();
	});

	it('should render the children when authenticated', () => {
		useAuthMock();

		render(
			<Protect>
				<p>test!</p>
			</Protect>
		);

		expect(screen.getByText('test!')).toBeInTheDocument();
	});

	it('should not render the children when not authenticated', () => {
		mockData.token = null;

		useAuthMock();

		render(
			<Protect>
				<p>test!</p>
			</Protect>
		);

		expect(screen.queryByText('test!')).not.toBeInTheDocument();
	});

	it('should invert logic when inverted prop is passed in (i.e. expects no auth)', () => {
		mockData.token = null;

		useAuthMock();

		render(
			<Protect invert={true}>
				<p>test!</p>
			</Protect>
		);

		expect(screen.queryByText('test!')).toBeInTheDocument();
	});
});
