import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../user-card/user-card';

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Genius extends Component {

  componentDidMount() {
    this.props.getUserList('boss');
}

  render() {

      return (
          <UserCard userlist={this.props.userlist} />
      )
  }
}

export default Genius;