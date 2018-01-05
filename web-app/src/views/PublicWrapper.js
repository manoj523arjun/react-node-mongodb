import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import UserProfile from './UserProfile';
import {connect} from 'react-redux';
import {getStateValues} from '../reducers/AuthReducer';

export const PublicWrapper = (WrappedComponent) => {
	const mapStateToProps = (state) =>({
		getUserProfile:()=>getStateValues.getUserProfile(state),
		getUserAuthStatus:()=>getStateValues.getUserAuthStatus(state)
	});
	const mapDispatchToProps = {

	}
	class PublicWrapperInner extends React.Component {
		render() {
			return (
				<div>
					{
						!this.props.getUserAuthStatus() ? <div>
						     <WrappedComponent {...this.props} />
						    </div>
						    :
						    <Redirect to="/userProfile" />
				    }
			    </div>
			)
		}
	}

	return connect(mapStateToProps, mapDispatchToProps)(PublicWrapperInner);
}