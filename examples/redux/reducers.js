import { loginFormReducer } from '../../lib'
import { reducer as formReducer } from 'redux-form'

export default {
	...loginFormReducer,
	form: formReducer
}
