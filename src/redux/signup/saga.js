import { all, takeEvery, put, select, fork } from 'redux-saga/effects';
import { stopSubmit, getFormSubmitErrors } from 'redux-form';
import request from '../requestAction'
import regeneratorRuntime from 'regenerator-runtime'
import actions from './actions';
import { SORT_ASC, SORT_DESC, SUCCESS, FAIL, SUCCESS_REQ } from '../../constants';

export function* registerSaga(action) {
	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: '/v1/common/auth/register',
	}))
}

export function* checkEmailSaga(action) {
	yield put(request({
		...action,
		method: 'GET',
		auth: true,
		url: `/v1/common/auth/check-email/${action.payload.email}`,
	}))
}

export function* checkLoginSaga(action) {
	yield put(request({
		...action,
		method: 'GET',
		auth: true,
		url: `/v1/common/auth/check-login/${action.payload.email}`,
	}))
}

export function* registerSuccessSaga(action) {
	const { response } = action;
	if (action.error) {
		const errors = {name: action.error.message};
		yield put(stopSubmit('auth-forms-register', errors))
	}
}

export function* registerFailSaga(action) {
	const errors = {name: action.response.error};
	yield put(stopSubmit('auth-forms-register', errors))
}

const registerErrorsSelector = state => getFormSubmitErrors('register')(state);
export function* checkLoginFailSaga(action) {
	const { response } = action;
	const existsError = yield select(registerErrorsSelector);
	if (action.error) {
		const errors = {name: action.error.message, ...existsError};
		yield put(stopSubmit('auth-forms-register', errors))
	}
}

export function* checkEmailFailSaga(action) {
	const { response } = action;
	const existsError = yield select(registerErrorsSelector);
	if (action.error) {
		const errors = { email: action.error.message, ...existsError };
		yield put(stopSubmit('auth-forms-register', errors))
	}
}

export default function* rootSaga(action) {

	yield all([
		takeEvery(actions.REGISTER + FAIL, registerFailSaga),
		takeEvery(actions.REGISTER + SUCCESS, registerSuccessSaga),
		takeEvery(actions.REGISTER, registerSaga),
		takeEvery(actions.CHECK_EMAIL + FAIL, checkEmailFailSaga),
		takeEvery(actions.CHECK_EMAIL, checkEmailSaga),
		takeEvery(actions.CHECK_LOGIN + FAIL, checkLoginFailSaga),
		takeEvery(actions.CHECK_LOGIN, checkLoginSaga),
	]);
}
