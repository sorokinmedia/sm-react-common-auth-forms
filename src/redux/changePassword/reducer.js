import actions from './actions'
import { FAIL, SORT_DESC, SUCCESS, START } from '../../constants';

export const CHANGE_PASSWORD_RESPONSE = 'CHANGE_PASSWORD_RESPONSE';
export function changePasswordResponseReducer(state = {}, action) {
	const { type, response, error } = action;

	switch (type) {
		case actions.CHANGE_PASSWORD + START:
			return {
				loading: true
			};
		case actions.CHANGE_PASSWORD + FAIL:
			return {
				error
			};
		case actions.CHANGE_PASSWORD + SUCCESS:
			return response;
		default:
			return state;
	}
}

export default {
	changePasswordResponse: changePasswordResponseReducer,
}
