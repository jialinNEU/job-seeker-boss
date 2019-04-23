import React from 'react';

import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Logo from '../../component/logo/logo';
import FormHOC from '../../component/form/form';
import { login, clearRedirect } from '../../redux/user.redux.js';


@connect(
    state=>state.user,
    {login, clearRedirect}
)
@FormHOC
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        this.props.clearRedirect();
    }

    handleLogin() {
        this.props.login(this.props.state);
    }

    register() {
        // Login 是一个路由组件，可以操作路由
        this.props.history.push('/register');
    }


    render() {
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/login' ? <Redirect to={this.props.redirectTo} /> : null}

                <Logo></Logo>
                <h2>登录页</h2>

                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}

                        <InputItem
                            onChange={val=>this.props.handleChange('user', val)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem 
                            type="password"
                            onChange={val=>this.props.handleChange('pwd', val)}
                        >密码</InputItem>
                    </List>

                    <WhiteSpace />

                    <Button onClick={this.handleLogin} type="primary">登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>

            </div>
        )
    }
}

export default Login;
