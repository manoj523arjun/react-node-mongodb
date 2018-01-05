import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setUserLogout} from '../../actions/AuthActions';
import {getStateValues} from '../../reducers/AuthReducer';
import {NavLink, Link} from 'react-router-dom';

const mapStateToProps = (state)=>({
	getUserProfile:()=>getStateValues.getUserProfile(state),
	getUserAuthStatus:()=>getStateValues.getUserAuthStatus(state)
})
const mapDispatchToProps = {
	setUserLogout:setUserLogout
}

class HeaderLinks extends Component {
	componentDidMount() {
		//console.log(this.props.getUserProfile())
	}
	render() {
		return (
			<div>
			<ul className="nav navbar-nav navbar-right">
				<li><NavLink exact activeStyle={{color:'red'}} to="/">Home</NavLink></li>
				<li><NavLink exact activeStyle={{color:'red'}} to="/products">Products</NavLink></li>
				{!this.props.getUserAuthStatus() && <li><NavLink exact activeStyle={{color:'red'}} to="/signin">Sign In</NavLink></li>}
				{!this.props.getUserAuthStatus() && <li><NavLink exact activeStyle={{color:'red'}} to="/signup">Sign Up</NavLink></li>}
				{this.props.getUserAuthStatus() && <li>
					<NavLink exact to="" onClick={this.props.setUserLogout.bind(this, this.props.getUserProfile().token)}>
						Logout
					</NavLink>
				</li>}
			</ul>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);