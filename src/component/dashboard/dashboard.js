import React, { Component } from 'react';

import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavLinkBar from '../navlinkbar/navlinkbar';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';

function Message() {
    return <h2>Message首页</h2>
}



@connect(
    state=>state
)
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const user = this.props.user;
        const { pathname } = this.props.location;

        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'Boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Message,
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];

        return navList.find((v)=>(v.path===pathname))!==undefined ? (
            <div>
                <NavBar mode="dark" className="am-navbar">{navList.find((v)=>(v.path===pathname)).title}</NavBar>
                <div >
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}/>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList} className="am-tab-bar"/>
            </div>
        ) : <Redirect to={`/${user.type}`}/>;
    }
}

export default Dashboard;
