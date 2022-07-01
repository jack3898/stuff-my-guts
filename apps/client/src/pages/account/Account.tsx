import Main from '@smg/components/src/core-page/Main';
import Rows from '@smg/components/src/core-page/Rows';
import AccountEditForm from './components/AccountEditForm';

export default function Account() {
	return (
		<Main>
			<Rows>
				<section>
					<h1>Your Account</h1>
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
