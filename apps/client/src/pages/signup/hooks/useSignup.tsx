import { useAuthContext } from '@mealideas/components/src/hooks/useAuth';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useCreateUserMutation } from '../../../generated/graphql';

const validationSchema = Yup.object({
	email: Yup.string().email('Invalid email address').required('Required'),
	username: Yup.string().required('Required'),
	firstname: Yup.string().required('Required'),
	lastname: Yup.string().required('Required'),
	password: Yup.string().min(8, 'Password is too short').required('Required')
});

export default function useSignup() {
	const { token } = useAuthContext();
	const [success, setSuccess] = useState<boolean | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [createUser] = useCreateUserMutation();

	const formik = useFormik({
		validationSchema,
		initialValues: {
			email: '',
			username: '',
			firstname: '',
			lastname: '',
			password: ''
		},
		onSubmit: (variables) => {
			if (token) {
				const error = new Error('Already logged in! Please log out first.');
				console.error(error);
				setError(error);
			}

			createUser({ variables })
				.then(({ data }) => setSuccess(!!data?.create))
				.catch((error) => {
					console.error(error);
					setError(error);
				});
		}
	});

	return { formik, authError: error, success };
}
