import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import AuthRoute from './component/authRoute/authRoute';

import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';

import reducer from './reducer.js';
import './config';
import './index.css';


// 使用 Reducer 创建 Store
// applyMiddleware 用来管理中间件，从而处理异步
// 使用redux的 compose 结合 thunk 和 window.devToolsExtension

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f=>f;

// createStore还可以接受preloadState作为第二个参数，可以在进入页面前进行读取sessionStorage，并传入createStore中作为初始状态
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        reduxDevtools
    )
);

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute />
                <Switch>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);