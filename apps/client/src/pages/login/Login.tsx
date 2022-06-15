import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import useAuth from '@mealideas/components/src/hooks/useAuthenticated';
import Authenticated from '@mealideas/components/src/util/Authenticated';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

export default function Login() {
	const { handleSubmit, token, error } = useLogin();
	const { setCookieToken, decodedToken, removeCookieToken } = useAuth();

	if (token) {
		setCookieToken(token);
	}

	return (
		<Main>
			<Rows>
				<div>
					<h1>Login page!</h1>
				</div>
				<Authenticated expectLoggedIn={false}>
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
				</Authenticated>
				<Authenticated>
					<div>
						<h1>You're logged in!</h1>
						<p>
							Hello {decodedToken?.firstname} {decodedToken?.lastname}!
						</p>
						<p>
							<button
								className="btn-primary"
								onClick={() => removeCookieToken()}
								type="button"
							>
								Logout
							</button>
						</p>
						<p>
							The <Link to="/">homepage</Link> will have changed too!
						</p>
					</div>
				</Authenticated>
			</Rows>
		</Main>
	);
}
