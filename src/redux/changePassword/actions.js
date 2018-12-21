const actions = {
	CHANGE_PASSWORD: 'CHANGE_PASSWORD',
	changePassword: (password, token) => ({
		type: actions.CHANGE_PASSWORD,
		payload: { password, token, password_repeat: password }
	})
};

export default actions;
