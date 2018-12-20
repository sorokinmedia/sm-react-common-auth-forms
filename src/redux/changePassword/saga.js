import { all, takeEvery, put, select, fork } from 'redux-saga/effects';
import requestMiddleware, { request } from 'sm-redux-saga-request'
import { stopSubmit } from 'redux-form';
import regeneratorRuntime from 'regenerator-runtime'
import actions from './actions';
import { SORT_ASC, SORT_DESC, SUCCESS, FAIL, SUCCESS_REQ } from '../../constants';

export function* loginSaga(action) {
	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: '/v1/common/auth/login',
	}))
}

export function* loginSuccessSaga(action) {
	const {response} = action;
	if(response.serverStatus === 100) {
		const errors = {login: response.message};
		yield put(stopSubmit('login', errors))
	}
	else {
		const expires = `expires=${new Date(response.data.exp*1000).toUTCString()}`;
		const domain = `domain=${location.hostname === 'localhost' ? '' : '.'}${location.hostname}`;
		document.cookie = `auth_token=${response.data.token}; ${expires}; ${domain}; path=/`;
		location.href = location.origin
	}
}

export function* loginFailSaga(action) {
	console.log(action)
	const errors = { login: action.error.message };
	yield put(stopSubmit('auth-forms-login', errors))
}


export default function* rootSaga() {
	yield all([
		takeEvery(actions.LOGIN + SUCCESS, loginSuccessSaga),
		takeEvery(actions.LOGIN + FAIL, loginFailSaga),
		takeEvery(actions.LOGIN, loginSaga)
	]);
}
