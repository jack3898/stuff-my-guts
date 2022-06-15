import useAuth from '../hooks/useAuthenticated';

type AuthenticatedProps = {
	children: React.ReactNode;
	expectLoggedIn?: boolean;
};

export default function Authenticated({ expectLoggedIn = true, children }: AuthenticatedProps) {
	const { loggedIn } = useAuth();

	if (expectLoggedIn === loggedIn) return <>{children}</>;

	return null;
}
