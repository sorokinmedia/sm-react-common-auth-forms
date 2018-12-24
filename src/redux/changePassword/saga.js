import { all, takeEvery, put, select, fork } from 'redux-saga/effects';
import request from '../requestAction'
import { stopSubmit } from 'redux-form';
import regeneratorRuntime from 'regenerator-runtime'
import actions from './actions';
import { SORT_ASC, SORT_DESC, SUCCESS, FAIL, SUCCESS_REQ } from '../../constants';

const selectParams = state => state.afParams;

export function* changePasswordSaga(action) {
	const params = yield select(selectParams);

	if (!params || !params['auth-forms-change_password']) return null;

	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: params['auth-forms-change_password'].url
		//'/v1/common/auth/password-reset',
	}))
}

export function* changePasswordFailSaga(action) {
	const { response } = action;
	if (action.error) {
		const errors = { password: action.error.message };
		yield put(stopSubmit('auth-forms-change_password', errors))
	}
}

export default function* rootSaga(action) {

	yield all([
		takeEvery(actions.CHANGE_PASSWORD + FAIL, changePasswordFailSaga),
		takeEvery(actions.CHANGE_PASSWORD, changePasswordSaga)
	]);
}
