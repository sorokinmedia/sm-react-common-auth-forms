import regeneratorRuntime from 'regenerator-runtime'
import { saga } from '../../lib'
import { takeEvery, all, put, call } from 'redux-saga/effects'
import { START, ERROR, SUCCESS } from './constants';
import {requestSaga} from "../../src/redux/saga";
//import requestMiddleware, { request, requestSaga } from 'sm-redux-saga-request'

export default function* rootSaga() {
	yield all([
		//takeEvery('REQUEST', requestSaga),
		saga()
	]);
}
