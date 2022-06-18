import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import { useForceLogin } from '@mealideas/components/src/hooks/useAuth';

export default function Home() {
	const { logout, tokenData } = useForceLogin();

	return (
		<Main>
			<Rows>
				<section>
					<h1>Home!</h1>
					<p>
						Hey, {tokenData.firstname} {tokenData.lastname}!
					</p>
				</section>
				<section>
					<h2>Logout</h2>
					<button className="btn-primary" onClick={logout}>
						Log me out boi
					</button>
				</section>
			</Rows>
		</Main>
	);
}
