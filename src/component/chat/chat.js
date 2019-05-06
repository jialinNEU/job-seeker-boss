/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';

import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux';
import { getChatId } from '../../util';



@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {text:'', showEmoji: false};
    this.fixCarousel = this.fixCarousel.bind(this);
  }

  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }

    const to = this.props.match.params.user;
    this.props.readMsg(to);
    this.fixCarousel();
  }

  // 当在聊天页面中对方发来消息后，在退出当前聊天时将之前的消息设置为已读
  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }

  
  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  handleSubmit() {
    // from和to都是user id
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg});
    this.setState({text: '', showEmoji: false});
  }
  

  render() {
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    const Item = List.Item;

    const chat_id = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chat_id);

    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))



    if (!users[userid]) {
      return null;
    }

    return (
      <div id='chat-page'>
        
        <NavBar 
          mode='dark'
          icon={<Icon type="left" />}
          onLeftClick={()=>{
            this.props.history.goBack();
          }}
        >
          {users[userid].name}
        </NavBar>

        <div className="stick-footer">
          {chatmsgs.map(v=>{
            const avatar = require(`../img/${users[v.from].avatar}.png`);
            return v.from === userid ? (
              <List key={v._id}>
                <Item
                  thumb={avatar}
                >{v.content}</Item>
              </List>
            ) : (              
              <List key={v._id}>
                <Item 
                  className='chat-me'
                  extra={<img src={avatar} alt='' />}
                >{v.content}</Item>
              </List>
            );
          })}

          <List>
            <InputItem
              placeholder='请手动输入'
              value={this.state.text}
              onChange={v=>{this.setState({text: v})}}
              extra={
                <div>
                  <span
                    style={{marginRight: 15}}
                    onClick={()=>{
                      this.setState({showEmoji: !this.state.showEmoji});
                      this.fixCarousel();
                    }}
                  >😃</span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>
              }
            >消息</InputItem>
          </List>

          {this.state.showEmoji ? <Grid 
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={(e)=> {
              this.setState({text: this.state.text + e.text});
            }}
          /> : null}
        </div>

      </div>
    );
  }
}

export default Chat;