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
			</Rows>
		</Main>
	);
}
