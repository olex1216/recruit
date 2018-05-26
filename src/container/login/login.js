import React, { Component } from 'react'

import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button,
} from 'antd-mobile'

import Logo from '../../component/logo/logo'
import  { connect} from 'react-redux';
import  { Redirect} from 'react-router-dom';
import { login } from '../../redux/user.redux'
import controlForm from '../../component/controlform/controlform'

@connect(
	state=>state.user,
	{ login }
)
@controlForm
class Login extends Component {

	constructor(props) {
		super(props)
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}


	handleLogin(){
		this.props.login(this.props.state)
	}


	// 跳转到注册页
	register(){
		this.props.history.push('/register')
	}
	render() {
		return (
			<div>
				<Logo />
				{(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} /> : null }
				{this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
				<List>
					<InputItem
						onChange={value=>this.props.handleChange('user',value)}
					>用户222</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={value=>this.props.handleChange('pwd',value)}
						type="password"
					>密码222</InputItem>
				</List>
				<WhiteSpace />
				<WingBlank>
					<Button onClick={this.handleLogin}type='primary'>登录343</Button>
					<WhiteSpace />
					<Button type='ghost' onClick={this.register}>注册</Button>
				</WingBlank>
			</div>
		)
	}

}

export default Login
