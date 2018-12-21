import actions from './actions'
import { FAIL, SORT_DESC, SUCCESS, START } from '../../constants';

export const RESET_PASSWORD_RESPONSE = 'RESET_PASSWORD_RESPONSE';
export function resetPasswordResponseReducer(state = {}, action) {
	const {type, response, error} = action;

	switch (type) {
		case actions.RESET_PASSWORD + START:
			return {
				loading: true
			};
		case actions.RESET_PASSWORD + FAIL:
			return {
				error
			};
		case actions.RESET_PASSWORD + SUCCESS:
			return response;
		default:
			return state;
	}
}

export default {
	resetPasswordResponse: resetPasswordResponseReducer,
}
