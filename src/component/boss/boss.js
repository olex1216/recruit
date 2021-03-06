import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
	state=>state.chatuser,
	{getUserList}
)
export default class Boss extends Component {
	constructor(props) {
		super(props)
		this.state={
			data:[]
		}
	}
	componentDidMount() {
		this.props.getUserList('genius')
	}


	render(){
		return <UserCard userlist={this.props.userlist}></UserCard>
	}
}