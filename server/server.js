const express = require('express')
const bodyParser = require('body-parser')//
const cooieParser = require('cookie-parser')//cookie中间件
const app = express();

const model = require('./model')
// const User = model.getModel('user')
const Chat = model.getModel('chat')
// Chat.remove({},function(e,d){})
/**
 * socket.io work with express
 */
const server = require('http').Server(app)

const io = require('socket.io')(server)
io.on('connection',function(socket){
	console.log('user login ...')
	socket.on('sendmsg',function (data) {
		console.log(data)
		const {from,to,msg } = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function (err,doc) {
			console.log(doc._doc)
			io.emit('recvmsg',Object.assign({},doc._doc))
		})

	})
})




/**
 * user路由
 */
const userRouter = require('./user')


app.use(cooieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(9093,function () {
	console.log('server start at port 9093')
});

