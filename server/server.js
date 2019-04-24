const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./user.js');
const Chat = require('./model').getModel('chat');

// 新建app
const app = express();

// socket和express关联
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', function(socket) {
    // 参数socket为当前的连接
    socket.on('sendmsg', function(data) {
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({chatid, from, to, content: msg}, function(err, doc) {
            // data是客户端传送过来的
            // io.emit发送给全局，与本次连接的socket不同
            io.emit('recvmsg', Object.assign({}, doc._doc));
        });
    });
})


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
server.listen(9093, function(){
    console.log('App starts at port 9093')
});