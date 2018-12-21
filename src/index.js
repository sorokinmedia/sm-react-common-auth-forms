import regeneratorRuntime from 'regenerator-runtime'

import loginFormReducer from './redux/login/reducer'
import changePasswordReducer from './redux/changePassword/reducer'
import resetPasswordResponse from './redux/resetPassword/reducer'
import signupReducer from './redux/signup/reducer'

export ChangePassword from './ChangePassword'
export SignUp from './SignUp'
export ResetPassword from './ResetPassword'
export Login from './Login'

export loginFormActions from './redux/login/actions'

export saga from './redux/saga'
export const reducer = {
	...loginFormReducer,
	...changePasswordReducer,
	...resetPasswordResponse,
	...signupReducer,
};
