import actions from './actions'
import { FAIL, SORT_DESC, SUCCESS, START } from '../../constants';

export const REGISTER_RESPONSE = 'REGISTER_RESPONSE';
export function registerResponseReducer(state = {}, action) {
	const {type, response, error} = action;

	switch (type) {
		case actions.REGISTER + START:
			return {
				loading: true
			};
		case actions.REGISTER + FAIL:
			return {
				error
			};
		case actions.REGISTER + SUCCESS:
			return response;
		default:
			return state;
	}
}

export default {
	registerResponse: registerResponseReducer,
}
