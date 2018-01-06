import React from 'react'
import ReactDom from 'react-dom';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import {
	Provider
} from 'react-redux'
import {
	BrowserRouter,
} from "react-router-dom"
import thunk from 'redux-thunk';

import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
// 配置--axios
import './config';
// reducers
import reducers from './reducers'
// 组件
import  App from './app';


const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f

// 全局state
const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	reduxDevtools
))

	
ReactDom.hydrate(
	(<div>
		<Provider store={store}>
		<BrowserRouter>	
			<App/>
		</BrowserRouter>
	</Provider></div>)
	,document.getElementById('root')
)