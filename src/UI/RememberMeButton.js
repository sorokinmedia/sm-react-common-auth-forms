import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'

function RemeberMeButton({ label }) {
	return (
		<label>
			<Field name="remember" component="input" type="checkbox" />
			{label}
		</label>
	)
}

RemeberMeButton.propTypes = {
	label: PropTypes.string
}
RemeberMeButton.defaultProps = {
	label: 'Запомнить меня'
}

export default RemeberMeButton
