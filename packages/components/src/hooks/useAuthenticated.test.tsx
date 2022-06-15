import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useAuthenticated from './useAuthenticated';

describe('useAuthenticated hook', () => {
	const getHookResult = () => renderHook(() => useAuthenticated());
	const TEST_COOKIE_TOKEN =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

	it('should return correct data for initial load', () => {
		const {
			result: {
				current: { authToken, decodedToken, loggedIn, removeCookieToken, setCookieToken }
			}
		} = getHookResult();

		expect(authToken).not.toBeDefined();
		expect(decodedToken).not.toBeDefined();
		expect(loggedIn).toBe(false);
		expect(typeof removeCookieToken).toBe('function');
		expect(typeof setCookieToken).toBe('function');
	});

	it('should have correct data when provided with JWT', () => {
		const {
			result: {
				current: { setCookieToken }
			},
			rerender
		} = getHookResult();

		act(() => {
			setCookieToken(TEST_COOKIE_TOKEN);
		});

		rerender();

		const {
			result: {
				current: { authToken, decodedToken, loggedIn }
			}
		} = getHookResult();

		expect(typeof authToken).toBe('string');
		expect(decodedToken).toEqual({
			sub: '1234567890',
			name: 'John Doe',
			iat: 1516239022
		});
		expect(loggedIn).toBe(true);
	});

	it('should allow you to remove the JWT', () => {
		const initialHook = getHookResult();

		act(() => {
			initialHook.result.current.setCookieToken(TEST_COOKIE_TOKEN);
		});

		initialHook.rerender();

		const loggedIn = getHookResult();

		expect(typeof loggedIn.result.current.authToken).toBe('string');
		expect(loggedIn.result.current.loggedIn).toBe(true);

		act(() => {
			loggedIn.result.current.removeCookieToken();
		});

		initialHook.rerender();

		const loggedOut = getHookResult();

		expect(loggedOut.result.current.authToken).not.toBeDefined();
		expect(loggedOut.result.current.loggedIn).toBe(false);
	});

	it('should soft fail on incorrect token type', () => {
		const initialHook = getHookResult();

		act(() => {
			initialHook.result.current.setCookieToken('I am not a good JWT');
		});

		initialHook.rerender();

		const loggedIn = getHookResult();

		expect(loggedIn.result.current.authToken).not.toBeDefined();
		expect(loggedIn.result.current.decodedToken).not.toBeDefined();
		expect(loggedIn.result.current.loggedIn).toBe(false);
	});
});
