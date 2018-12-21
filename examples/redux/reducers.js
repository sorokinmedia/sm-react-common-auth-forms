import { reducer } from '../../src'
import { reducer as formReducer } from 'redux-form'

export default {
	...reducer,
	form: formReducer
}
