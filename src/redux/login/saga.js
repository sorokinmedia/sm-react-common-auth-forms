import { all, takeEvery, put, select, fork } from 'redux-saga/effects';
import requestMiddleware, { request } from 'sm-redux-saga-request'
import { stopSubmit } from 'redux-form';
import regeneratorRuntime from 'regenerator-runtime'
import actions from './actions';
import { SORT_ASC, SORT_DESC, SUCCESS, ERROR, SUCCESS_REQ } from '../../constants';

export function* loginSaga(action) {
	console.log("MAKING REQUEST")
	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: '/v1/common/auth/login',
	}))
}


export default function* rootSaga() {
	yield all([
		takeEvery(actions.LOGIN, loginSaga)
	]);
}
