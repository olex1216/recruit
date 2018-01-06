import React ,{Component}from 'react'
import {
	Route,
	Switch,
} from "react-router-dom"

import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Login from './container/login/login'
import Register from './container/register/register'

import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'


export default class App extends Component {
	constructor(props){
		super(props)
		this.state={
			hasErr: false
		}
	}
	componentDidCatch(err,info){
		console.log(err,info)
		this.setState({
			hasErr:true 
		});
	}

	render(){
		return this.state.hasErr 
		? <h2> 页面出错啦</h2>
		: (

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
		)
	}
}