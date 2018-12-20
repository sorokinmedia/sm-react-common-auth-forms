import regeneratorRuntime from 'regenerator-runtime'
import { takeEvery, all, put, call } from 'redux-saga/effects'
import { saga } from '../../src/index'
import { START, ERROR, SUCCESS } from './constants';

export default function* rootSaga() {
	yield all([
		saga()
	]);
}
