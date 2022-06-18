import { useAuthContext } from '@mealideas/components/src/hooks/useAuth';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuthenticateMutation } from '../generated/graphql';

const validationSchema = Yup.object({
	email: Yup.string().email('Invalid email address').required('Required'),
	username: Yup.string().required('Required'),
	firstname: Yup.string().required('Required'),
	lastname: Yup.string().required('Required'),
	password: Yup.string().min(8, 'Password is too short').required('Required')
});

export default function useSignup() {
	const { login, tokenData } = useAuthContext();
	const [error, setError] = useState<Error | null>(null);
	const [authenticate] = useAuthenticateMutation();

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
			alert(JSON.stringify(variables));
		}
	});

	return { formik, authError: error, tokenData };
}
