import Main from '@smg/components/src/core-page/Main';
import Rows from '@smg/components/src/core-page/Rows';
import { useLoggedInUserQuery, useMealsLazyQuery } from '@smg/graphql/codegen/client';
import formatDate from '@smg/utils/src/shared/formatDate';
import { useEffect } from 'react';

export default function Home() {
	const loggedInUserQuery = useLoggedInUserQuery();
	const loggedInUser = loggedInUserQuery.data?.loggedInUser;
	const [getMeals, { data, fetchMore }] = useMealsLazyQuery();

	useEffect(() => {
		if (loggedInUser?.id) getMeals({ variables: { ownerId: loggedInUser.id } });
	}, [loggedInUser?.id]);

	const { pageInfo, edges } = data?.meals || {};

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
						{edges?.map((edge) => {
							return (
								<li className="border rounded p-4">
									<h3>{edge?.node?.name}</h3>
									<p>{edge?.node?.about}</p>
									<small>{formatDate(new Date(edge?.node?.created))}</small>
								</li>
							);
						})}
					</ul>
				</section>
				<section>
					<button
						className="btn-primary"
						disabled={!pageInfo?.hasNextPage}
						onClick={() => {
							if (pageInfo?.hasNextPage) {
								fetchMore({ variables: { after: pageInfo?.endCursor } });
							}
						}}
					>
						Load more!
					</button>
				</section>
			</Rows>
		</Main>
	);
}
