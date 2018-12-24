import { FAIL, START, SUCCESS } from '../constants';
import actions from '../redux/commonActions'

export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export function afParams(state = {}, action) {
	const { type, payload, error } = action;

	switch (type) {
		case actions.SET_AF_PARAMS:
			return {
				...state,
				[payload.form]: payload.params
			};
		default:
			return state;
	}
}

export default {
	afParams
}

