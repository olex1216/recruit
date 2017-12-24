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


@connect(
	state=>state.user,
	{ register }
)
class Register extends Component {
	constructor(props) {
		super(props)
		this.state={
			type:'genius',
			user:'',
			pwd:'',
			repeatpwd:'',
		}
		this.handleRegister = this.handleRegister.bind(this)
	}
	handleChange(name,value){
		this.setState({
			[name]:value
		});
	}
	handleRegister(){
		this.props.register(this.state)
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
						onChange={value=>this.handleChange('user',value)}
					>用户</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={value=>this.handleChange('pwd',value)}
					>密码</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={value=>this.handleChange('repeatpwd',value)}
					>确认密码</InputItem>
					<WhiteSpace />
					<RadioItem 
						checked={this.state.type==='genius'}
						onChange={()=>this.handleChange('type','genius')}
					>
						牛人
					</RadioItem>
					<WhiteSpace />
					<RadioItem 
						checked={this.state.type==='boss'}
						onChange={()=>this.handleChange('type','boss')}
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