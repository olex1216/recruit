import { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import  { connect} from 'react-redux'
// import  { Redirect} from 'react-router-dom';
import { loadData } from '../../redux/user.redux'

@withRouter
@connect(
	null,
	{ loadData }
)
class AuthRoute extends Component {
	componentDidMount() {

		/**
		 * 判断是否已经在登录或注册页面
		 * @type {Array}
		 */
		const publicList = ['/login','/register']
		const pathname = this.props.location.pathname
		if (publicList.indexOf(pathname) > -1) {
			return null;
		}

		//获取用户信息，决定下一步跳转
		axios.get('/user/info')
			.then(res =>{
				if (res.status === 200) {
					if (res.data.code === 0) {
						//有登录信息
						console.log(res.data.data)
						this.props.loadData(res.data.data)	
					} else {
						//无登录信息
						this.props.history.replace('/login')
					}
				}
			})
	}
	render(){
		return null
	}
}

export default AuthRoute