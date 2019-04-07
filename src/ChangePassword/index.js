import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import actions from '../redux/changePassword/actions'
import commonActions from '../redux/commonActions'
import { renderField } from '../SignUp'
import { getUrlParameters } from '../urlHelper'

const { setParams } = commonActions;
const { changePassword } = actions;

class ChangePassword extends Component {
	componentDidMount() {
		this.props.setParams('auth-forms-change_password', { url: this.props.url })
	}

	handleSubmit = (form) => {
		const { token } = getUrlParameters()
		if (token && form.password === form.repeat_password) {
			this.props.changePassword(form.password, token)
		}
	};

	render() {
		const {
			response, token, next, description, registration, newPasswordLabel, login, fields
		} = this.props;
		if (!token) return <Redirect to="/" />;

		const message = response.message
			? (
				<p className="text-red">
					{response.message}
				</p>
			) : null
		const error = response.error
			? (
				<p className="text-red">
					{response.error.message}
				</p>
			) : null

		return (
			<div className="login-box">
				<Helmet>
					<title>Сменить пароль</title>
				</Helmet>
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
								{message}
								{error}
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
	url: PropTypes.string.isRequired
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

export default connect(state => ({
	response: state.changePasswordResponse,
	token: getUrlParameters().token
}), {
	changePassword,
	setParams
})(reduxForm({
	form: 'auth-forms-change_password',
	validate: values => {
		let errors = {};
		if (!values.password || values.password && values.password.length < 6) {
			errors.password = 'пароль должен содержать не менее 6-ти символов';
		}
		if (!values.repeat_password || (values.repeat_password && values.repeat_password.length < 6) ||
			(values.repeat_password !== values.password)
		) {
			errors.repeat_password = 'повторите пароль';
		}
		return errors;
	}
})(ChangePassword))
