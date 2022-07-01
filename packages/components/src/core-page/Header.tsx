import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';
import { Protect } from './Protect';

type HeaderProps = {
	title: string;
	tagline: string;
};

export default function Header({ title, tagline }: HeaderProps) {
	const navigate = useNavigate();
	const { logout } = useAuthContext();

	return (
		<>
			<header className="bg-black text-white p-4 text-center mb-4">
				<span className="font-serif font-bold text-2xl">{title}</span> - <em>{tagline}</em>
			</header>
			<nav className="max-w-4xl mx-auto flex flex-wrap gap-4 mb-4 px-4">
				<Protect>
					<button className="btn-primary" onClick={() => navigate('/')} role="link">
						Your page
					</button>
					<button
						className="btn-primary"
						onClick={() => navigate('/account')}
						role="link"
					>
						Account
					</button>
					<button
						className="btn-primary"
						onClick={() => navigate('/planner')}
						role="link"
					>
						Planner
					</button>
					<button className="btn-primary" onClick={() => navigate('/create')} role="link">
						Create
					</button>
					<button className="btn-secondary" onClick={() => logout()} role="link">
						Logout
					</button>
				</Protect>
				<Protect invert={true}>
					<button className="btn-primary" onClick={() => navigate('/login')} role="link">
						Login
					</button>
					<button className="btn-primary" onClick={() => navigate('/signup')} role="link">
						Sign up
					</button>
				</Protect>
			</nav>
		</>
	);
}
