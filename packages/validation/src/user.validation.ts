import * as Yup from 'yup';

const PASSWORD_MIN_LEN = 8;
const REQUIRED_MSG = 'Required';
const INVALID_EMAIL_MSG = 'Invalid email address';
const INVALID_PASSWORD_MSG = 'Password is too short';

export const authenticateUserValidation = Yup.object({
	email: Yup.string().email(INVALID_EMAIL_MSG).required(REQUIRED_MSG),
	password: Yup.string().required(REQUIRED_MSG)
});

export const createUserValidation = Yup.object({
	email: Yup.string().email(INVALID_EMAIL_MSG).required(REQUIRED_MSG),
	username: Yup.string().required(REQUIRED_MSG),
	firstname: Yup.string().required(REQUIRED_MSG),
	lastname: Yup.string().required(REQUIRED_MSG),
	password: Yup.string().min(PASSWORD_MIN_LEN, INVALID_PASSWORD_MSG).required(REQUIRED_MSG)
});

export const updateUserValidation = Yup.object({
	newEmail: Yup.string().email(INVALID_EMAIL_MSG),
	newPassword: Yup.string().min(PASSWORD_MIN_LEN, INVALID_PASSWORD_MSG),
	currentPassword: Yup.string().required(
		'Requires current password to authorise changes to your account!'
	)
});
