type TodaysMealProps = {
	name: string;
};

export default function TodaysMeal(props: TodaysMealProps) {
	return (
		<section>
			<h1>Today's Meal: {props.name}!</h1>
			<p>We picked {props.name} :D</p>
		</section>
	);
}
