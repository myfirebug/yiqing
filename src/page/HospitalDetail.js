/*
 * @Author: hejp
 * @Date:   19:26
 * @Last Modified by:   hejp
 * @Last Modified time: 19:26
 */
import React, {Component} from 'react';
import {createHashHistory} from 'history';
import Ajax from '../service'

class HospitalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            region: ''
        }
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.region) {
            Ajax.getEpidemicHospitalDetail({
                region: this.props.location.state.region
            });
            this.setState({
                cityName: this.props.location.state.name,
                region: this.props.location.state.region
            })
        } else {
            createHashHistory().push({
                pathname: '/home'
            });
        }
    }

    componentWillUnmount() {
        sessionStorage.removeItem('params');
    }



    render() {
        return (
            <div className="app">
                <header className="header">
                    <h1 className="title">{this.state.cityName}医疗救治点</h1>
                </header>
                <div className="hospital-detail">
                    <div className="hospital-detail-hd">
                        <h1 className="city-name">{this.state.cityName}</h1>
                        <p className="text">医疗救治定点医院和发热门诊一览</p>
                        <p className="info">信息来源：各省、自治区、直辖市及新疆生产建设兵团官方发布渠道</p>
                    </div>
                    <ul className="hospital-list">
                       <li className="hospital-item">
                           <a href="">
                                <div className="hospital-num">01</div>
                               <div className="hospital-content">
                                   <h2 className="title">成都医学院第一附属医院</h2>
                                   <div className="labels">
                                       <span>医疗救治定点医院</span><span>发热门诊</span>
                                   </div>
                                   <div className="address">成都医学院第一附属医院</div>
                                   <div className="dw"></div>
                               </div>
                           </a>
                       </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default HospitalDetail;
