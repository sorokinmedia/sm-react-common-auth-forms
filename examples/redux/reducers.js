import { reducer as formReducer } from 'redux-form'
import { reducer } from '../../lib'

export default {
	...reducer,
	form: formReducer
}
