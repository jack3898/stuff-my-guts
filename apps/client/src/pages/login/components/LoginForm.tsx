import { useAuthContext } from '@smg/components/src/hooks/useAuth';
import { authenticateUserValidation } from '@smg/validation/src/user.validation';
import { useFormik } from 'formik';

export default function LoginForm() {
	const { login, error } = useAuthContext();

	const { getFieldProps, handleSubmit, errors } = useFormik({
		validationSchema: authenticateUserValidation,
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: login
	});

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Email <input type="email" {...getFieldProps('email')} />
					<small>{errors.email}</small>
				</label>
				<label>
					Password <input type="password" {...getFieldProps('password')} />
					<small>{errors.password}</small>
				</label>
				<div>
					<button className="btn-primary" type="submit">
						Login
					</button>
				</div>
			</form>
			{error && <section>{String(error)}</section>}
		</>
	);
}
