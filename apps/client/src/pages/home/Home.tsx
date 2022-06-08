import Header from '@mealideas/components/src/core-page/Header';
import Heading from '@mealideas/components/src/core-page/Heading';
import Main from '@mealideas/components/src/core-page/Main';
import Rows from '@mealideas/components/src/core-page/Rows';
import TodaysMeal from '@mealideas/components/src/meal/TodaysMeal';
import useRandomMeal from '../../hooks/useRandomMeal';

export default function Home() {
	const { data, error, retry } = useRandomMeal();

	return (
		<>
			<Header title="Meal Ideas" tagline="Inspiring your next meal" />
			<Main>
				<Rows>
					<div>
						{data && (
							<>
								<TodaysMeal name={data.name} />
								<button
									onClick={retry}
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
				</Rows>
			</Main>
		</>
	);
}
