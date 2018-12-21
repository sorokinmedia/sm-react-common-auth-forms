import regeneratorRuntime from 'regenerator-runtime'

import loginFormReducer from './redux/login/reducer'
import changePasswordReducer from './redux/changePassword/reducer'
import resetPasswordResponse from './redux/resetPassword/reducer'
import signupReducer from './redux/signup/reducer'
import LoginForm from './Login'

export ChangePassword from './ChangePassword'
export SignUp from './SignUp'
export ResetPassword from './ResetPassword'
export const Login = LoginForm

export loginFormActions from './redux/login/actions'

export saga from './redux/saga'
export const reducer = {
	...loginFormReducer,
	...changePasswordReducer,
	...resetPasswordResponse,
	...signupReducer,
};
