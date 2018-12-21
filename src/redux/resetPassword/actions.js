const actions = {
	RESET_PASSWORD: 'RESET_PASSWORD',
	resetPassword: (email) => ({
		type: actions.RESET_PASSWORD,
		payload: { email }
	})
};

export default actions;
