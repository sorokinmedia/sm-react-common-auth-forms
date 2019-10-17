import loginFormReducer from './redux/login/reducer'
import confirmMailReducer from './redux/login/confirm'
import changePasswordReducer from './redux/changePassword/reducer'
import resetPasswordResponse from './redux/resetPassword/reducer'
import signupReducer from './redux/signup/reducer'
import commonReducers from './redux/commonReducers'
import Login from './Login'
import ChangePassword from './ChangePassword'
import SignUp from './SignUp'
import ResetPassword from './ResetPassword'
import loginFormActions from './redux/login/actions'
import saga from './redux/saga'

export {
	Login,
	ChangePassword,
	SignUp,
	ResetPassword,
	loginFormActions,
	saga,
}
export const reducer = {
	...loginFormReducer,
	...confirmMailReducer,
	...changePasswordReducer,
	...resetPasswordResponse,
	...signupReducer,
	...commonReducers
};
