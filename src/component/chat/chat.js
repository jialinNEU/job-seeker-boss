import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, InputItem, NavBar } from 'antd-mobile';

import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux';

import io from 'socket.io-client';
const socket = io('ws://localhost:9093');



@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {text:'', msg: []};
  }

  componentDidMount = () => {
    this.props.getMsgList();
    this.props.recvMsg();
  }

  handleSubmit() {
    // from和to都是user id
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg});
    this.setState({text: ''});
  }
  

  render() {
    const user = this.props.match.params.user;
    const Item = List.Item;

    return (
      <div id='chat-page'>
        
        <NavBar mode='dark'>
          {this.props.match.params.user}
        </NavBar>

        <div className="stick-footer">
          {this.props.chat.chatmsg.map(v=>{
            return v.from === user ? (
              <List key={v._id}>
                <Item
                >{v.content}</Item>
              </List>
            ) : (              
              <List key={v._id}>
                <Item 
                  className='chat-me'
                  extra={'avatar'}
                >{v.content}</Item>
              </List>
            );
          })}

          <List>
            <InputItem
              placeholder='请手动输入'
              value={this.state.text}
              onChange={v=>{this.setState({text: v})}}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
            >消息</InputItem>
          </List>
        </div>

      </div>
    );
  }
}

export default Chat;