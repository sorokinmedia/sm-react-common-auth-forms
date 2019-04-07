import { reducer as formReducer } from 'redux-form'
import { reducer } from '../../src/'

export const originReducer = () => 'http://api.101kurs.kosmoz.online'

export default {
	...reducer,
	afOrigin: originReducer,
	form: formReducer
}
