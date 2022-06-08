import randomNumber from '@mealideas/utils/src/randomNumber';
import { useCallback, useEffect, useState } from 'react';

export default function useRandomMeal() {
	const [data, setData] = useState<DummyData | null>(null);
	const [error, setError] = useState<string | null>(null);

	const retry = useCallback(() => {
		setData(dummyData[randomNumber(0, dummyData.length - 1)]);
	}, []);

	useEffect(() => {
		setTimeout(retry, 2000);
	}, []);

	return { data, error, retry };
}

type DummyData = {
	id: number;
	name: string;
	approval: {
		jack: number;
		bill: number;
		dan: number;
		fred: number;
		andy: number;
		alex: number;
	};
	cookTime: number;
	cookDifficulty: number;
	bestDays: string[];
	bestSeason: string[];
	holidays: string[];
};

const dummyData: DummyData[] = [
	{
		id: 1,
		name: 'Chicken Burgers',
		approval: {
			jack: 3,
			bill: 3,
			dan: 3,
			fred: 4,
			andy: 4,
			alex: 4
		},
		cookTime: 2,
		cookDifficulty: 2,
		bestDays: ['wednesday'],
		bestSeason: [],
		holidays: []
	},
	{
		id: 2,
		name: 'Chilli',
		approval: {
			jack: 1,
			bill: 4,
			dan: 4,
			fred: 4,
			andy: 4,
			alex: 4
		},
		cookTime: 3,
		cookDifficulty: 2,
		bestDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
		bestSeason: [],
		holidays: []
	},
	{
		id: 3,
		name: 'Stir Fry',
		approval: {
			jack: 5,
			bill: 3,
			dan: 1,
			fred: 2,
			andy: 4,
			alex: 4
		},
		cookTime: 2,
		cookDifficulty: 1,
		bestDays: [],
		bestSeason: [],
		holidays: []
	},
	{
		id: 4,
		name: 'Fajitas',
		approval: {
			jack: 4,
			bill: 5,
			dan: 5,
			fred: 1,
			andy: 4,
			alex: 4
		},
		cookTime: 2,
		cookDifficulty: 2,
		bestDays: ['wednesday'],
		bestSeason: [],
		holidays: []
	}
];
