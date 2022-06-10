import { gql, useQuery } from '@apollo/client';
import Header from '@mealideas/components/src/core-page/Header';
import Heading from '@mealideas/components/src/core-page/Heading';
import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import TodaysMeal from '@mealideas/components/src/meal/TodaysMeal';
import useRandomMeal from '../../hooks/useRandomMeal';
import { Users } from './__generated__/Users';

export default function Home() {
	const meals = useRandomMeal();
	const users = useQuery<Users>(gql`
		query Users {
			users {
				email
				name
			}
		}
	`);

	return (
		<>
			<Header title="Meal Ideas" tagline="Inspiring your next meal" />
			<Main>
				<Rows>
					<div>
						{meals.data && (
							<>
								<TodaysMeal name={meals.data.name} />
								<button
									onClick={meals.retry}
									className="bg-black text-white p-2 rounded"
									type="button"
								>
									I don't fancy this one
								</button>
							</>
						)}
					</div>

					<div>
						<Heading level="2" text="Tomorrow's Meal" />
					</div>

					<div>
						<Heading level="2" text="Some random users lol" />
						<p>{JSON.stringify(users.data)}</p>
					</div>
				</Rows>
			</Main>
		</>
	);
}
