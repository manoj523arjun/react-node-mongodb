
import {createAction} from 'redux-actions';
import {apiUrls} from '../helpers/urls';
import {Redirect} from 'react-router-dom';

export const USER_AUTH_STATUS = createAction(
	"auth/USER_AUTH_STATUS",
	status=>({status})
);

export const SIGNUP_USER_START = createAction(
	"auth/SIGNUP_USER_START"
);
export const SIGNUP_USER = createAction(
	"auth/SIGNUP_USER",
	(response)=>({userDetails:response})
);
export const SIGNIN_USER = createAction(
	"auth/SIGNIN_USER",
	(response)=>({userDetails:response})
);
export const SIGNUP_USER_END = createAction(
	"auth/SIGNUP_USER_END"
);

export const USER_AUTH_LOGOUT = createAction(
	"auth/USER_AUTH_LOGOUT"
);

export const setUserAuthStatus = () => (dispatch, getState)=> {
	dispatch(USER_AUTH_STATUS(true));
}

export const setSignUpUser = (signUpDetails) => (dispatch, getState)=> {
	dispatch(SIGNUP_USER_START);
	return fetch(
		apiUrls.signUpUserUrl,
		{
			headers: {
		      'Content-Type': 'application/json; charset=utf-8',
		      'Access-Control-Allow-Origin': '*'
		    },
		    crossDomain : true,
			method:'POST',
			body:JSON.stringify(signUpDetails)
		} 
	).then((response)=> {
		return response.json();
	}).then((response, status)=> {
		if(response.statusCode==200) {
			dispatch(SIGNUP_USER(response));
			dispatch(SIGNUP_USER_END());
			window.location = '/userProfile';
		} else {
			alert(response.status);
			return false;
		}
		//console.log(response);
	}).catch((error)=> {
		console.log(error)
	})
	//console.log(signUpDetails);
}

export const setSignInUser = (signInDetails) => (dispatch, getState)=> {
	dispatch(SIGNUP_USER_START);
	return fetch(
		apiUrls.signInUserUrl,
		{
			headers: {
		      'Content-Type': 'application/json; charset=utf-8',
		      'Access-Control-Allow-Origin': '*'
		    },
		    crossDomain : true,
			method:'POST',
			body:JSON.stringify(signInDetails)
		} 
	).then((response)=> {
		if(response.status == 401) {
			alert("invalid details");
			return false;
		}
		return response.json();
	}).then((response)=> {
		if(response.statusCode==200) {
			dispatch(SIGNIN_USER(response));
			dispatch(SIGNUP_USER_END());
			window.location = '/userProfile';
		} else {
			return false;
		}
	}).catch((error)=> {
		console.log(error)
	})
}

export const setUserLogout = (token) => (dispatch, getState)=> {
	return fetch(
		apiUrls.logoutUserUrl,
		{
			headers: {
		      'Content-Type': 'application/json; charset=utf-8',
		      'Access-Control-Allow-Origin': '*',
		      'authorization':token
		    },
		    crossDomain : true,
			method:'GET'
		}
	).then(response => response.json())
	.then((response)=> {
		dispatch(USER_AUTH_LOGOUT());
	})
}