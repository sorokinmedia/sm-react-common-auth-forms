import { all, takeEvery, put, select, fork } from 'redux-saga/effects';
import request from '../requestAction'
import { stopSubmit, stopAsyncValidation } from 'redux-form';
import regeneratorRuntime from 'regenerator-runtime'
import actions from './actions';
import { SORT_ASC, SORT_DESC, SUCCESS, FAIL, SUCCESS_REQ } from '../../constants';

const selectParams = state => state.afParams;

export function* loginSaga(action) {
	const params = yield select(selectParams);

	if (!params || !params['auth-forms-login']) return null;

	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: params['auth-forms-login'].url,
	}))
}

export function* confirmEmailSaga(action) {
	const params = yield select(selectParams);
	yield console.log(action, params, 'helo')
	if (!params || !params['auth-forms-login']) return null;

	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: params['auth-forms-login'].confirmEmailUrl,
	}))
}
export function* confirmEmailSuccessSaga(action) {
	const { response } = action;
	if (action.error) {
		const errors = { login: action.error.message };

		yield put(stopSubmit('auth-forms-login', errors))
	}
}

export function* confirmEmailFailSaga(action) {
	yield console.log(action)
	const errors = { login: action.error.message };
	yield put(stopSubmit('auth-forms-login', errors))
}

export function* loginSuccessSaga(action) {
	const { response } = action;
	if (response.serverStatus === 100) {
		const errors = { login: response.message };
		yield put(stopSubmit('login', errors))
	} else {
		const expires = `expires=${new Date(response.data.exp * 1000).toUTCString()}`;
		const domain = `domain=${location.hostname === 'localhost' ? '' : '.'}${location.hostname}`;
		document.cookie = `auth_token=${response.data.token}; ${expires}; ${domain}; path=/`;
		location.href = location.origin
	}
}

export function* loginFailSaga(action) {
	const errors = { login: action.error.message };
	yield put(stopSubmit('auth-forms-login', errors))
}


export default function* rootSaga() {
	yield all([
		takeEvery(actions.LOGIN + SUCCESS, loginSuccessSaga),
		takeEvery(actions.LOGIN + FAIL, loginFailSaga),
		takeEvery(actions.LOGIN, loginSaga),
		takeEvery(actions.CONFIRM_EMAIL + SUCCESS, confirmEmailSuccessSaga),
		takeEvery(actions.CONFIRM_EMAIL + FAIL, confirmEmailFailSaga),
		takeEvery(actions.CONFIRM_EMAIL, confirmEmailSaga),
	]);
}
