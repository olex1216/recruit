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
	Provider,

} from 'react-redux';
import thunk from 'redux-thunk';
import {
	BrowserRouter,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
// 配置--axios
import './config';
// reducers
import reducers from './reducers'
// 组件
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Login from './container/login/login'
import Register from './container/register/register'

import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f

// 全局state
const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	reduxDevtools
))

	
render(
	<Provider store={store}>
		<BrowserRouter>	
		<div>
			
			<AuthRoute></AuthRoute>
			<Switch>
				<Route path='/bossinfo' component={BossInfo}></Route>
				<Route path='/geniusinfo' component={GeniusInfo}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/register' component={Register}></Route>
				<Route path='/chat/:userid' component={Chat}></Route>
				<Route component={Dashboard}></Route>
			</Switch>

		</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)