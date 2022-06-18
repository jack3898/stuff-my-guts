import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import { useAuthContext } from '@mealideas/components/src/hooks/useAuth';
import { Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';

export default function Login() {
	const { tokenData } = useAuthContext();

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
						Login credentials can be found in{' '}
						<code>packages/database/src/seed-data/user.ts</code>. Ensure the database is
						seeded with <code>npm run seed</code> first!
					</p>
				</div>
				<LoginForm />
				<section>{tokenData.firstname && <h2>Hello {tokenData.firstname}!</h2>}</section>
			</Rows>
		</Main>
	);
}
