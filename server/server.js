const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./user.js');

// 新建app
const app = express();

// 使用中间件

app.use(cookieParser());
// 接受 post 传递来的参数
app.use(bodyParser.json());
// '/user' 作为路由前缀，以后的路由由userRoute决定
app.use('/user', userRouter);

app.get('/', function(req, res){
    res.send('<h1>Boss/Genius App Backend</h1>')
});

// 监听端口
app.listen(9093, function(){
    console.log('App starts at port 9093')
});