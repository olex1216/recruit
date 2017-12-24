import React from 'react'
import {
	Link,
	Route,
	Redirect
} from 'react-router-dom';
import {
	connect
} from 'react-redux'


import Apps from './App';
import {
	loginout
} from './Auth.redux'

function Erying() {
	return <h1>二营</h1>
}

function Qibinglian() {
	return <h2>骑兵连</h2>
}

// class Test extends React.Component {
// 	constructor (props){
// 		super(props)
// 	}
// 	render(){
// 		console.log(this.props)
// 		return <h2> 测试 </h2>
// 	}
// }
@connect(
	state => state.auth, {
		loginout
	}
)
class Dashboard extends React.Component {
	// constructor(props) {
	// 	super(props)
	// }

	render() {
		const  {match} = this.props
		const redirectToLogin = <Redirect to='/login' />
		const App = (
			<div>
				<h1>独立团</h1>
				{this.props.isAuth ? <button onClick={this.props.loginout}>注销</button> : null }
				<ul>
					<li>
						<Link to={`${match.url}`}>一营</Link>
					</li>
					<li>
						<Link to={`${match.url}/erying`}>二营</Link>
					</li>
					<li>
						<Link to={`${match.url}/qibinglian`}>骑兵连</Link>
					</li>
				</ul>	
				<Route path={`${match.url}`}  exact component={Apps}></Route>
				<Route path={`${match.url}/erying`} component={Erying}></Route>
				<Route path={`${match.url}/qibinglian`} component={Qibinglian}></Route>

			</div>
		)
		return this.props.isAuth ? App : redirectToLogin 
	}

}

export default Dashboard