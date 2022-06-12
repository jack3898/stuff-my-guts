import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const navigate = useNavigate();

	return (
		<Main>
			<Rows>
				<section>
					<h1>Home!</h1>
					<p>
						Welcome to Stuff My Guts, a place where you can plan and share what you eat.
						It's like a social media for food!
					</p>
				</section>
				<section>
					<h2>You don't seem to be logged in...</h2>
					<button className="btn-primary" type="button" onClick={() => navigate('login')}>
						Login
					</button>
				</section>
			</Rows>
		</Main>
	);
}
