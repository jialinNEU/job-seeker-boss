import React from 'react';

import { List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Logo from '../../component/logo/logo';
import FormHOC from '../../component/form/form';
import { register } from '../../redux/user.redux';


@connect(
    state=>state.user,
    {register}
)
@FormHOC
class Register extends React.Component {
    // 较箭头函数而言，性能小幅提升
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius');
    }

    handleRegister() {
        this.props.register(this.props.state);
    }


    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}

                <Logo></Logo>

                <List>
                    
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <InputItem
                        onChange={(val)=>this.props.handleChange('user', val)}
                    >用户名</InputItem>
                    <WhiteSpace />

                    <InputItem
                        type="password"
                        onChange={(val)=>this.props.handleChange('pwd', val)}
                    >密码</InputItem>
                    <WhiteSpace />

                    <InputItem
                        type="password"
                        onChange={(val)=>this.props.handleChange('repeatpwd', val)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    
                    <RadioItem 
                        checked={this.props.state.type === 'genius'}
                        onChange={()=>this.props.handleChange('type', 'genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem 
                        checked={this.props.state.type === 'boss'}
                        onChange={()=>this.props.handleChange('type', 'boss')}
                    >
                        Boss
                    </RadioItem>
                    <WhiteSpace />

                    <Button 
                        type="primary"
                        onClick={this.handleRegister}
                    >
                        注册
                    </Button>

                </List>
            </div>
        );
    }
}

export default Register;