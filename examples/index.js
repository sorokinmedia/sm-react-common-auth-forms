import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './redux/store';
import { Login, ChangePassword, ResetPassword, SignUp } from '../lib'

//'/v1/common/auth/login'

class App extends Component {
	render() {
		return (
			<div>
				<Login
					url="/v1/common/auth/login"
				/>
			</div>
		)
	}
}

App.propTypes = {};
App.defaultProps = {};

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
