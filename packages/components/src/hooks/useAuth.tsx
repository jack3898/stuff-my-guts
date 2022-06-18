import jwtDecode from 'jwt-decode';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export type AuthData = {
	tokenData: {
		id: number | null;
		username: string | null;
		firstname: string | null;
		lastname: string | null;
		email: string | null;
		bio: string | null;
		country: string | null;
		tel: string | null;
	};
	token: string | null;
	loginRoute: string;
	login: (token: string) => void;
	logout: () => void;
};

export type AuthContextProviderProps = {
	children: React.ReactNode;
	directTo: string;
};

// CONTEXT ⬇️

const AuthContext = createContext({
	token: null,
	tokenData: {
		id: null,
		username: null,
		email: null,
		firstname: null,
		lastname: null,
		tel: null,
		bio: null,
		country: null
	},
	loginRoute: '/',
	login: () => {},
	logout: () => {}
} as AuthData);

// PROVIDER ⬇️

export function AuthContextProvider({ children, directTo }: AuthContextProviderProps) {
	const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
	const [jwtData, setJwtData] = useState<AuthData['tokenData'] | null>(null);
	const authToken = cookies['auth-token'] || null;

	const login = (token: string) => setCookie('auth-token', token);
	const logout = () => removeCookie('auth-token');

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
		tokenData: {
			id: jwtData?.id || null,
			username: jwtData?.username || null,
			email: jwtData?.email || null,
			firstname: jwtData?.firstname || null,
			lastname: jwtData?.lastname || null,
			bio: jwtData?.bio || null,
			country: jwtData?.country || null,
			tel: jwtData?.tel || null
		},
		loginRoute: directTo,
		login,
		logout
	};

	return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
}

// HOOKS ⬇️

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const useForceLogin = () => {
	const { token, tokenData, loginRoute, logout } = useAuthContext();
	const navigate = useNavigate();

	if (!token) {
		window.setTimeout(() => navigate(loginRoute));
	}

	return { logout, tokenData };
};
