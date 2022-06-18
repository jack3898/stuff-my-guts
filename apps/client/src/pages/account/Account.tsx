import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import { useForceLogin } from '@mealideas/components/src/hooks/useAuth';
import AccountEditForm from './components/AccountEditForm';

export default function Account() {
	useForceLogin();

	return (
		<Main>
			<Rows>
				<section>
					<h1>Account</h1>
					<p>You can review and edit your account details below.</p>
				</section>
				<section>
					<h2>Account</h2>
					<AccountEditForm />
				</section>
			</Rows>
		</Main>
	);
}