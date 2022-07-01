import { useAuthContext } from '@smg/components/src/hooks/useAuth';
import { useEditUserMutation, useLoggedInUserQuery } from '@smg/graphql/codegen/client';
import { updateUserValidation } from '@smg/validation/src/user.validation';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

export default function useEditAccount() {
	const { logout, token } = useAuthContext();
	const loggedInUserQuery = useLoggedInUserQuery();
	const loggedInUser = loggedInUserQuery.data?.loggedInUser;
	const [error, setError] = useState<Error | null>(null);
	const [editUser] = useEditUserMutation();

	const formik = useFormik({
		validationSchema: updateUserValidation,
		initialValues: {
			username: '',
			newEmail: '',
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

	// Pre-fill current details when user has been found
	useEffect(() => {
		if (!loggedInUser?.username || !loggedInUser?.email) return;

		formik.setValues({
			newEmail: loggedInUser.email,
			username: loggedInUser.username,
			newPassword: '',
			currentPassword: ''
		});
	}, [loggedInUser?.email, loggedInUser?.username]);

	return { formik, authError: error };
}
