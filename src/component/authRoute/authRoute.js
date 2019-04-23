import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadData } from '../../redux/user.redux';


// withRouter 使得不是路由组件的 AuthRoute 转换为路由组件
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component {

    componentDidMount() {
        const publicList = [
            '/login',
            '/register'
        ];

        // 判断是否处于 Login 或 Register 页面（白名单），若处于这两个页面中则不进行校验
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1) {
            return null;
        }

        // 获取用户信息
        axios.get('/user/info')
            .then(res => {
                if(res.status === 200) {
                    if(res.data.code === 0) {
                        // 有登录信息
                        this.props.loadData(res.data.data);
                    } else {
                        // 无登录信息，跳转到 Login、
                        this.props.history.push('/login');
                    }
                }
            });

        // 
    }

    render() {
        return null;
    }
}

export default AuthRoute;