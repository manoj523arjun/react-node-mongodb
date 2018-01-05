import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';

import {renderField as RenderField} from './components/renderField';
import {getStateValues} from '../reducers/AuthReducer';
import {setSignUpUser} from '../actions/AuthActions';

const validate = values => {
	const errors = {}
	if(!values.firstName) {
		errors.firstName = "please enter first name";
	}
	if(!values.lastName) {
	 	errors.lastName = "please enter last name";
	}
	if(!values.email) {
	 	errors.email = "please enter email";
	}
	if(!values.password) {
	 	errors.password = "please enter password";
	}
	/*function getErrors() {

	}*/
	return errors;
}

const mapStateToProps = (state)=>({
	getUserProfile:()=>getStateValues.getUserProfile(state)
})
const mapDispatchToProps = {
	setSignUpUser:setSignUpUser
}

class Signup extends Component {
	componentDidMount() {
		const { error, handleSubmit, pristine, reset, submitting } = this.props;
		//console.log(this.props.getUserProfile());
	}
	signUpSubmit = (values) => {
		this.props.setSignUpUser(values);
		//console.log(values);
	}
	componentWillReceiveProps() {
		//setTimeout(()=> {
			//console.log(this.props.getUserProfile());
		//}, 2000)
	}
	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<div>
				<form className="col-sm-6 col-sm-offset-3" onSubmit={handleSubmit(this.signUpSubmit)}>
					<div className="form-horizontal">
						<Field
							name="firstName"
							component={RenderField}
							value=""
							type="text"
							label="First Name"
						/>
						<Field
							name="lastName"
							component={RenderField}
							value=""
							type="text"
							label="Last Name"
						/>
						<Field
							name="email"
							component={RenderField}
							value=""
							type="email"
							label="Email Id"
						/>
						<Field
							name="password"
							component={RenderField}
							value=""
							type="password"
							label="Password"
						/>
						<div>
							<button className="btn btn-default btn-lg" onClick={()=>reset('signUpForm')} type="reset">
					          Reset
					        </button>
					        &nbsp;
							<button className="btn btn-primary btn-lg" type="submit">
					          Sign Up
					        </button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(
		{
			form:"signUpForm",
			validate
		}
	)(Signup));