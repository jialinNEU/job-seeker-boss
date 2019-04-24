const mongoose = require('mongoose');

// 连接mongo, 解决Node Warning
const DB_URL = 'mongodb://localhost:27017/jobChatApp';
mongoose.connect(DB_URL, {useNewUrlParser:true}, function(err) {
    if(err){
　　　　console.log('Connection Error:' + err);    
    }else{
        console.log('Connection success!');
    }
});

// 数据模型
const models = {
    // 用户字段
    user: {
        'user': {type:String, require: true},
        'pwd': {type:String, require: true},
        'type': {type: String, require: true},
        // 头像
        'avatar': {type:String, require: true},
        // 个人简介
        'desc': {type: String},
        // 职位名称
        'title': {type: String},

        // Boss 的额外字段
        'company': {type: String},
        'money': {type: String}
    },

    // 聊天字段
    chat: {
        'chatid': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'content': {type: String, require: true, default: ''},
        'create_time': {type: Number, default: new Date().getTime()},
        'read': {type: Boolean, default: false}
    }
}

for(let m in models) {
    // 生成 Schema，并通过 Schema 创建 Model
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name);
    }
}