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
            params: {},
            list: [],
            value: ''
        }
        this.timmer = null;
    }

    componentDidMount() {
        let params = {};
        if (this.props.location.state && this.props.location.state.region) {
            params = {
                cityName: this.props.location.state.name,
                region: this.props.location.state.region
            }
            sessionStorage.setItem('params', JSON.stringify(params));
           /**this.getEpidemicHospitalDetail(this.props.location.state.region);
            this.setState({
                cityName: this.props.location.state.name,
                region: this.props.location.state.region
            })**/
        } else if(sessionStorage.getItem('params')) {
            params = JSON.parse(sessionStorage.getItem('params'));
        }

        if (JSON.stringify(params) === '{}') {
            createHashHistory().push({
                pathname: '/'
            });
        }

        this.setState(state => ({
            params: params
        }), () => {
            this.getEpidemicHospitalDetail(this.state.params.region);
            document.title = `${this.state.params.cityName}医疗救治点`
        })
    }


    /**
     * 获取该省下所有医院
     */
    getEpidemicHospitalDetail = (region, name) => {
        Ajax.getEpidemicHospitalDetail({
            region: region,
            name: name
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    list: res.datas
                });
            }
        });
    }

    searchChange = (e) => {
        let value = e.target ? e.target.value : e,
            timmer = this.timmer;
        if (timmer) {
            clearTimeout(timmer);
        }
        timmer = setTimeout(() => {
            this.setState({
                value: value
            });
            this.getEpidemicHospitalDetail(this.state.params.region, value)
        }, 200);
        this.timmer = timmer;
    }

    clearSearch = () => {
        this.refs.searchInp.value = '';
        this.searchChange('');
    }

    componentWillUnmount() {
        sessionStorage.removeItem('params');
    }



    render() {
        return (
            <div className="app">
                <div className="search-wrapper">
                    <input type="text" placeholder="请输入医院名称" ref="searchInp" onChange={this.searchChange} />
                    {
                        this.state.value ? <div className="close" onClick={this.clearSearch}></div> : null
                    }
                    
                </div>
                <header className="header">
                    <h1 className="title">{this.state.params.cityName}医疗救治点</h1>
                </header>
                <div className="hospital-detail">
                    <div className="hospital-detail-hd">
                        <h1 className="city-name">{this.state.params.cityName}</h1>
                        <p className="text">医疗救治定点医院和发热门诊一览</p>
                        <p className="info">信息来源：各省、自治区、直辖市及新疆生产建设兵团官方发布渠道</p>
                    </div>
                    <ul className="hospital-list">
                        {
                            this.state.list.map((item, index) => (
                                <li className="hospital-item" key={index}>
                                    <a href={`https://uri.amap.com/marker?position=${item.longitude},${item.latitude}&name=${item.name}&src=mypage&coordinate=gaode&callnative=0`}>
                                        <div className="hospital-num">{index < 9 ? '0' + (index + 1) : index + 1}</div>
                                        <div className="hospital-content">
                                            <h2 className="title">{item.name}</h2>
                                            <div className="labels">
                                                {
                                                    item.tag ? item.tag.split(',').map((a, b) => (
                                                    <span key={b}>{a}</span>
                                                    )) : null
                                                }
                                            </div>
                                            <div className="address">{item.address}</div>
                                            <div className="dw"></div>
                                        </div>
                                    </a>
                                </li>
                            ))
                        }
                       
                    </ul>
                </div>
            </div>
        );
    }
}

export default HospitalDetail;
