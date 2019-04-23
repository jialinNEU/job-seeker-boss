import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import BrowserCookies from 'browser-cookies';

import { logoutSubmit } from '../../redux/user.redux';

@connect(
  state=>state.user,
  {logoutSubmit}
)
class User extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout() {
    console.log('logout');
    const alert = Modal.alert;
    alert('退出登录', '确认退出登录吗？', [
      {text: '取消', onPress: () => console.log('cancel')},
      {text: '确认', onPress: () => {
        // 清楚cookie
        BrowserCookies.erase('userid');
        // 清楚redux数据
        this.props.logoutSubmit();
      }}
    ]);

  } 

  render() {

    const Item = List.Item;
    const Brief = Item.Brief;

    return this.props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} alt='' style={{width: 50}} />}
          title={this.props.user}
          message={this.props.type === 'boss' ? this.props.company : null}
        />

        <List renderHeader={()=>'简介'}>
          <Item multipleLine>
            {this.props.title}
            {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {this.props.money ? <Brief>薪资: {this.props.money}</Brief> : null}
          </Item>
        </List>

        <WhiteSpace />

        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={this.props.redirectTo} />
  }
}

export default User;