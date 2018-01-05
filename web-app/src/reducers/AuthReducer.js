	
import {handleActions} from 'redux-actions';
import * as authActions from '../actions/AuthActions';
import { REHYDRATE } from 'redux-persist'

const initState = {
	authStatus:false,
	userProfile: null,
	isLoggingIn:false
}

export const authReducer = handleActions({
	[authActions.USER_AUTH_STATUS]:(state, action) => {
		return {...state, authStatus:!state.authStatus.status};
	},
	[REHYDRATE]:(state, action) => {
		return {
			...state, 
			userProfile:action.payload ? action.payload.authReducer.userProfile : initState.userProfile, 
			isLoggingIn:action.payload ? action.payload.authReducer.isLoggingIn : initState.isLoggingIn
		}
	},
	[authActions.SIGNUP_USER_START]:(state, action) => {
		return {...state, isLoggingIn:false};
	},
	[authActions.SIGNUP_USER]:(state, action) => {
		return {...state, userProfile:action.payload.userDetails};
	},
	[authActions.SIGNIN_USER]:(state, action) => {
		return {...state, userProfile:action.payload.userDetails};
	},
	[authActions.SIGNUP_USER_END]:(state, action) => {
		return {...state, isLoggingIn:true};
	},
	[authActions.USER_AUTH_LOGOUT]:(state, action) => {
		return {...state, isLoggingIn:false,userProfile:null};
	}
}, initState);

export const getStateValues = {
	getUserAuthStatus:state=> state.authReducer.isLoggingIn,
	getUserProfile:state=> state.authReducer.userProfile
}