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

import HospitalDetail from '../page/HospitalDetail'

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/hospital-detail" component={HospitalDetail}></Route>
                    <Redirect to='/hospital-detail'/>
                </Switch>
            </HashRouter>
        )
    }
}

export default Router;
