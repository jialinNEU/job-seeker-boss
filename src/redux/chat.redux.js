import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

// ActionTypes
const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
  chatmsg: [],
  unread: 0
};

// Reducer
export function chat (state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.payload, unread: action.payload.filter(v=>!v.read).length};
    case MSG_RECV:
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1};
    case MSG_READ:
      return {...state};
    default:
      return state;
  }
}

// 同步Action Creator
export function msgList(msgs) {
  return {type: MSG_LIST, payload: msgs};
}

export function msgRecv(msg) {
  return {type: MSG_RECV, payload: msg};
}

// 异步Action Creator
export function getMsgList() {
  return dispatch => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          console.log('msgs: ', res.data.msgs);
          dispatch(msgList(res.data.msgs));
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
  return dispatch => {
    socket.on('recvmsg', function(data) {
      dispatch(msgRecv(data));
    })
  }
}