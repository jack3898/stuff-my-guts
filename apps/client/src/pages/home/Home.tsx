import Header from '@mealideas/components/src/core-page/Header';
import Heading from '@mealideas/components/src/core-page/Heading';
import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import TodaysMeal from '@mealideas/components/src/meal/TodaysMeal';
import { useMealQuery, useUsersQuery } from '../../generated/graphql';
import useRandomMeal from '../../hooks/useRandomMeal';

export default function Home() {
	const meals = useRandomMeal();
	const users = useUsersQuery();
	const meal = useMealQuery();

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
						<p>{users.data?.users[0].firstname}</p>
						<p>{meal.data?.meal?.name}</p>
					</div>
				</Rows>
			</Main>
		</>
	);
}
