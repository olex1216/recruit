import express from 'express'
import model from './model'
const Router = express.Router()//路由
const utility = require('utility')

const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = {'pwd':0,'__v':0}

// 用户列表
Router.get('/list',function(req,res) {
	// User.remove({},function (e,d) {
	// 	/* body... */
	// })
	const { type } = req.query
	User.find({type},_filter,function(err,doc) {
		return res.json({code:0,data:doc})
	})
})


//消息列表
Router.get('/getmsglist',function (req,res) {
	// Chat.remove({},function(e,d){})
	const user = req.cookies.userid
	User.find({},function(e,userdoc){
		// 取出用户集合里的用户列表
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
		// 只筛选出发送者和接受者符合条件的消息
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if (!err) {
				return res.json({code:0,msgs:doc, users:users})
			}
		})

	})
})

Router.post('/readmsg',function(req,res) {
	const userid = req.cookies.userid
	const {from} = req.body
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,doc){
			console.log(doc);
			if (!err) {
				return res.json({code:0,num:doc.nModified})
			}
			return res.json({code:1,msg:'修改失败'})
	})

})

// 用户注册
Router.post('/register',function (req,res) {
	// console.log(req.body)
	const {user,pwd,type} = req.body
	User.findOne({user}, _filter, function(err,doc) {
		if(doc){
			return res.json({code:1,msg:'用户名已存在'})
		}

		const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save(function (e,d) {
			if(e){
				return res.json({code:1,msg:'后端出错'})
			}
			const { user, type, _id } = d
			res.cookie('userid',_id)
			return res.json({code:0,data: { user, type, _id }})
		})
	})
})
// 登录
Router.post('/login',function (req,res) {
	const {user,pwd} = req.body
	// console.log(md5Pwd(pwd))
	User.findOne( {user,pwd:md5Pwd(pwd)}, _filter, function (err,doc) {
		if (!doc) {
			return res.json({code:1,msg:"用户名或密码错误"})
		}
		res.cookie('userid',doc._id)
		return res.json({code:0,data:doc})
	})
})

// 用户信息
Router.get('/info',function (req,res) {
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid}, _filter, function (err,doc) {
		if (err) {
			return res.json({code:1,msg:'后端出错了'})
		}
		if (doc) {
			return res.json({code:0,data:doc})
		}
	})
})

//更新用户信息
Router.post('/update',function (req,res) {
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type,
		},body)
		return res.json({code:0,data})
	})

})


// 密码MD5加密
function md5Pwd (pwd) {
	const salt = 'olex_CHP_1216_!@#';
	return utility.md5(utility.md5(pwd+salt))
}



module.exports = Router