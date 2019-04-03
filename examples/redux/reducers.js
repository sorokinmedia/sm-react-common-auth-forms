import { reducer as formReducer } from 'redux-form'
import { reducer } from '../../src/'

export const originReducer = () => 'http://api.sorokin.kosmoz.online'

export default {
	...reducer,
	afOrigin: originReducer,
	form: formReducer
}
