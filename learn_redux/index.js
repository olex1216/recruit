import React from 'react'
import {
	render
} from 'react-dom';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import {
	Provider
} from 'react-redux';
import thunk from 'redux-thunk';
import {
	BrowserRouter,
	Route,
	Redirect,
	Switch
} from "react-router-dom";

import reducers from './reducers'
import Auth from './Auth';
import Dashboard from './Dashboard';
import './config';
import 'antd-mobile/dist/antd-mobile.css'
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	reduxDevtools
))

render(
	<Provider store={store}>
		<BrowserRouter>
				<Switch>
					<Route path="/login"  exact component={Auth}></Route>
					<Route path="/dashboard" component={Dashboard}></Route>
					<Redirect to="/dashboard"></Redirect>				
				</Switch>	
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)