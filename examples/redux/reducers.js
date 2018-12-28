import { reducer as formReducer } from 'redux-form'
import { reducer } from '../../lib'

export const originReducer = () => {
	return 'http://api.sorokin.kosmoz.online'
}

export default {
	...reducer,
	afOrigin: originReducer,
	form: formReducer
}
