import { all, takeEvery, put, select, fork } from 'redux-saga/effects';
import request from '../requestAction'
import { stopSubmit } from 'redux-form';
import regeneratorRuntime from 'regenerator-runtime'
import actions from './actions';
import { SORT_ASC, SORT_DESC, SUCCESS, FAIL, SUCCESS_REQ } from '../../constants';

const selectParams = state => state.afParams;

export function* resetPasswordSaga(action) {
	const params = yield select(selectParams);
	console.log(params)

	if (!params || !params['auth-forms-reset_password']) return null;

	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: params['auth-forms-reset_password'].url
		//'/v1/common/auth/password-reset-request',
	}))
}

export function* resetPasswordFailSaga(action) {
	if (action.error) {
		const errors = { email: action.error.message };
		yield put(stopSubmit('auth-forms-reset_password', errors))
	}
}

export default function* rootSaga(action) {

	yield all([
		takeEvery(actions.RESET_PASSWORD + FAIL, resetPasswordFailSaga),
		takeEvery(actions.RESET_PASSWORD, resetPasswordSaga)
	]);
}
