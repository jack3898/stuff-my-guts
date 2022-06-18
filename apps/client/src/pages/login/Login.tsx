import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import { useAuthContext } from '@mealideas/components/src/hooks/useAuth';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

export default function Login() {
	const { login, tokenData } = useAuthContext();
	const { handleSubmit, error } = useLogin(login);

	return (
		<Main>
			<Rows>
				<div>
					<h1>Login page!</h1>
				</div>
				<p>
					Or maybe ya just want to go back <Link to="/">home?</Link> Have at it. The
					world's your oyster. :)
				</p>
				<p>
					Login credentials can be found in{' '}
					<code>packages/database/src/seed-data/user.ts</code>. Ensure the database is
					seeded with <code>npm run seed</code> first!
				</p>
				<form onSubmit={handleSubmit}>
					<label>
						Email <input type="email" name="email" />
					</label>
					<label>
						Password <input type="password" name="password" />
					</label>
					<div>
						<button className="btn-primary" type="submit">
							Login
						</button>
					</div>
					{error && <div>{String(error)}</div>}
				</form>
				<section>{tokenData.firstname && <h2>Hello {tokenData.firstname}!</h2>}</section>
			</Rows>
		</Main>
	);
}
