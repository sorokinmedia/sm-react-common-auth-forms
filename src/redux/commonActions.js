const actions = {
	SET_AF_PARAMS: 'SET_AF_PARAMS',
	setParams: (form, params) => ({
		type: actions.SET_AF_PARAMS,
		payload: {
			form,
			params
		}
	})
};

export default actions

