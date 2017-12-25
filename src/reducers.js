
// 合并所有的reducer
import  {combineReducers} from "redux";

import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
// import { auth } from './Auth.redux'

export default combineReducers({ user, chatuser})