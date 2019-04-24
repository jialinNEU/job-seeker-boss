import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

// ActionTypes
const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
};

// Reducer
export function chat (state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {
        ...state, 
        chatmsg: action.payload.msgs, 
        unread: action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length, 
        users: action.payload.users
      };
    case MSG_RECV:
      const n = action.payload.msg.to === action.payload.userid ? 1 : 0;
      return {
        ...state, 
        chatmsg: [...state.chatmsg, action.payload.msg], 
        unread: state.unread + n
      };
    case MSG_READ:
      return {...state};
    default:
      return state;
  }
}

// 同步Action Creator
export function msgList(msgs, users, userid) {
  return {type: MSG_LIST, payload: {msgs, users, userid}};
}

export function msgRecv(msg, userid) {
  return {type: MSG_RECV, payload: {msg, userid}};
}

// 异步Action Creator
export function getMsgList() {
  // getState可以获取store中的全部内容
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          // 当前登录的用户的id
          const userid = getState().user._id;
          // console.log('getState', getState());
          dispatch(msgList(res.data.msgs, res.data.users, userid));
        }
      });
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    // 发送给后端
    socket.emit('sendmsg', {from, to, msg});
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      const userid = getState().user._id;
      dispatch(msgRecv(data, userid));
    })
  }
}