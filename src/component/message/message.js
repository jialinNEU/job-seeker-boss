import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(
  state=>state
)
export default class Message extends Component {
  
  getLast(arr) {
    return arr[arr.length - 1];
  }

  render() {

    const Item = List.Item;
    const Brief = Item.Brief;

    const msgGroup = {};
    // 根据聊天用户chatid对消息进行分组，显示每个聊天的最后一条消息
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    
    // 对最新消息进行排序
    const chatList = Object.values(msgGroup).sort((a, b)=>{
      const aLast = this.getLast(a).create_time;
      const bLast = this.getLast(b).create_time;
      return bLast - aLast;
    });
    const userid = this.props.user._id;

    return (
      <div>
        <List>
          {chatList.map(v=>{
            // 获取最后一条信息
            const lastItem = this.getLast(v);
            const targetId = v[0].from === userid ? v[0].to : v[0].from;
            const username = this.props.chat.users[targetId] ? this.props.chat.users[targetId].name : '';
            const avatar = this.props.chat.users[targetId] ? this.props.chat.users[targetId].avatar : null;
            const unreadNum = v.filter(e=>!e.read&&e.to===userid).length;

            return (
              <Item
                key={lastItem._id}
                thumb={require(`../img/${avatar}.png`)}
                extra={<Badge text={unreadNum}></Badge>}
                arrow='horizontal'
                onClick={()=>{
                  this.props.history.push(`/chat/${targetId}`);
                }}
              >
                {lastItem.content}
                <Brief>{username}</Brief>
              </Item>
            );
          })}
        </List>
      </div>
    );
  }
}
