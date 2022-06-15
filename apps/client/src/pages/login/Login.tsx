import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import { Link } from 'react-router-dom';
import useLogin from './hooks/useLogin';

export default function Login() {
	const { handleSubmit, token, error } = useLogin();

	return (
		<Main>
			<Rows>
				<div>
					<h1>Login!</h1>

					<p>
						Or maybe you need to <Link to="/signup">sign up?</Link>
					</p>

					<p>
						Or ya just want to go back <Link to="/">home?</Link> Have at it. The world's
						your oyster. :)
					</p>

					<p>
						Login credentials can be found in{' '}
						<code>packages/database/src/seed-data/user.ts</code> (oauth key is the
						password). Ensure the database is seeded with <code>npm run seed</code>{' '}
						first!
					</p>
				</div>
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
					{error && <p>{String(error)}</p>}
				</form>
				{token && (
					<div>
						<h1>You're logged in!</h1>
						<p>
							Sort of. Cookies aren't set up yet so this page won't be here for long.
						</p>
						<p>
							Currently, this authentication method is highly insecure as it is a
							proof of concept.
						</p>
						<p>Have a look at your JWT though! :)</p>
						<small>
							<code>{token}</code>
						</small>
					</div>
				)}
			</Rows>
		</Main>
	);
}
