import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import commonActions from '../redux/commonActions'
import actions from '../redux/login/actions'
import renderField from '../renderField'
import LoginButton from '../UI/LoginButton'
import RememberMeButton from '../UI/RememberMeButton'
import { getUrlParameters } from '../urlHelper'

const { setParams } = commonActions;
const { login, confirmEmail, clearConfirmResponse } = actions;

class Login extends Component {
	componentDidMount() {
		this.props.setParams('auth-forms-login', {
			confirmEmailUrl: this.props.confirmEmailUrl,
			url: this.props.url
		})
		const { token } = getUrlParameters()
		if (token) {
			console.log('confirm')
			this.props.confirmEmail(token)
		}
	}

	handleSubmit = (form) => {
		this.props.login(form.login, form.password, form.remember)
	};

	render() {
		const {
			fields: { loginLabel, passwordLabel },
			response, title, description, resetLink, registration,
			confirmMailResponse
		} = this.props;
		const mailFailResponse = confirmMailResponse.error && confirmMailResponse.error.message
			? <p className="alert alert-danger">{confirmMailResponse.error.message}</p> : null
		const mailSuccessResponse = confirmMailResponse.message
			? <p className="alert alert-success">{confirmMailResponse.message}</p> : null
		return (
			<div className="login-box">
				<Helmet>
					<title>Войти</title>
				</Helmet>
				<div className="login-logo">
					<Link
						to="/"
						dangerouslySetInnerHTML={{ __html: title }}
					/>
				</div>
				<div className="login-box-body">
					{mailFailResponse}
					{mailSuccessResponse}
					<p className="login-box-msg">{description}</p>
					<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
						<Field
							name="login"
							component={renderField}
							type="text"
							label={loginLabel}
						/>
						<Field
							name="password"
							component={renderField}
							type="password"
							label={passwordLabel}
						/>
						<div className="row">
							<div className="col-xs-8">
								<div className="checkbox icheck" />
								<RememberMeButton />
							</div>

							<div className="col-xs-4">
								<LoginButton
									loginResponse={response}
									label="Войти"
								/>
							</div>
						</div>
					</form>
					<Link to={resetLink.link}>{resetLink.label}</Link><br />
					<Link to={registration.link} className="text-center">{registration.label}</Link>
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	handleSubmit: PropTypes.func,
	handleLogin: PropTypes.func,
	login: PropTypes.func,
	setParams: PropTypes.func,
	loginResponse: PropTypes.object,
	confirmResponse: PropTypes.object,
	fields: PropTypes.object,
	resetLink: PropTypes.shape({
		link: PropTypes.string,
		label: PropTypes.string
	}),
	registration: PropTypes.shape({
		link: PropTypes.string,
		label: PropTypes.string
	}),
	title: PropTypes.string,
	description: PropTypes.string,
	confirmEmail: PropTypes.func,
	confirmEmailUrl: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

Login.defaultProps = {
	fields: {
		loginLabel: 'Имя пользователя/e-mail',
		passwordLabel: 'Пароль'
	},
	registration: {
		link: '/auth/signup',
		label: 'Регистрация'
	},
	resetLink: {
		link: '/auth/reset_password',
		label: 'Я забыл пароль'
	}
};

Login = reduxForm({
	form: 'auth-forms-login',
	validate: (values) => {
		const errors = {};

		if (!values.login) errors.login = 'Введите логин';
		if (!values.password) errors.password = 'Введите пароль';

		return errors;
	}
})(Login);


export default connect(state => ({
	response: state.loginResponse,
	confirmMailResponse: state.confirmMail
}), {
	login,
	confirmEmail,
	clearConfirmResponse,
	setParams
})(Login)
