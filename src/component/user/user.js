import React, { Component } from 'react'
import axios from 'axios'

export default class User extends Component {
	constructor(props) {
		super(props)
		this.state={
			data:{}
		}
	}
	componentDidMount() {
		axios.get('/user/list/?type=genius')
		.then(res=>{
			if (res.data) {
				this.setState({
					data:res.data.data
				});
			}
		})
	}


	render(){
		return(
			<div>User</div>
		)
	}
}