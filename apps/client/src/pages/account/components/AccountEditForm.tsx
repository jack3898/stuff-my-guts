import useEditAccount from '../hooks/useEditAccount';

export default function AccountEditForm() {
	const {
		formik: { errors, getFieldProps, handleSubmit },
		authError
	} = useEditAccount();

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Username
					<input type="text" {...getFieldProps('username')} disabled />
				</label>
				<label>
					Email
					<input type="email" {...getFieldProps('newEmail')} />
					<small>{errors.newEmail}</small>
				</label>
				<label>
					Change your password
					<input type="password" {...getFieldProps('newPassword')} />
					<small>{errors.newPassword}</small>
				</label>
				<hr />
				<label>
					Current password*
					<input type="password" {...getFieldProps('currentPassword')} />
					<small>{errors.currentPassword}</small>
				</label>
				<div>
					<button className="btn-primary" type="submit">
						Save
					</button>
				</div>
			</form>
			{authError && <section>{String(authError)}</section>}
		</>
	);
}
