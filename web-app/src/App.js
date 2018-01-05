import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import styles from './css/styles.scss';

import Homepage from './views/Homepage';
import ProductsList from './views/ProductsList';
import Signin from './views/Signin';
import Signup from './views/Signup';
import {Header} from './views/Header';
import {UserAuth as PrivateRoute} from './views/UserAuth';
import {PublicWrapper as PublicRoute} from './views/PublicWrapper';
import UserProfile from './views/UserProfile';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import { persistStore, persistCombineReducers } from 'redux-persist';
//import sessionStorage from 'redux-persist/lib/storage/session';
import {CookieStorage} from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';
import { PersistGate } from 'redux-persist/lib/integration/react'

import {authReducer} from './reducers/AuthReducer';
import {productReducer} from './reducers/ProductReducer';

const config = {
	key: 'primary',
	storage: new CookieStorage(Cookies)
 }

/*const reducer = combineReducers({
	authReducer:authReducer,
	form:formReducer
})*/
let reducer = persistCombineReducers(config, {
	authReducer:authReducer,
	productReducer:productReducer,
	form:formReducer
})

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
const store = createStore(reducer, devTools && devTools(),compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

class App extends Component {
	render() {
		return (
			<PersistGate persistor={persistor}>
			<Provider store={store}>
			<Router>
				<div>
					<div className="navbar navbar-default">
						<Header />
					</div>
					<Route path="/" exact component={Homepage}/>
					<Route path="/products" exact component={ProductsList} />
      				<Route path="/signin" exact component={PublicRoute(Signin)}/>
      				<Route path="/signup" exact component={PublicRoute(Signup)}/>
      				<Route path="/userProfile" exact component={PrivateRoute(UserProfile)} />
      			</div>
			</Router>
			</Provider>
			</PersistGate>
		);
	}
}

export default App;