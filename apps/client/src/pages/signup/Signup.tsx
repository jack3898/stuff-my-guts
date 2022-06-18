import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import { Link } from 'react-router-dom';
import SignupForm from './components/SignupForm';

export default function Signup() {
	return (
		<Main>
			<Rows>
				<div>
					<h1>Sign up!</h1>
					<p>Tell us a little bit about yourself!</p>
					<p>
						We promise the only thing we will ever know about you is what you provide
						us, unlike *cough* *cough* Facebook or Google.
					</p>
					<p>
						If you already have an account with us,{' '}
						<Link to="/login">log in here!</Link>
					</p>
				</div>
				<SignupForm />
				<div>
					<h2>Note:</h2>
					<p>
						This page currently does not function, as the backend has not yet been
						configured for sign-ups.
					</p>
				</div>
			</Rows>
		</Main>
	);
}