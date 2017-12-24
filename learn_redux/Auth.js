import React from 'react'
import { connect } from 'react-redux'
import { login , getUserData} from './Auth.redux'
import { Redirect } from 'react-router-dom'


@connect(
	state => state.auth,
	{login , getUserData}
)
class Auth extends React.Component {
	// constructor(props) {
	// 	super(props)
	// }
	componentDidMount() {
		this.props.getUserData()		
	}

	render(){
		return (
			<div>
				<h1>我的名字是{this.props.user},{this.props.age}</h1>
			    {this.props.isAuth ? <Redirect to='/dashboard'/> : null }
				<h2>您没有权限，需要登录才能看</h2>
			    <button onClick={this.props.login}>登录</button>
			</div>
		) 
	}

}

export default Auth