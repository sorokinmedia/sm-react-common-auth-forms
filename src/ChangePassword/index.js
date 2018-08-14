import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Field } from 'redux-form'
import { renderField } from '../SignUp'

class ChangePassword extends Component {

	handleSubmit = (form) => {
		const { token } = this.props
		if (token) this.props.changePassword(form.password, token)
	}

	render() {
		const { token, next, description, registration, newPasswordLabel, login, fields } = this.props
		if (!token) return <Redirect to="/" />

		return (
			<div className="login-box">
				<div className="login-logo">
					{newPasswordLabel}
				</div>
				<div className="login-box-body">
					{this.props.response.message && this.props.response.status === 'success'
						?
						(
							<p className="login-box-msg">
								{this.props.response.message}.
								&nbsp;
								<Link
									to="/user/default/login"
									className="text-center"
								>
									Войти
								</Link>.
							</p>)
						: (
							<div>
								<p className="login-box-msg">
									{description}
								</p>
								<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
									<div className="form-group has-feedback">
										<Field
											name="password"
											component={renderField}
											type="password"
											label={fields.password}
										/>
										<Field
											name="repeat_password"
											component={renderField}
											type="password"
											label={fields.repeat}
										/>
									</div>
									<div className="row">
										<div className="col-xs-4">
											<button
												type="submit"
												className="btn btn-primary btn-block btn-flat"
											>
												{next}
											</button>
										</div>
										<div className="col-xs-8">
											<div className="flexbox full-flex">
												<Link
													to="/auth/login"
													className="text-center"
												>
													{login}
												</Link>
											</div>
											<div className="flexbox full-flex">
												<Link
													to="/auth/signup"
													className="text-center"
												>
													{registration}
												</Link>
											</div>
										</div>
									</div>
								</form>
							</div>)
					}
				</div>
			</div>)
	}
}

ChangePassword.propTypes = {
	response: PropTypes.object,
	handleSubmit: PropTypes.func,
	changePassword: PropTypes.func,
	token: PropTypes.string,
	description: PropTypes.string,
	next: PropTypes.string,
	login: PropTypes.string,
	registration: PropTypes.string,
	newPasswordLabel: PropTypes.string,
	fields: PropTypes.shape({
		password: PropTypes.string,
		repeat: PropTypes.string,
	}),
}

ChangePassword.defaultProps = {
	description: 'Введите и повторите новый пароль',
	next: 'Далее',
	login: 'Войти',
	registration: 'Регистрация',
	newPasswordLabel: 'Новый пароль',
	fields: {
		password: 'Пароль',
		repeat: 'Повторите пароль'
	}
}

export default ChangePassword
