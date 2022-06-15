import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import useAuth from '@mealideas/components/src/hooks/useAuthenticated';
import Authenticated from '@mealideas/components/src/util/Authenticated';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const navigate = useNavigate();
	const { decodedToken, removeCookieToken } = useAuth();

	return (
		<Main>
			<Rows>
				<section>
					<Authenticated expectLoggedIn={false}>
						<h1>Home!</h1>
					</Authenticated>
					<Authenticated>
						<h1>
							Hey, {decodedToken?.firstname} {decodedToken?.lastname}!
						</h1>
					</Authenticated>
					<p>
						Welcome to Stuff My Guts, a place where you can plan and share what you eat.
						It's like a social media for food!
					</p>
					<Authenticated>
						<button
							className="btn-primary"
							onClick={() => removeCookieToken()}
							type="button"
						>
							Logout
						</button>
					</Authenticated>
				</section>
				<Authenticated expectLoggedIn={false}>
					<section>
						<h2>You don't seem to be logged in...</h2>
						<button
							className="btn-primary"
							type="button"
							onClick={() => navigate('login')}
						>
							Login
						</button>
					</section>
				</Authenticated>
			</Rows>
		</Main>
	);
}
