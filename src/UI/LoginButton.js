import PropTypes from 'prop-types'
import React from 'react'
import { LoadingButton } from 'sm-react-common-loader'

function LoginButton(props) {
	const { loginResponse, label } = props
	return (
		<LoadingButton
			type="submit"
			className="btn btn-primary btn-block btn-flat"
			loading={loginResponse.loading}
		>
			{label}
		</LoadingButton>
	)
}

LoginButton.propTypes = {
	label: PropTypes.node,
	loginResponse: PropTypes.object,
}
LoginButton.defaultProps = {
	label: 'Войти',
	loginResponse: { loading: false }
}

export default LoginButton
