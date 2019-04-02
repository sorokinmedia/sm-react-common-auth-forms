const actions = {
	CHANGE_PASSWORD: 'CHANGE_PASSWORD',
	changePassword: (password, token) => ({
		type: actions.CHANGE_PASSWORD,
		payload: {
			password,
			password_repeat: password,
			token
		}
	})
};

export default actions;
