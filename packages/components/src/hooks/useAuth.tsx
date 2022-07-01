import {
	AuthenticateMutationVariables,
	useAuthenticateMutation
} from '@smg/graphql/codegen/client';
import jwtDecode from 'jwt-decode';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

export type AuthData = {
	tokenData: { id: string | null };
	token: string | null;
	loginRoute: string;
	error: Error | null;
	logout: () => void;
	login: (variables: AuthenticateMutationVariables) => void;
};

export type AuthContextProviderProps = {
	children: React.ReactNode;
	directTo: string;
};

const AuthContext = createContext({
	token: null,
	tokenData: { id: null },
	loginRoute: '/',
	error: null,
	login: () => {},
	logout: () => {}
} as AuthData);

export function AuthContextProvider({ children, directTo }: AuthContextProviderProps) {
	const [cookies, setCookie, removeCookie] = useCookies(['auth-token', 'refresh']);
	const [jwtData, setJwtData] = useState<AuthData['tokenData'] | null>(null);
	const authToken = cookies['auth-token'] || null;
	const [error, setError] = useState<Error | null>(null);
	const [authenticate] = useAuthenticateMutation();

	const logout = () => {
		removeCookie('auth-token');
	};

	const login = (variables: AuthenticateMutationVariables) => {
		if (!variables) return;

		authenticate({ variables })
			.then(() => {
				// The app won't recognise the login as cookies are set from the server
				// This refresh cookie is a quick hack to get the user redirected away
				// from the login screen.
				setCookie('refresh', new Date().toISOString());
				setError(null);
			})
			.catch((error) => {
				console.error(error);
				setError(error);
			});
	};

	useMemo(() => {
		try {
			const data = jwtDecode(authToken);
			setJwtData(data as AuthData['tokenData']);
		} catch (error: any) {
			setJwtData(null);
			removeCookie('auth-token');
		}
	}, [authToken]);

	const providerValue: AuthData = {
		token: authToken,
		tokenData: { id: jwtData?.id || null },
		loginRoute: directTo,
		error,
		login,
		logout
	};

	return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
	return useContext(AuthContext);
};
