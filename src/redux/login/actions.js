const actions = {
	LOGIN: 'LOGIN',
	CONFIRM_EMAIL: 'CONFIRM_EMAIL',
	CLEAR: 'CLEAR',
	login: (login, password, remember) => ({
		type: actions.LOGIN,
		payload: {
			login,
			password,
			remember
		}
	}),
	confirmEmail: token => ({
		type: actions.CONFIRM_EMAIL,
		payload: { token }
	}),
	clearConfirmResponse: () => ({
		type: actions.CLEAR
	})
};

export default actions;
