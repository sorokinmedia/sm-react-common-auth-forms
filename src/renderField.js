import React from 'react'
import PropTypes from 'prop-types';

const renderField = ({
	input,
	label,
	type,
	hint,
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
        <span className="help-block">{hint}</span>
		{touched &&
		((error && <span className="help-block">{error}</span>) ||
			(warning && <span>{warning}</span>))}
	</div>
);

renderField.propTypes = {
	input: PropTypes.object,
	label: PropTypes.string,
	type: PropTypes.string,
	hint: PropTypes.string,
	meta: PropTypes.object
};

export default renderField
