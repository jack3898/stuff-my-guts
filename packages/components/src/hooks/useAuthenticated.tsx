import jwtDecode from 'jwt-decode';
import { useCallback, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

type DecodedJWT = {
	firstname?: string;
	lastname?: string;
};

export default function useAuth() {
	const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
	const [decodedToken, setDecodedToken] = useState<DecodedJWT | undefined>();

	const authToken = cookies['auth-token'];

	const setCookieToken = useCallback((token: string) => {
		setCookie('auth-token', token);
	}, []);

	const removeCookieToken = useCallback(() => {
		removeCookie('auth-token');
	}, []);

	useMemo(() => {
		try {
			const decodedToken = jwtDecode<DecodedJWT>(authToken);
			setDecodedToken(decodedToken);
		} catch (error) {
			removeCookie('auth-token');
			setDecodedToken(undefined);
		}
	}, [authToken]);

	const loggedIn = !!authToken;

	return { authToken, decodedToken, setCookieToken, removeCookieToken, loggedIn };
}
