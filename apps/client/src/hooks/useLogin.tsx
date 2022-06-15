import { FormEvent, useCallback } from 'react';
import { useAuthenticateMutation } from '../generated/graphql';

// TODO: Replace with Formik!
export default function useLogin() {
	const [authenticate, { data, error }] = useAuthenticateMutation();

	const handleSubmit = useCallback((event: FormEvent) => {
		event.preventDefault();

		const { email, password } = Object.values(event.currentTarget).reduce(
			(accumulator, { name, value }) => {
				if (!name) return accumulator;
				accumulator[name] = value;
				return accumulator;
			},
			{}
		);

		authenticate({ variables: { email, password } }).catch(console.error);
	}, []);

	return { handleSubmit, token: data?.authenticate, error };
}
