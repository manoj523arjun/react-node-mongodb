import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {getStateValues} from '../reducers/AuthReducer';
import {setUserAuthStatus} from '../actions/AuthActions';

const mapStateToProps = (state)=>({
	getUserAuthStatus:()=>getStateValues.getUserAuthStatus(state)
})
const mapDispatchToProps = {
	setUserAuthStatus:setUserAuthStatus
}
class Homepage extends Component {
	setUserAuthStatus = () => {
		this.props.setUserAuthStatus();
	}
	render() {
		return (
			<div className="container">
				<div className="jumbotron text-center">
					<h1>Welcome to Homepage</h1>
					<div className="panel-body">
						{this.props.getUserAuthStatus() ? <Link className="btn-success btn-lg" to="/userProfile">
							Check Profile
						</Link>
						:
						<Link className="btn-success btn-lg" to="/signin">Sign In</Link>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);