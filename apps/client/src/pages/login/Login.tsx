import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import { useAuthContext } from '@mealideas/components/src/hooks/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';

export default function Login() {
	const { token } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (token) navigate('/');
	}, [token]);

	return (
		<Main>
			<Rows>
				<div>
					<h1>Welcome!</h1>
					<p>You need to be logged in to use this website.</p>
					<p>
						If you do not yet have an account, please{' '}
						<Link to="/signup">sign up here!</Link>
					</p>
					<p>
						Or maybe ya just want to go back <Link to="/">home?</Link> Have at it. The
						world's your oyster. :)
					</p>
					<p>
						Sample login credentials can be found in{' '}
						<code>packages/database/src/seed-data/user.ts</code>. Ensure the database is
						seeded with <code>npm run seed</code> first!
					</p>
				</div>
				<LoginForm />
			</Rows>
		</Main>
	);
}
