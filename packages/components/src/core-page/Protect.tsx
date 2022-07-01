import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';

type ProtectProps = {
	/**
	 * Apply a redirection to a certain page when not authenticated.
	 */
	to?: string;
	/**
	 * Require no authentication instead?
	 */
	invert?: boolean;
	/**
	 * Render children. If not set, the component will seek to render a
	 * React Router DOM Outlet component instead.
	 */
	children?: React.ReactNode;
};

/**
 * A really handy component that will only render its children or a router Outlet when authenticated.
 */
export function Protect({ to, invert = false, children = null }: ProtectProps) {
	const { token } = useAuthContext();

	const FinalComponent = () => (children ? <>{children}</> : <Outlet />);
	const FinalNavigator = () => (to ? <Navigate to={to} /> : null);

	return !token === invert ? <FinalComponent /> : <FinalNavigator />;
}
