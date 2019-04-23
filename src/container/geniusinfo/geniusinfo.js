import React, { Component } from 'react'

import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux'; 

@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            desc: ''
        };
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        });
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;

        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} />: null}
                
                <NavBar mode="dark">牛人信息完善</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}
                ></AvatarSelector>
                
                <InputItem onChange={(val)=>this.onChange('title', val)}>求职岗位</InputItem>

                <TextareaItem
                    rows={3}
                    title='个人简介'
                    autoHeight
                    onChange={(val)=>this.onChange('desc', val)}
                >
                </TextareaItem>

                <Button 
                    onClick={()=>{
                        this.props.update(this.state);
                    }}
                    type='primary'
                >
                保存</Button>
            </div>
        )
    }
}

export default GeniusInfo;