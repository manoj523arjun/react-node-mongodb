import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import HeaderLinks from './components/HeaderLinks';

const Header = () => {
	return (
		<div className="container">
			<div className="navbar-header">
				<Link to="/" className="navbar-brand">Web Application</Link>
			</div>
				<HeaderLinks />
		</div>
	);
}

module.exports = {Header};