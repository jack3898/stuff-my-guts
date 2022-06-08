import Heading from '../core-page/Heading';

type TodaysMealProps = {
	name: string;
};

export default function TodaysMeal(props: TodaysMealProps) {
	return (
		<section>
			<Heading level="1" text={`Today's Meal: ${props.name}!`} />
			<p>We picked {props.name} :D</p>
		</section>
	);
}
