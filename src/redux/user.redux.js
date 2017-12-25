import axios from 'axios'
import  { getRedirectPath } from '../utils';

/***************************************/

//constant

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERR_MSG = 'ERR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
	redirectTo:'',
	msg:'',
	user:'',
	type:'',
}

/***************************************/

//reducers
export function user(state=initState,action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
		case LOAD_DATA:
		  return {...state,...action.payload}
		case ERR_MSG:
			return {...state,isAuth:false,msg:action.msg}
		default:
			return state;
	}
}


/***************************************/
// action creator

//验证成功
function authSuccess (obj) {
	const {pwd,...data} = obj
	return { type:AUTH_SUCCESS, payload:data } 
}

// 错误消息提示
function errorMsg (msg) {
	return { msg, type:ERR_MSG  }
}

//获取用户信息
export function loadData(userInfo) {
	return {type:LOAD_DATA,payload:userInfo}
}

/***************************************/

/**
 * 异步actions
 */

// action -- 更新
export function update(data) {
	return dispatch=>{
		axios.post('/user/update',data)
		.then(res=>{
			console.log(res.data)
			if (res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}


// action -- 登录
export function login({user,pwd}) {
	if(!user || !pwd){
		return errorMsg("用户名或密码错误")
	}
	return dispatch=>{	
		axios.post('/user/login',{user,pwd})
			.then(res=>{
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

// action -- 注册
export function register({user,pwd,repeatpwd,type}) {
	if(!user || !pwd || !type){
		return errorMsg("用户名或密码必须输入")
	}
	if (pwd !== repeatpwd) {
		return errorMsg("两次输入密码不一致")
	}

	return dispatch=>{	
		axios.post('/user/register',{user,pwd,type})
			.then(res=>{
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess({user,type}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}