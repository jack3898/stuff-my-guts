import useLogin from '../../../hooks/useLogin';

export default function LoginForm() {
	const {
		formik: { getFieldProps, handleSubmit, errors },
		authError
	} = useLogin();

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
			{authError && <section>{String(authError)}</section>}
		</>
	);
}
