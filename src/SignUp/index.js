import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'

export const selectIcon = (field) => {
	switch (field) {
		case 'name':
			return 'user'
		case 'email':
			return 'envelope'
		case 'password':
			return 'lock'
		case 'repeat_password':
			return 'log-in'
		default:
			return ''
	}
}

export const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning }
}) => (
	<div className={'form-group has-feedback ' + (touched && error ? 'has-error' : '')}>
		<label>{label}</label>
		<input {...input} placeholder={label} type={type} className="form-control" />
		<span
			className={`glyphicon glyphicon-${selectIcon(input.name)} form-control-feedback`}
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

class SignUp extends Component {

	handleSubmit = (form) => {
		this.props.register(form.name, form.password, form.email)
	}

	handleNameBlur = (ev) => {
		const { value } = ev.nativeEvent.target
		if (value) this.props.checkLogin(value)
	}

	handleEmailBlur = (ev) => {
		const { value } = ev.nativeEvent.target
		if (value) this.props.checkEmail(value)
	}

	render() {
		const {
			title,
			description,
			fields: { name, email, password, repeat },
			allreadyHaveAccount,
			next
		} = this.props
		return (
			<div className="login-box">
				<Helmet>
					<title>Регистрация</title>
				</Helmet>
				<div className="login-logo">
					<Link
						to="/"
						dangerouslySetInnerHTML={{ __html: title }}
					/>
				</div>

				<div className="login-box-body">
					{
						this.props.response.message
							? <p className="login-box-msg">{this.props.response.message}</p>
							: (
								<div>
									<p className="login-box-msg">{description}</p>
									<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
										<div className="form-group has-feedback">
											<Field
												name="name"
												component={renderField}
												type="text"
												label={name}
												onBlur={this.handleNameBlur}
											/>
										</div>
										<div className="form-group has-feedback">
											<Field
												name="email"
												component={renderField}
												type="email"
												label={email}
												onBlur={this.handleEmailBlur}
											/>
										</div>
										<div className="form-group has-feedback">
											<Field
												name="password"
												component={renderField}
												type="password"
												label={password}
											/>
										</div>
										<div className="form-group has-feedback">
											<Field
												name="repeat_password"
												component={renderField}
												type="password"
												label={repeat}
											/>
										</div>
										<div className="row">
											<div className="col-xs-8">
												{/* <label> */}
												{/* <input type="checkbox" /> Я согласен с <a href="#">правилами</a> */}
												{/* </label> */}
												<span
													className="flexbox"
													style={{
														height: '34px',
														justifyContent: 'flex-start'
													}}
												>
													<Link
														to="/auth/login"
														className="text-center"
													>
														{allreadyHaveAccount}
													</Link>
												</span>
											</div>
											<div className="col-xs-4">
												<button
													type="submit"
													className="btn btn-primary btn-block btn-flat"
												>
													{next}
												</button>
											</div>
										</div>
										<p className={'text-red'}>
											{this.props.response.message || this.props.response.error}
										</p>
									</form>
									{/* <div className="social-auth-links text-center"> */}
									{/* <p>- OR -</p> */}
									{/* <a */}
									{/* href="#" */}
									{/* className="btn btn-block btn-social btn-facebook btn-flat" */}
									{/* > */}
									{/* <i className="fa fa-facebook" /> */}
									{/* Sign in using Facebook */}
									{/* </a> */}
									{/* <a */}
									{/* href="#" */}
									{/* className="btn btn-block btn-social btn-google btn-flat" */}
									{/* > */}
									{/* <i className="fa fa-google-plus" /> */}
									{/* Sign in using Google+*/}
									{/* </a> */}
									{/* </div> */}
								</div>)
					}
				</div>
			</div>)
	}
}

SignUp.propTypes = {
	response: PropTypes.object.isRequired,
	register: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func,
	checkLogin: PropTypes.func,
	checkEmail: PropTypes.func,
	fields: PropTypes.shape({
		name: PropTypes.string,
		email: PropTypes.string,
		password: PropTypes.string,
		repeat: PropTypes.string,
	}),
	title: PropTypes.string,
	description: PropTypes.string,
	allreadyHaveAccount: PropTypes.string,
	next: PropTypes.string,
}

SignUp.defaultProps = {
	description: 'Регистрация нового аккаунта',
	allreadyHaveAccount: 'У меня уже есть аккаунт',
	next: 'Далее',
	fields: {
		name: 'Имя пользователя',
		email: 'E-mail',
		password: 'Пароль',
		repeat: 'Повторите пароль'
	}

}

export default SignUp
