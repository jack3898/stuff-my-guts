import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { AuthContextProvider, AuthData, useAuthContext } from './useAuth';

describe('useAuthenticated context', () => {
	const TEST_COOKIE_TOKEN =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJKYWNrIiwibGFzdG5hbWUiOiJXcmlnaHQifQ.Xf7MXX3qyiN2aEiYwDKGIKy6oOYEKyP_BklY9gaIgVY';

	const ContextConsumer = ({ hookWrapper }: { hookWrapper?: (authData: AuthData) => void }) => {
		const authContext = useAuthContext();

		hookWrapper?.(authContext);

		return null;
	};

	const renderContext = (children: React.ReactNode) => {
		return render(<AuthContextProvider directTo="login">{children}</AuthContextProvider>);
	};

	it('should render children', () => {
		renderContext(<p>test!</p>);

		expect(screen.getByText('test!')).toBeInTheDocument();
	});

	it('should start with correct data', () => {
		const hookWrapper = jest.fn((authData: AuthData) => {});

		renderContext(<ContextConsumer hookWrapper={hookWrapper} />);

		expect(hookWrapper).toBeCalledWith(
			expect.objectContaining({
				token: null,
				tokenData: {
					firstname: null,
					lastname: null
				}
			})
		);
	});

	it('should accept JWT as login token', async () => {
		const loginWrapper = jest.fn((authData: AuthData) => {
			setTimeout(() => authData.login(TEST_COOKIE_TOKEN));
		});

		renderContext(<ContextConsumer hookWrapper={loginWrapper} />);

		await waitFor(() => {
			expect(loginWrapper).toBeCalledWith(
				expect.objectContaining({
					token: TEST_COOKIE_TOKEN,
					tokenData: {
						firstname: 'Jack',
						lastname: 'Wright'
					}
				})
			);
		});
	});

	it('should resolve null data with invalid JWT', async () => {
		const loginWrapper = jest.fn((authData: AuthData) => {
			setTimeout(() => authData.login('I am an invalid JWT 😎'));
		});

		renderContext(<ContextConsumer hookWrapper={loginWrapper} />);

		await waitFor(() => {
			expect(loginWrapper).toBeCalledWith(expect.objectContaining({ token: null }));
			expect(loginWrapper).not.toBeCalledWith(
				expect.objectContaining({ token: 'I am an invalid JWT 😎' })
			);
		});
	});

	it('should allow the user to logout on request', async () => {
		const loginWrapper = jest.fn((authData: AuthData) => {
			setTimeout(() => authData.login(TEST_COOKIE_TOKEN));
		});

		const { rerender } = renderContext(<ContextConsumer hookWrapper={loginWrapper} />);

		await waitFor(() => {
			expect(loginWrapper).toBeCalledWith(
				expect.objectContaining({
					token: TEST_COOKIE_TOKEN
				})
			);
		});

		const logoutWrapper = jest.fn((authData: AuthData) => {
			setTimeout(() => authData.logout());
		});

		rerender(<ContextConsumer hookWrapper={logoutWrapper} />);

		await waitFor(() => {
			expect(logoutWrapper).toBeCalledWith(
				expect.objectContaining({
					token: null,
					tokenData: {
						firstname: null,
						lastname: null
					}
				})
			);
		});
	});
});
