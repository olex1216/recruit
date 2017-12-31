import React, { Component } from 'react'

import  Logo from '../../component/logo/logo';
import {
	List,
	InputItem,
	WhiteSpace,
	Radio,
	Button,
} from 'antd-mobile'
import  { connect} from 'react-redux';
import  { Redirect} from 'react-router-dom';
import { register } from '../../redux/user.redux'
import controlForm from '../../component/controlform/controlform'


@connect(
	state=>state.user,
	{ register }
)
@controlForm
class Register extends Component {
	constructor(props) {
		super(props)
		this.handleRegister = this.handleRegister.bind(this)
	}
	componentDidMount() {
		this.props.handleChange('type','genius')
	}

	handleRegister(){
		this.props.register(this.props.state)
	}
	render() {
		const RadioItem = Radio.RadioItem
		return (
			<div>
				<Logo />
				<h2>我是注册页面</h2>	
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null }
				{this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
				<List>
					<InputItem
						onChange={value=>this.props.handleChange('user',value)}
					>用户</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={value=>this.props.handleChange('pwd',value)}
					>密码</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={value=>this.props.handleChange('repeatpwd',value)}
					>确认密码</InputItem>
					<WhiteSpace />
					<RadioItem 
						checked={this.props.state.type==='genius'}
						onChange={()=>this.props.handleChange('type','genius')}
					>
						牛人
					</RadioItem>
					<WhiteSpace />
					<RadioItem 
						checked={this.props.state.type==='boss'}
						onChange={()=>this.props.handleChange('type','boss')}
					>
						Boss
					</RadioItem>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegister}>注册</Button>
					<WhiteSpace />
				</List>
			</div>
		)
	}
}

export default Register