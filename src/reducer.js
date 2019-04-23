import { combineReducers } from "redux";

import { user } from './redux/user.redux';
import { chatuser } from './redux/chatuser.redux';

// 合并所有reducer，并且返回

export default combineReducers({
    user,       // 通过state.user获取名为user的reducer
    chatuser    // 通过state.chatuser获取名为chatuser的reducer
});