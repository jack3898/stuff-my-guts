import Main from '@smg/components/src/core-page/Main';
import Rows from '@smg/components/src/core-page/Rows';
import { useLoggedInUserQuery, useMealsLazyQuery } from '@smg/graphql/codegen/client';
import formatDate from '@smg/utils/src/shared/formatDate';
import { useEffect } from 'react';

export default function Home() {
	const loggedInUserQuery = useLoggedInUserQuery();
	const loggedInUser = loggedInUserQuery.data?.loggedInUser;
	const [getMeals, { data }] = useMealsLazyQuery();

	useEffect(() => {
		if (loggedInUser?.id) getMeals({ variables: { ownerId: loggedInUser.id } });
	}, [loggedInUser?.id]);

	return (
		<Main>
			<Rows>
				<section>
					<h1>Hey {loggedInUser?.firstname}!</h1>
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
