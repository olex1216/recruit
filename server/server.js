import express from 'express'
import bodyParser from 'body-parser'
import cooieParser from 'cookie-parser'//cookie中间件
import path  from 'path'
import model from './model'
//css
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook'

/**
 * SSR所需的组件
 */
import React from 'react'
import {renderToNodeStream} from "react-dom/server";
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import {
	Provider
} from 'react-redux'
import {
	StaticRouter,
} from "react-router-dom"
import thunk from 'redux-thunk';
import  App from '../src/app';
import reducers from '../src/reducers'

import staticPath from '../build/asset-manifest.json'

assethook({
	extensions:['png']
})

const app = express();
const Chat = model.getModel('chat')
/**
 * socket中间件，收发消息
 */
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection',function(socket){
	socket.on('sendmsg',function (data) {
		const {from,to,msg } = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function (err,doc) {
			io.emit('recvmsg',Object.assign({},doc._doc))
		})

	})
})




/**
 * user路由
 */
const userRouter = require('./user')

/**
 * cookie 中间件
 */
app.use(cooieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

/**
 * SSR
 * 拦截请求
 * 接口和静态资源，使用中间件
 * @param  {object} req        请求对象
 * @param  {object} res        返回对象
 * @param  {中间件} next){	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {		return next()	}	return res.sendFile(path.resolve('build/index.html'))} [description]
 * @return {[type]}            [description]
 */
app.use(function(req,res,next){
	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	}

	// 全局state
	const store = createStore(reducers, compose(
		applyMiddleware(thunk)
	))

	let context={}
	res.write(`
		<!DOCTYPE html>
		<html lang="en">
		  <head>
		    <meta charset="utf-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		    <meta name="theme-color" content="#000000">
		    <title>React App</title>
		    <link rel="stylesheet" href="/${staticPath['main.css']}">
		  </head>
		  <body>
		    <noscript>
		      You need to enable JavaScript to run this app.
		    </noscript>
		    <div id="root">
		`)
	const markupStream = renderToNodeStream(
		(<Provider store={store}>
			<StaticRouter
				location={req.url}
				context={context}
			>	
				<App/>
			</StaticRouter>
		</Provider>)
	)
	markupStream.pipe(res,{end:false})
	markupStream.on('end',()=>{
		res.write(`</div>
		    <script src='/${staticPath['main.js']}'></script>
			</body>
			</html>`)
		res.end()
	})

})


app.use('/',express.static(path.resolve('build')))
server.listen(9093,function () {
	console.log('server start at port 9093')
});

