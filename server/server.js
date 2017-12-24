const express = require('express')
const bodyParser = require('body-parser')//
const cooieParser = require('cookie-parser')//cookie中间件

/**
 * user路由
 * @type {[type]}
 */
const userRouter = require('./user')

const app = express();
app.use(cooieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

app.listen(9093,function () {
	console.log('server start at port 9093')
});

