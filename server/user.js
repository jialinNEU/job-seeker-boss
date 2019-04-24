// 将所有跟 User 相关的路由都抽离到一个文件中

const utility = require('utility');
const express = require('express');
const Router = express.Router();

const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');

// MongoDB的过滤器
const _filter = {'pwd':0, '__v':0}


// 发送请求代码在 user.redux.js
Router.post('/login', function(req, res) {
    const {user, pwd} = req.body;
    // 第一个参数为查询条件，第二个参数筛选显示内容
    User.findOne({user, pwd:md5Pwd(pwd)}, _filter, function(err, doc) {
        if(!doc) {
            return res.json({code:1, msg:'用户名或密码错误'});
        }

        // 设置 Cookie
        res.cookie('userid', doc._id);

        return res.json({code:0, data: doc});
    });
})

// 发送请求代码在 user.redux.js的异步axios调用中
Router.post('/register', function(req, res) {
    const {user, pwd, type} = req.body;
    User.findOne({user: user}, function(err, doc) {
        if(doc) {
            // 请求失败
            return res.json({code:1, msg:'用户名重复'});
        }

        // 请求成功，创建user并存储到model中
        const userModel = new User({user, type, pwd: md5Pwd(pwd)});
        userModel.save(function(err, doc) {
            if(err) {
                return res.json({code:1, msg:'后端出错了'});
            }
            const {user, type, _id} = doc;
            res.cookie('userid', _id);
            return res.json({code:0, data:{user, type, _id}});
        });
    });
});

// 发送请求代码在 user.redux.js
Router.post('/update', function(req, res) {
    const userid = req.cookies.userid;
    if(!userid) {
        return res.json.dumps({code:1});
    }

    const body = req.body;
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({code:0, data});
    });
});



Router.get('/list', function(req, res) {
    const {type} = req.query;

    User.find({type}, function(err, doc) {
        return res.json({code:0, data:doc});
    })
});


// 见AuthRoute中的axios请求
Router.get('/info', function(req, res) {
    // 检测用户有没有cookie
    const {userid} = req.cookies;
    if(!userid) {
        return res.json({code: 1});
    }
    
    User.findOne({_id:userid}, _filter, function(err, doc) {
        if(err) {
            return res.json({code:1, msg:'后端出错了'});
        }
        if(doc) {
            return res.json({code:0, data:doc});
        }
    })
});


Router.get('/getmsglist', function(req, res) {
    const user = req.cookies.user;
    // $or表示两者满足其一就被获取
    Chat.find({'$or': [{from: user, to: user}]}, function(err, doc) {
        if (!err) {
            return res.json({code: 0, msgs: doc});
        }
    });
});



// MD5 加强加密（salt加密）
function md5Pwd(pwd) {
    const salt = 'jobChatApp';
    return utility.md5(utility.md5(pwd + salt));
}


module.exports = Router;