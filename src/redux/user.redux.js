import axios from 'axios';

import { getRedirectPath } from '../util.js';

// ActionTypes
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOG_OUT = 'LOG_OUT';

const CLEAR_REDIRECT = 'CLEAR_REDIRECT';

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

// Reducer
export function user(state=initState, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload};
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case LOG_OUT:
            return {...initState, redirectTo: '/login'}
        case CLEAR_REDIRECT:
            return {...initState}
        default:
            return state;
    }
}



/** 异步Action Creators，返回一个参数为dispatch的axios调用并手动dispatch */

export function login({user, pwd}) {
    if(!user || !pwd) {
        return errorMsg('用户名和密码必须输入');
    }

    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            });
    }
}


export function register({user, pwd, repeatpwd, type}) {
    if(!user || !pwd || !type) {
        return errorMsg('用户名和密码必须输入');
    }

    if(pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同');
    }

    // axios 异步调用
    return dispatch => {
        // 使用dispatch来通知数据修改
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                // code 由后端设置
                if(res.status === 200 && res.data.code === 0) {
                    // 请求成功 
                    dispatch(authSuccess({user, type}));
                } else {
                    // 请求失败
                    dispatch(errorMsg(res.data.msg))
                }
            });
    }
}


export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res=> {
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            });
    }
}


/** 同步Action Creators，直接返回一个action对象，会被自动dispatch */
function errorMsg(msg) {
    return {type: ERROR_MSG, msg: msg};
}

function authSuccess(obj) {
    // const {pwd, ...data} = obj;
    const {...data} = obj;
    return {type: AUTH_SUCCESS, payload: data};
}

export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo};
}

export function logoutSubmit() {
    return {type: LOG_OUT};
}

export function clearRedirect() {
    return {type: CLEAR_REDIRECT};
}