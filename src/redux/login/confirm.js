import actions from './actions'
import { FAIL, SORT_DESC, SUCCESS, START } from '../../constants';

export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export function confirmMailResponseReducer(state = {}, action) {
	const { type, response, error } = action;

	switch (type) {
		case actions.CONFIRM_EMAIL + START:
			return {
				loading: true
			};
		case actions.CONFIRM_EMAIL + FAIL:
			return {
				error
			};
		case actions.CONFIRM_EMAIL + SUCCESS:
			return response;
		case actions.CLEAR:
			return {};
		default:
			return state;
	}
}


export default {
	confirmMail: confirmMailResponseReducer,
}
