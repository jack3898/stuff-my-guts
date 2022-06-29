import { useAuthContext } from '@smg/components/src/hooks/useAuth';
import { useAuthenticateMutation } from '@smg/graphql/codegen/client';
import { authenticateUserValidation } from '@smg/validation/src/user.validation';
import { useFormik } from 'formik';
import { useState } from 'react';

export default function useLogin() {
	const { tokenData } = useAuthContext();
	const [error, setError] = useState<Error | null>(null);
	const [authenticate] = useAuthenticateMutation();

	const formik = useFormik({
		validationSchema: authenticateUserValidation,
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: (variables) => {
			authenticate({ variables })
				.then(() => {
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
