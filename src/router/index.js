/*
 * @Author: hejp
 * @Date:   17:11
 * @Last Modified by:   hejp
 * @Last Modified time: 17:11
 */
import React, {Component} from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
// 首页
import Home from '../page/Home'

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/Home" component={Home}></Route>
                    <Redirect to='/home'/>
                </Switch>
            </HashRouter>
        )
    }
}

export default Router;
