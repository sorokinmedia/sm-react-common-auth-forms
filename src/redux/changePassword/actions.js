const actions = {
	LOGIN: 'LOGIN',
	login: (login, password, remember) => ({
		type: actions.LOGIN,
		payload: { login, password, remember }
	})
};

export default actions;
