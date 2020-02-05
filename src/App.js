import React, {Component} from 'react';
import Routers from './router/index'
import './app.scss'

class App extends Component {
    render() {
        return (
            <div>
                <Routers/>
                <div id="js_loading" className="ui-loading-wrap">
                    <div className="ui-loading">
                        <div className="anticon-loading"></div>
                        <div className="ui-loading-text">loading...</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
