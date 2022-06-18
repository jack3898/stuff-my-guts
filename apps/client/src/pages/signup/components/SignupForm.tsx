import { useEffect } from 'react';
import useSignup from '../hooks/useSignup';

export default function SignupForm() {
	const {
		formik: { getFieldProps, handleSubmit, errors },
		authError,
		success
	} = useSignup();

	useEffect(() => {
		if (success) alert('Congrats! You now have an account!'); // TODO: remove this alert
	}, [success]);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Email* <input type="email" {...getFieldProps('email')} />
					<small>{errors.email}</small>
				</label>
				<label>
					Username* <input type="text" {...getFieldProps('username')} />
					<small>{errors.username}</small>
				</label>
				<label>
					First name* <input type="text" {...getFieldProps('firstname')} />
					<small>{errors.firstname}</small>
				</label>
				<label>
					Last name* <input type="text" {...getFieldProps('lastname')} />
					<small>{errors.lastname}</small>
				</label>
				<label>
					Password* <input type="password" {...getFieldProps('password')} />
					<small>{errors.password}</small>
				</label>
				<div>
					<button className="btn-primary" type="submit">
						Sign me up!
					</button>
				</div>
			</form>
			{authError && <section>{String(authError)}</section>}
		</>
	);
}
