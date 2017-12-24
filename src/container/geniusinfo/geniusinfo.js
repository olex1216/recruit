import React, { Component } from 'react'
import  { NavBar, InputItem, TextareaItem, Button, } from 'antd-mobile';
import AvatarSelector  from '../../component/avatar-selector/avatar-selector'
import  { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import { update } from '../../redux/user.redux'


@connect(
	state => state.user,
	{ update }
)
export default class GeniusInfo extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			avatar:'',
			desc:'',
		}
		this.handleChange = this.handleChange.bind(this);
		this.selectAvatar = this.selectAvatar.bind(this);
	}

	handleChange(name,v){
		this.setState({
			[name]:v
		});
	}

	selectAvatar(imgname){
		this.setState({
			avatar:imgname
		})
	}

	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div>
				{redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
				<NavBar
				  mode="dark"
				  leftContent="返回"
				>牛人完善信息页</NavBar>
				<AvatarSelector
					selectAvatar={this.selectAvatar}
				></AvatarSelector>
				<InputItem onChange={v=>this.handleChange('title',v)}>求职岗位</InputItem>
				<TextareaItem 
					onChange={v=>this.handleChange('desc',v)}
					rows={3} 
					autoHeight
					title="个人简介"
				>
				</TextareaItem>
				<Button 
					onClick={()=>{
						this.props.update(this.state)
					}}
				   type='primary'>保存</Button>
			</div>
		)
	}
}