import { combineReducers } from "redux";

import { user } from './redux/user.redux';
import { chatuser } from './redux/chatuser.redux';
import { chat } from './redux/chat.redux';

// 合并所有reducer，并且返回

export default combineReducers({
    user,       // 通过state.user获取名为user的reducer
    chatuser,   // 通过state.chatuser获取名为chatuser的reducer,
    chat,       // 通过state.chat获取名为chat的reducer
});