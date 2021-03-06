const actions = {
	CHECK_EMAIL: 'CHECK_EMAIL',
	REGISTER: 'REGISTER',
	CHECK_LOGIN: 'CHECK_LOGIN',
	register(login, password, email) {
		return {
			type: actions.REGISTER,
			payload: {login, password, email}
		}
	},
	checkEmail: (email) => {
		return {
			type: actions.CHECK_EMAIL,
			payload: { email }
		}
	},
	checkLogin: (login) => {
		return {
			type: actions.CHECK_LOGIN,
			payload: { login }
		}
	}
};

export default actions;
