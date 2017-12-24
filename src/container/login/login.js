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

@connect(
	state=>state.user,
	{ login }
)
class Login extends Component {

	constructor(props) {
		super(props)
		this.state={
			user:'',
			pwd:''
		}
		this.register = this.register.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleLogin(){
		this.props.login(this.state)
	}

	handleChange(name,value){
		this.setState({
			[name]:value
		});
	}
	// 跳转到注册页
	register(){
		this.props.history.push('/register')
	}
	render() {
		return (
			<div>
				<Logo />
				<h2>我是登录页面</h2>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null }
				{this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
				<List>
					<InputItem
						onChange={value=>this.handleChange('user',value)}
					>用户</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={value=>this.handleChange('pwd',value)}
						type="password"
					>密码</InputItem>
				</List>
				<WhiteSpace />
				<WingBlank>
					<Button onClick={this.handleLogin}type='primary'>登录</Button>
					<WhiteSpace />
					<Button type='ghost' onClick={this.register}>注册</Button>
				</WingBlank>	
			</div>
		)
	}

}

export default Login