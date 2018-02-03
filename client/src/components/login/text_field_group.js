import React from 'react';
import classnames from 'classnames';


const TextFieldGroup = ({ field, value, label, error, type, onChange, checkUserExists}) => {
	return (
		<div className={classnames('form-group', {'has-error': error})} >

			<input
				onChange={onChange}
				onBlur={checkUserExists}
				value={value}
				type={type}
				name={field}
				className="css-login-input-input"
        placeholder={field}
				autoComplete="off"
			/>
			{error && <span className="css-help-block animated fadeInDown">{error}</span>}
		</div>
		);
}

TextFieldGroup.propTypes = {
	field: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	error: React.PropTypes.string,
	type: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	checkUserExists: React.PropTypes.func
}

export default TextFieldGroup;
