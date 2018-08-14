import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'
import LoginButton from '../UI/LoginButton'
import RememberMeButton from '../UI/RememberMeButton'

const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning }
}) => (
	<div className={'form-group has-feedback ' + (touched && error ? 'has-error' : '')}>
		<label>{label}</label>
		<input {...input} placeholder={label} type={type} className="form-control" />
		<span
			className={`glyphicon glyphicon-${input.name === 'login'
				? 'envelope'
				: 'lock'} form-control-feedback`}
		/>
		{touched &&
		((error && <span className="help-block">{error}</span>) ||
			(warning && <span>{warning}</span>))}
	</div>
)
renderField.propTypes = {
	input: PropTypes.object,
	label: PropTypes.string,
	type: PropTypes.string,
	meta: PropTypes.object
}

class Login extends Component {

	handleSubmit = (form) => {
		this.props.login(form.login, form.password, form.remember)
	}

	render() {
		const {
			fields: { loginLabel, passwordLabel },
			loginResponse, title, description, reset, registration
		} = this.props
		return (
			<div className="login-box">
				<div className="login-logo">
					<Link
						to="/"
						dangerouslySetInnerHTML={{ __html: title }}
					/>
				</div>
				<div className="login-box-body">
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
									loginResponse={loginResponse}
									label="Войти"
								/>
							</div>
						</div>
					</form>
					<Link to={reset.link}>{reset.label}</Link><br />
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
	loginResponse: PropTypes.object,
	fields: PropTypes.object,
	reset: PropTypes.shape({
		link: PropTypes.string,
		label: PropTypes.string
	}),
	registration: PropTypes.shape({
		link: PropTypes.string,
		label: PropTypes.string
	}),
	title: PropTypes.string,
	description: PropTypes.string,
}
Login.defaultProps = {
	fields: {
		loginLabel: 'Имя пользователя/e-mail',
		passwordLabel: 'Пароль'
	},
	registration: {
		link: '/auth/signup',
		label: 'Регистрация'
	},
	reset: {
		link: '/auth/reset_password',
		label: 'Я забыл пароль'
	}
}

export default Login
