	
import axios  from 'axios'

const LOGIN = 'LOGIN'
const LOGINOUT = 'LOGINOUT'
const USER_DATA = 'USER_DATA'

const initState = {
	isAuth:false,
	user:'李云龙',
	age:25
}

// reducer
export function auth(state=initState,action){
	switch (action.type) {
		case LOGIN:
			return {...state,isAuth:true}
		case LOGINOUT:
			return {...state,isAuth:false}
		case USER_DATA:
		return {...state, ...action.payload}
		default:
			return state
	}
}


// action creater
// 
export function getUserData() {
	//dispatch 用来通知数据修改
	return dispatch => {
		axios.get('/data')
			.then(res=>{
				console.log(res)
				if (res.status === 200) {
					dispatch(userData(res.data))
				}
			})
	}
}

export function userData(data) {
	return {type:USER_DATA,payload:data}
}

export function login() {
	return {type:LOGIN}
}

export function loginout() {
	return {type:LOGINOUT}
}
