import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import store from './redux/store';
import { Login, ChangePassword, ResetPassword, SignUp } from '../src'

function LoginForm(props) {
	return (
		<Login
			url="/v1/common/auth/login"
			confirmEmailUrl="/v1/common/auth/confirm-email"
		/>)
}
function SignUpForm(props) {
	return (
		<SignUp
			url="/v1/common/auth/register"
			checkEmailUrl="/v1/common/auth/check-email"
			checkLoginUrl="/v1/common/auth/check-login"
		/>)
}
function ResetPasswordForm(props) {
	return <ResetPassword url="/v1/common/auth/password-reset-request" />
}
function ChangePasswordForm(props) {
	return <ChangePassword url="/v1/common/auth/password-reset" />
}

render(
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route path="/" exact component={LoginForm} />
				<Route path="/auth/signup" component={SignUpForm} />
				<Route path="/auth/reset_password" component={ResetPasswordForm} />
				<Route path="/auth/change_password" component={ChangePasswordForm} />
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);
