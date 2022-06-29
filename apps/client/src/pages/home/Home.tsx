import Main from '@smg/components/src/core-page/Main';
import Rows from '@smg/components/src/core-page/Rows';
import { useForceLogin } from '@smg/components/src/hooks/useAuth';
import formatDate from '@smg/utils/src/shared/formatDate';
import { useMealsQuery } from '../../generated/graphql';

export default function Home() {
	const { tokenData } = useForceLogin();
	const { data } = useMealsQuery({ variables: { ownerId: tokenData.id! } });

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
					<h2>Your meals 🍝</h2>
					<p>Below are your meals!</p>
					<ul className="grid gap-4">
						{data?.meals?.map((meal) => {
							return (
								<li className="border rounded p-4">
									<h3>{meal?.name}</h3>
									<p>{meal?.about}</p>
									<small>{formatDate(new Date(meal?.created))}</small>
								</li>
							);
						})}
					</ul>
				</section>
			</Rows>
		</Main>
	);
}
