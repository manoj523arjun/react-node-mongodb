import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {renderField as RenderField} from './components/renderField';
import {connect} from 'react-redux';
import {setSignInUser} from '../actions/AuthActions';

const validate = values => {
	const errors = {}
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

const mapStateToProps = (state)=> ({

})
const mapDispatchToProps = {
	setSignInUser:setSignInUser
}

class Signin extends Component {
	signInSubmit = (values) => {
		this.props.setSignInUser(values);
		//console.log(values);
	}
	render() {
		const { error, handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<div className="container">
				<form className="col-sm-6 col-sm-offset-3" onSubmit={handleSubmit(this.signInSubmit)}>
					<div className="form-horizontal">
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
							<button className="btn btn-default btn-lg" onClick={()=>reset('signInForm')} type="reset">
					          Reset
					        </button>
					        &nbsp;
							<button className="btn btn-primary btn-lg" type="submit">
					          Sign In
					        </button>
					        <Link to="/signup" className="btn btn-link">
					          Sign Up here
					        </Link>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(
		{
			form:"signInForm",
			validate
		}
	)(Signin));