import { useAuthContext } from '@mealideas/components/src/hooks/useAuth';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useEditUserMutation } from '../../../generated/graphql';

const validationSchema = Yup.object({
	newEmail: Yup.string().email('Invalid email address'),
	newPassword: Yup.string().min(8, 'Password is too short'),
	currentPassword: Yup.string().required('Required to authorise changes to your account!')
});

export default function useEditAccount() {
	const { logout, tokenData, token } = useAuthContext();
	const [error, setError] = useState<Error | null>(null);
	const [editUser] = useEditUserMutation();

	const formik = useFormik({
		validationSchema,
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
