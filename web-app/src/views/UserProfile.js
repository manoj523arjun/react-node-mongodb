import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setUserLogout} from '../actions/AuthActions';
import {getStateValues} from '../reducers/AuthReducer';

const mapStateToProps = (state)=>({
	getUserProfile:()=>getStateValues.getUserProfile(state)
})
const mapDispatchToProps = {
	setUserLogout:setUserLogout
}

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userDetails:''
		}
	}
	componentDidMount() {
		setTimeout(()=> {	
			this.setState({
				userDetails:this.props.getUserProfile().userDetails.web
			})
		}, 1000);
	}
	render() {
		return (
			<div className="container">
				{this.state.userDetails=='' ? <div>
					loading...
					</div>
					:
					<div className="jumbotron">
						<h1 className="text-center">Welcome!</h1>
						<p>Full name : <b>{this.state.userDetails.firstName.toUpperCase()} {this.state.userDetails.lastName.toUpperCase()}</b></p>
						<p>Email : {this.state.userDetails.email}</p>
					</div>
				}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);