import actions from './actions'
import { FAIL, SORT_DESC, SUCCESS, START } from '../../constants';

export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export function loginResponseReducer(state = {}, action) {
	const { type, response, error } = action;

	switch (type) {
		case actions.LOGIN + START:
			return {
				loading: true
			};
		case actions.LOGIN + FAIL:
			return {
				error
			};
		case actions.LOGIN + SUCCESS:
			return response;
		default:
			return state;
	}
}

export default {
	[LOGIN_RESPONSE]: loginResponseReducer,
}
