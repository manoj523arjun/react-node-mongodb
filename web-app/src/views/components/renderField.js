import React from 'react';


const renderField = (props) => {
	const {label, input, type, meta} = props;
	const {touched, valid, error} = meta;
	return (
		<div className="form-group">
			<div className="col-md-12">
				<label>{label}</label>
				<input className="form-control" {...input} placeholder={label} type={type} />
				{(touched && error) && <span className="text-danger">{error}</span>}
			</div>
		</div>
	);
}

module.exports = {renderField};