import { useAuthContext } from '@smg/components/src/hooks/useAuth';
import { useEditUserMutation } from '@smg/graphql/codegen/client';
import { updateUserValidation } from '@smg/validation/src/user.validation';
import { useFormik } from 'formik';
import { useState } from 'react';

export default function useEditAccount() {
	const { logout, tokenData, token } = useAuthContext();
	const [error, setError] = useState<Error | null>(null);
	const [editUser] = useEditUserMutation();

	const formik = useFormik({
		validationSchema: updateUserValidation,
		initialValues: {
			username: tokenData.username,
			newEmail: tokenData.email,
			newPassword: '',
			currentPassword: ''
		},
		onSubmit: (variables) => {
			editUser({
				variables: {
					token: token as string,
					currentPassword: variables.currentPassword,
					newEmail: variables.newEmail,
					newPassword: variables.newPassword
				}
			})
				.then(() => {
					alert('Your account has been edited! You must sign back in.');
					logout();
					setError(null);
				})
				.catch((error) => {
					console.error(error);
					setError(error);
				});
		}
	});

	return { formik, authError: error };
}
