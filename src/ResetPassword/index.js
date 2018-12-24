import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { LoadingButton } from 'sm-react-common-loader'
import { renderField } from '../SignUp'
import actions from '../redux/resetPassword/actions'
import commonActions from '../redux/commonActions'

const { setParams } = commonActions;

const { resetPassword } = actions;

export function validateEmail(mail) {
	return mail && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
}

class ResetPasswordForm extends Component {
	componentDidMount() {
		this.props.setParams('auth-forms-reset', {
			url: this.props.url,
		})
	}

	handleSubmit = (form) => {
		this.props.resetPassword(form.email)
	};

	render() {
		const { title, description, next, login, registration, fields, response } = this.props;
		console.log(response)
		return (
			<div className="login-box">
				<Helmet>
					<title>Сброс пароля</title>
				</Helmet>
				<div className="login-logo">
					{title}
				</div>
				<div className="login-box-body">
					{response.message
						? <p className="login-box-msg">{response.message}</p>
						: (
							<div>
								<p className="login-box-msg">
									{description}
								</p>
								<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
									<div className="form-group has-feedback">
										{/* <input type="email" className="form-control" placeholder="Email"/> */}
										<Field
											name="email"
											component={renderField}
											type="email"
											label={fields.email}
										/>
										{/* <span className="glyphicon glyphicon-envelope form-control-feedback"/> */}
									</div>
									<div className="row">
										<div className="col-xs-4">
											<LoadingButton
												type="submit"
												className="btn btn-primary btn-block btn-flat"
												loading={response.loading}
											>
												{next}
											</LoadingButton>
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

ResetPasswordForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	resetPassword: PropTypes.func.isRequired,
	response: PropTypes.object,
	fields: PropTypes.object,
	description: PropTypes.string,
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	next: PropTypes.string,
	login: PropTypes.string,
	registration: PropTypes.string

};

ResetPasswordForm.defaultProps = {
	description: 'Введите e-mail, мы пришлем Вам на почту инструкцию по смене пароля',
	next: 'Далее',
	login: 'Войти',
	registration: 'Регистрация',
	fields: {
		email: 'E-mail'
	}
};

export default reduxForm({
	form: 'auth-forms-reset_password',
	validate: values => {
		const  errors = {};
		if (!values.email || !validateEmail(values.email)) errors.email = 'некорректный e-mail';

		return errors;
	}
})(connect(state => ({
	response: state.resetPasswordResponse
}), {
	resetPassword,
	setParams
})(ResetPasswordForm))
