import { useAuthContext } from '@mealideas/components/src/hooks/useAuth';
import { createUserValidation } from '@mealideas/validation/src/user.validation';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useCreateUserMutation } from '../../../generated/graphql';

export default function useSignup() {
	const { token } = useAuthContext();
	const [success, setSuccess] = useState<boolean | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [createUser] = useCreateUserMutation();

	const formik = useFormik({
		validationSchema: createUserValidation,
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
