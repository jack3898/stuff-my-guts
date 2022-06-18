import { useAuthContext } from '@mealideas/components/src/hooks/useAuth';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuthenticateMutation } from '../../../generated/graphql';

const validationSchema = Yup.object({
	email: Yup.string().email('Invalid email address').required('Required'),
	password: Yup.string().required('Required')
});

export default function useLogin() {
	const { login, tokenData } = useAuthContext();
	const [error, setError] = useState<Error | null>(null);
	const [authenticate] = useAuthenticateMutation();

	const formik = useFormik({
		validationSchema,
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: (variables) => {
			authenticate({ variables })
				.then(({ data }) => {
					if (data?.authenticate) login(data.authenticate);
					setError(null);
				})
				.catch((error) => {
					console.error(error);
					setError(error);
				});
		}
	});

	return { formik, authError: error, tokenData };
}
