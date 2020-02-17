/*
 * @Author: hejp
 * @Date:   18:05
 * @Last Modified by:   hejp
 * @Last Modified time: 18:05
 */
import React, {Component} from 'react';
import Ajax from '../service'
import ReactEcharts from '../components/ReactEcharts'
import {Link} from 'react-router-dom';
import axios from 'axios'
import imgUrl from '../assets/images/header_02.jpg'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    name: '四川',
                    region: '510000',
                    checked: true
                },
                {
                    name: '全国',
                    region: '100000',
                    checked: false
                }
            ],
            cityName: '四川',
            // 地图配置
            mapOption: {},
            // 疫情统计
            statistics: [],
            // 疫情新增趋势配置
            addTrendOption: {},
            // 累计确诊/疑似趋势
            totalTrendOption: {},
            // 累计治愈/死亡趋势
            resultTrendOption: {},
            // 医疗救治医院查询
            hospital: [],
            // 最新进展
            newsList: [],
            // 疫情速报
            reportList: [],
            // 疫情速报统计
            reportStatistics: [],
            // 所有省份数据
            provinces: [
                {
                    name: '湖北',
                    region: ''
                },
                {
                    name: '浙江',
                    region: ''
                },
                {
                    name: '广东',
                    region: ''
                },
                {
                    name: '河南',
                    region: ''
                },
                {
                    name: '湖南',
                    region: ''
                },
                {
                    name: '安徽',
                    region: ''
                },
                {
                    name: '江西',
                    region: ''
                },
                {
                    name: '重庆',
                    region: ''
                },
                {
                    name: '江苏',
                    region: ''
                },
                {
                    name: '四川',
                    region: ''
                },
                {
                    name: '山东',
                    region: ''
                },
                {
                    name: '北京',
                    region: ''
                },
                {
                    name: '上海',
                    region: ''
                },
                {
                    name: '福建',
                    region: ''
                },
                {
                    name: '黑龙江',
                    region: ''
                },
                {
                    name: '陕西',
                    region: ''
                },
                {
                    name: '广西',
                    region: ''
                },
                {
                    name: '河北',
                    region: ''
                },
                {
                    name: '云南',
                    region: ''
                },
                {
                    name: '海南',
                    region: ''
                },
                {
                    name: '辽宁',
                    region: ''
                },
                {
                    name: '山西',
                    region: ''
                },
                {
                    name: '天津',
                    region: ''
                },
                {
                    name: '贵州',
                    region: ''
                },
                {
                    name: '甘肃',
                    region: ''
                },
                {
                    name: '吉林',
                    region: ''
                },
                {
                    name: '内蒙古',
                    region: ''
                },
                {
                    name: '宁夏',
                    region: ''
                },
                {
                    name: '新疆',
                    region: ''
                },
                {
                    name: '香港',
                    region: ''
                },
                {
                    name: '青海',
                    region: ''
                },
                {
                    name: '澳门',
                    region: ''
                },
                {
                    name: '台湾',
                    region: ''
                },
                {
                    name: '西藏',
                    region: ''
                }
            ],
            // 国内
            chinaList: [],
            // 国外
            abroadList: [],
            abroad: {
                diagnosis: 0,
                die: 0
            }
        }
    }

    componentDidMount() {
        // 疫情地域分析
        this.epidemicMap({
            region: '510000'
        });
        // 疫情统计
        this.epidemicStatistics({
            region: '510000'
        });
        /*// 疫情新增趋势
        this.getEpidemicAddTrend({
            region: '510000'
        });
        // 累计确诊/疑似趋势
        this.getEpidemicTotalTrend({
            region: '510000'
        });
        // 累计治愈/死亡趋势
        this.getEpidemicResultTrend({
            region: '510000'
        });**/
        // 疫情救治医院查询
        this.getEpidemicHospital({
            region: '510000'
        });
        // 疫情最新进展
        this.getEpidemicNews({
            region: '510000'
        });
        // 疫情速报
        this.getEpidemicReport({
            region: '510000'
        });
        // 疫情快速统计
        this.reportStatistics({
            region: '510000'
        });
        // 国内
        this.epidemicDistribution(0);
        // 国外
        this.epidemicDistribution(1);

        this.epidemicOfRegion({
            region: '100000'
        });
        this.share();
    }

    share = () => {
        axios.get('http://ptisp.daqsoft.com/scapi/api/scapi/app/weChat/getSignature', {
            params: {
                url:window.location.href.split('#')[0],
                siteCode:'qhlswgw',
                lang:'cn'
            }
        }).then(res => {
            window.wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: [
                'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQZone', 'onMenuShareWeibo'
                ]
            });
              window.wx.ready(function () {
                window.wx.onMenuShareTimeline({
                    title: '新型肺炎疫情最新动态', // 分享标题
                    link: window.location.href, // 分享链接
                    imgUrl: 'http://p.ued.daqsoft.com/test/daqsoft-h5/images/share-head.jpg', // 分享图标
                    success: function () {
                      // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                      // 用户取消分享后执行的回调函数
                    }
                  });
                  window.wx.onMenuShareAppMessage({
                    title: '新型肺炎疫情最新动态', // 分享标题
                    desc: '全国新冠肺炎疫情最新动态,技术支持：四川省文化和旅游大数据工程技术研究中心', // 分享描述
                    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://p.ued.daqsoft.com/test/daqsoft-h5/images/share-head.jpg', // 分享图标
                    type: 'link',
                    trigger: function (res) {},
                    success: function (res) {},
                    cancel: function (res) {},
                    fail: function (res) {}
                  });
                  window.wx.onMenuShareQZone({
                    title: '新型肺炎疫情最新动态', // 分享标题
                    desc: '全国新冠肺炎疫情最新动态,技术支持：四川省文化和旅游大数据工程技术研究中心', // 分享描述
                    link: window.location.href, // 分享链接
                    imgUrl: 'http://p.ued.daqsoft.com/test/daqsoft-h5/images/share-head.jpg', // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                    }
                  });
                  window.wx.onMenuShareWeibo({
                    title: '新型肺炎疫情最新动态', // 分享标题
                    desc: '全国新冠肺炎疫情最新动态,技术支持：四川省文化和旅游大数据工程技术研究中心', // 分享描述
                    link: window.location.href, // 分享链接
                    imgUrl: 'http://p.ued.daqsoft.com/test/daqsoft-h5/images/share-head.jpg', // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                    }
                  });
              });
        }).catch(res => {
            console.log(res);
        })
    }

    /**
     * 切换选项卡
     * @param item
     * @param index
     */
    tabChange = (item, index) => {
        if (!item.checked) {
            let tabs = this.state.tabs;
            for (let i = 0; i < tabs.length; i++) {
                if (i === index) {
                    this.setState({
                        cityName: tabs[i].name
                    })
                    tabs[i].checked = true
                } else {
                    tabs[i].checked = false
                }
            }
            // 疫情地域分析
            this.epidemicMap({
                region: item.region
            });
            // 疫情统计
            this.epidemicStatistics({
                region: item.region
            });
            if (index === 1) {
                // 疫情新增趋势
                this.getEpidemicAddTrend({
                    region: item.region
                });
                // 累计确诊/疑似趋势
                this.getEpidemicTotalTrend({
                    region: item.region
                });
                // 累计治愈/死亡趋势
                this.getEpidemicResultTrend({
                    region: item.region
                });
            }
            // 疫情救治医院查询
            this.getEpidemicHospital({
                region: item.region
            });
            // 疫情最新进展
            this.getEpidemicNews({
                region: item.region
            });
            // 疫情速报
            this.getEpidemicReport({
                region: item.region
            });
            // 疫情快速统计
            this.reportStatistics({
                region: item.region
            });
        }
    }

    /**
     * 获取地图数据
     * @param params
     */
    epidemicMap(params) {
        Ajax.epidemicMap(params)
            .then(res => {
                if (res.code === 0) {
                    if (params.region === '100000') {
                        this.renderMap('000000', '中国', res.data.content.charts[0].series[0].data);
                    } else {
                        this.renderMap('510000', '四川', res.data.content.charts[0].series[0].data);
                    }
                }
            })
    }

    /**
     * 疫情救治医院查询
     */
    getEpidemicHospital = (params) => {
        Ajax.getEpidemicHospital(params)
            .then(res => {
                if (res.code === 0) {
                    this.setState({
                        hospital: res.datas
                    })
                }
            })
    }
    /**
     * 疫情统计
     * @param params
     */
    epidemicStatistics(params) {
        Ajax.epidemicStatistics(params)
            .then(res => {
                console.log(params);
                if (res.code === 0) {
                    let data = res.data.content.blocksEx,
                        statistics = [];
                    data.map((item) => {
                        if (item.data.length && item.data[0].value) {
                            statistics.push({
                                title: item.title,
                                total: item.data.length ? item.data[0].value : 0,
                                add: item.data.length > 1 ? item.data[1].value : 0,
                                compare: item.data.length > 1 ? item.data[1].extend.compare : 0
                            });
                        }
                    });
                    this.setState({
                        statistics: statistics
                    })
                }
            })
    }

    /**
     * 渲染地图
     * @param region
     * @param name
     */
    renderMap = (region, name, data) => {
        let splitList = [],
            datas = [];
        data.map(item => {
            datas.push({
                name: window.city[item.region] ? window.city[item.region].baiduName : '',
                value: item.value
            });
        });
        datas.map((item, index) => {
            let color = '',
                start = 0,
                end = 0;
            if (item.value > 10000) {
                color = '#9c0a0d';
                start = 10000;
                end = item.value;
            } else if (item.value > 1000) {
                color = '#c91014';
                start = 1000;
                end = 9999;
            } else if (item.value > 500) {
                color = '#e64b47';
                start = 500;
                end = 999;
            } else if (item.value > 100) {
                color = '#fe8664';
                start = 100;
                end = 499;
            } else if (item.value > 10) {
                color = '#ffd2a0';
                start = 10;
                end = 99;
            } else {
                color = '#ffefd7';
                start = 1;
                end = 9;
            }
            splitList.push({
                start: start,
                end: end,
                label: item.name,
                color: color
            });
            return splitList
        });
        Ajax.map(region)
            .then(res => {
                window.echarts.registerMap(name, res);
                // 这里设置地图的配置项
                this.setState(state => ({
                    mapOption: {
                        tooltip: {
                            trigger: 'item',
                            formatter: function (a) {
                                return `<div style="padding:0 5px;line-height:18px">
                                             <p style="margin:0;padding:0;font-size:12px;font-weight: bold">
                                                ${a.name}
                                             </p>
                                             <p style="margin:0;padding:0;;font-size:12px">
                                                确诊：${a.value ? a.value : 0}人
                                            </p>
                                        </div>`
                            }
                        },
                        series: [{
                            type: 'map',
                            map: name,
                            label: {
                                normal: {
                                    show: true, //显示省份标签
                                    textStyle: {
                                        color: '#000',
                                        fontSize: 10
                                    } //省份标签字体颜色
                                },
                                emphasis: { //对应的鼠标悬浮效果
                                    show: false,
                                    textStyle: {
                                        color: '#000'
                                    }
                                }
                            },
                            aspectScale: 0.75,
                            zoom: 1.2,
                            itemStyle: {
                                normal: {
                                    borderWidth: .5, //区域边框宽度
                                    borderColor: '#666', //区域边框颜色
                                    areaColor: "#ffefd5", //区域颜色
                                },
                                emphasis: {
                                    borderWidth: .5,
                                    borderColor: '#666',
                                    areaColor: "#fff",
                                }
                            },
                            data: datas
                        }],
                        dataRange: {
                            show: true,
                            x: '-1000 px', //图例横轴位置
                            y: '-1000 px', //图例纵轴位置
                            splitList: splitList
                        }
                    }
                }))
            })
    }

    /**
     * 疫情新增趋势
     */
    getEpidemicAddTrend = (params) => {
        Ajax.getEpidemicAddTrend(params)
            .then(res => {
                if (res.code === 0) {
                    this.renderLine(['#ff8420', '#0dc4eb'], 'addTrendOption', res.data.content.charts[0].series);
                }
            })
    }
    /**
     * 累计确诊/疑似趋势
     */
    getEpidemicTotalTrend = (params) => {
        Ajax.getEpidemicTotalTrend(params)
            .then(res => {
                if (res.code === 0) {
                    this.renderLine(['#ff4949', '#a363c8'], 'totalTrendOption', res.data.content.charts[0].series);
                }
            })
    }
    /**
     * 累计确诊/疑似趋势
     */
    getEpidemicResultTrend = (params) => {
        Ajax.getEpidemicResultTrend(params)
            .then(res => {
                if (res.code === 0) {
                    this.renderLine(['#00ce27', '#939393'], 'resultTrendOption', res.data.content.charts[0].series);
                }
            })
    }
    /**
     * 渲染折线图
     * @param colors
     * @param name
     * @param data
     */
    renderLine = (colors, name, data) => {
        console.log(colors, name, data);
        let xAxisData = [],
            series = [],
            legend = [];
        if (data && data.length) {
            data[0].data.map(item => {
                xAxisData.push(item.name);
            });
            data.map(item => {
                legend.push(item.name);
                series.push({
                    name: item.name,
                    data: item.data,
                    type: 'line',
                    smooth: true,
                    symbol: 'circle'
                })
            });
        }
        this.setState({
            [name]: {
                color: colors,
                grid: {
                    top:40,
                    left: 40,
                    right: 0,
                    bottom: 40
                },
                legend: {
                    data: legend,
                    right:0,
                    top: 10,
                    icon: 'react',
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color: '#999',
                        fontSize: 10
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    formatter: (params) => {
                        let html = `<div style="text-align: left;font-size:12px;padding:0 5px;line-height: 18px">
                        <p style="margin:0;font-weight: bold">${params.length ? params[0].axisValue : ''}</p>`;
                        for (let i = 0; i < params.length; i++) {
                            html += `<p style="margin:0;">
                            ${params[i].seriesName}：${params[i].data.value}例
                        </p>`
                        }
                        html += '</div>'
                        return html
                    }
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd',
                            width: 1
                        }
                    },
                    axisLabel: {
                        fontSize: 10,
                        color: '#999',
                        rotate: 60
                    }
                },
                yAxis: {
                    name: '单位：例',
                    type: 'value',
                    nameTextStyle: {
                        fontSize: 10,
                        color:'#999'
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd',
                            width: 1
                        }
                    },
                    axisLabel: {
                        color: '#999',
                        fontSize: 10
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee',
                            width: 1
                        }
                    }
                },
                series: series
            }
        })
    }
    /**
     * 疫情最新进展
     */
    getEpidemicNews = (params) => {
        Ajax.getEpidemicNews(params)
        .then(res => {
            if (res.code === 0) {
                let data = res.data.content.pairsEx;
                if (data.length > 10) { 
                    data.length = 10;
                }
                this.setState({
                    newsList: data
                })
            }
        })
    }

    /**
     * 疫情速报列表
     */
    getEpidemicReport = (params) => {
        Ajax.getEpidemicReport(params)
        .then(res => {
            if (res.code === 0) {
                let data = res.data.content.blocks;
                if (data.length > 10) {
                    data.length = 10;
                }
                this.setState({
                    reportList: data
                })
            }
        })
    }
    /**
     * 疫情快速统计
     * @param params
     */
    reportStatistics = (params) => {
        Ajax.epidemicStatistics(params)
            .then(res => {
                if (res.code === 0) {
                    let data = res.data.content.blocksEx,
                        statistics = [];
                        statistics.push({
                            name: '新增确诊',
                            value: data.length && data[0].data &&  data[0].data.length > 1 ? data[0].data[1].value : 0
                        });
                        statistics.push({
                            name: '累计确诊',
                            value: data.length && data[0].data &&  data[0].data.length ? data[0].data[0].value : 0
                        })
                        statistics.push({
                            name: '治渝人数',
                            value: data.length > 2 &&  data[2].data.length ? data[2].data[0].value : 0
                        })
                        statistics.push({
                            name: '死亡人数',
                            value: data.length > 3 &&  data[3].data.length ? data[3].data[0].value : 0
                        })
                    this.setState({
                        reportStatistics: statistics
                    })
                }
            })
    }

    /**
     * 国内国外数据
     */
    epidemicDistribution = (number) => {
        Ajax.epidemicDistribution({
            regionType: number
        })
            .then(res => {
                if (res.code === 0) {
                    let datas = res.datas,
                        diffData = [],
                        diagnosis = 0,
                        die = 0;
                    if (number === 0) {
                        datas.map(item => {
                            diffData.push({
                                ...item,
                                checked: false
                            });
                            return diffData;
                        });
                        diffData[0].checked = true;
                        this.setState({
                            chinaList: diffData
                        })
                    } else {
                        datas.map(item => {
                            diagnosis += item.diagnosis;
                            die += item.die;
                        });
                        this.setState({
                            abroadList: datas,
                            abroad: {
                                diagnosis: diagnosis,
                                die: die
                            }
                        })
                    }
                }
            });
    }

    epidemicOfRegion = (params) => {
        Ajax.epidemicOfRegion(params)
            .then(res => {
                if (res.code === 0) {
                    // console.log(res);
                }
            })
    }

    slideChange = (index) => {
        let datas = this.state.chinaList;
        datas[index].checked = !datas[index].checked;
        this.setState({
            chinaList: datas
        })
    }
    

    render() {
        return (
            <div className="app">
                <header className="header">
                    <h1 className="title">新型肺炎疫情最新动态</h1>
                    <p className="source">数据来源:国家及各地卫健委每日信息发布</p>
                    <div className="bunner">
                        <img src={imgUrl} width="100%" />
                    </div>
                </header>
                <section className="main">
                    <div className="tab">
                        <div className="tab-hd">
                            {
                                this.state.tabs.map((item, index) => (
                                    <span
                                        key={index}
                                        onClick = {() => this.tabChange(item, index)}
                                        className={item.checked ? 'on' : ''}>
                                        {item.name}
                                    </span>
                                ))
                            }
                        </div>
                        <div className="tab-bd" style={{marginTop: '20px'}}>
                            {/*<p className="label">统计截至2020-02-04 08:52:56更新于9分钟前</p>*/}
                            <div className={this.state.tabs[0].checked ? 'blocks sc-blocks' : 'blocks'}>
                                {
                                    this.state.statistics.map((item, index) => (
                                        <div className="blocks-item" key={index}>
                                            <div className="blocks-title">{item.title}</div>
                                            <div className="blocks-bd">
                                                <p><strong>{item.total}</strong>人</p>
                                                <p>较昨日 {item.compare >=0 ? '+' : '-'}{item.add}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="map-wrapper">
                                <div className="map">
                                    <ReactEcharts
                                        style={{
                                            width: '90%',
                                            height: '90%',
                                            margin: '0 auto'
                                        }}
                                        /*onEvents={onEvents}*/
                                        option={this.state.mapOption ? this.state.mapOption : {}}
                                    ></ReactEcharts>
                                </div>
                                <ul className="labels">
                                    <li>10000人及以上</li>
                                    <li>1000-9999人</li>
                                    <li>500-999人</li>
                                    <li>100-499人</li>
                                    <li>10-99人</li>
                                    <li>1-9人</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        !this.state.tabs[0].checked ?
                        <div>
                            <div className="echars-box echars-box-1">
                                <div className="echars-box-hd">
                                    <h2>疫情新增趋势（人）</h2>
                                    <div className="legend">
                                        <span>新增确诊</span>
                                        <span>新增疑似</span>
                                    </div>
                                </div>
                                <div className="echars-box-bd">
                                    <ReactEcharts
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        /*onEvents={onEvents}*/
                                        option={this.state.addTrendOption ? this.state.addTrendOption : {}}
                                    ></ReactEcharts>
                                </div>
                            </div>
                            <div className="echars-box echars-box-2">
                                <div className="echars-box-hd">
                                    <h2>累计确诊/疑似趋势（人）</h2>
                                    <div className="legend">
                                        <span>累计确诊</span>
                                        <span>累计疑似</span>
                                    </div>
                                </div>
                                <div className="echars-box-bd">
                                    <ReactEcharts
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        /*onEvents={onEvents}*/
                                        option={this.state.totalTrendOption ? this.state.totalTrendOption : {}}
                                    ></ReactEcharts>
                                </div>
                            </div>
                            <div className="echars-box echars-box-3">
                                <div className="echars-box-hd">
                                    <h2>累计治愈/死亡趋势（人）</h2>
                                    <div className="legend">
                                        <span>累计治愈</span>
                                        <span>累计死亡</span>
                                    </div>
                                </div>
                                <div className="echars-box-bd">
                                    <ReactEcharts
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        /*onEvents={onEvents}*/
                                        option={this.state.resultTrendOption ? this.state.resultTrendOption : {}}
                                    ></ReactEcharts>
                                </div>
                            </div>
                        </div> : null
                    }
                    <div className="city-tab">
                        <div className="city-tab-hd">
                            <span className="tab-name">{this.state.cityName}</span>疫情速报
                            <div className="city-change" style={{display:'none'}}>
                                切换省市
                                <select id="select-area">
                                    {
                                        this.state.provinces.map((item, index) => (
                                            <option value={index} key={index}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="tab-box">
                            {
                                this.state.reportStatistics.map((item, index) => (
                                    <div className="tab-item" key={index}>
                                        <div className="number">{item.value}</div>
                                        <div className="text">{item.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <ul className="tab-text">
                            {
                                this.state.reportList ? this.state.reportList.map((item, index) => (
                                    <li className="tab-item" key={index}>{item.value}</li>
                                )) : null
                            }
                        </ul>
                    </div>
                    <div className="china-list">
                        <div className="china-list-hd">
                            <h2>国内病例</h2>
                            <p className="label">7:00-10:00为更新高峰，数据如有滞后请谅解</p>
                        </div>
                        <div className="china-list-bd">
                            <div className="table-thead">
                                <div className="address">地区</div>
                                <div className="add">新增确诊</div>
                                <div className="confirm">累计确诊</div>
                                <div className="heal">治愈</div>
                                <div className="dead">死亡</div>
                            </div>
                            <div className="table-tbody">
                                {
                                    this.state.chinaList.map((item, index) => (
                                        <div
                                        onClick={() => this.slideChange(index)}
                                        className={`tr ${item.checked ? 'on' : ''} ${!item.cityData.length ? 'no-up' : ''}`}
                                        key={index}>
                                            <div style={{padding: '0 .32rem'}}>
                                            <div className="address">{item.regionName}</div>
                                            <div className="add">{item.newDiagnosis}</div>
                                            <div className="confirm">{item.diagnosis}</div>
                                            <div className="heal">{item.cure}</div>
                                            <div className="dead">{item.die}</div>
                                            </div>
                                            {
                                                item.cityData && item.cityData.length ? item.cityData.map((a, b) => (
                                                    <div className="tr" key={b} style={{display: (item.checked ? 'block' : 'none'), padding: '0 .32rem'}}>
                                                        <div className="address">{a.regionName}</div>
                                                        <div className="add">{a.newDiagnosis}</div>
                                                        <div className="confirm">{a.diagnosis}</div>
                                                        <div className="heal">{a.cure}</div>
                                                        <div className="dead">{a.die}</div>
                                                    </div>
                                                )) : null
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="china-list abroad-list">
                        <div className="china-list-hd">
                            <h2>海外国家<span style={{fontWeight: 'normal', fontSize: 14, paddingLeft: 10}}>确诊{this.state.abroad.diagnosis}例 死亡{this.state.abroad.die}例</span></h2>
                        </div>
                        <div className="china-list-bd">
                            <div className="table-thead">
                                <div className="address">地区</div>
                                <div className="add">新增确诊</div>
                                <div className="confirm">累计确诊</div>
                                <div className="heal">治愈</div>
                                <div className="dead">死亡</div>
                            </div>
                            <div className="table-tbody">
                                {
                                    this.state.abroadList.map((item, index) => (
                                        <div
                                        style={{padding: '0 .32rem'}}
                                        className="tr"
                                        key={index}>
                                            <div className="address">{item.region}</div>
                                            <div className="add">{item.newDiagnosis}</div>
                                            <div className="confirm">{item.diagnosis}</div>
                                            <div className="heal">{item.cure}</div>
                                            <div className="dead">{item.die}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="news">
                        <h2 className="news-hd">
                            最新进展
                        </h2>
                        <ul className="news-list">
                            {
                                this.state.newsList.length ? this.state.newsList.map((item, index) => (
                                    <li className="news-item" key={index}>
                                        <div className="time">{item.data[0].value}</div>
                                        <h3 className="title">{item.title}</h3>
                                        <p>{item.data[1].value}</p>
                                        <p>{item.data[2].value}</p>
                                    </li>
                                )) : null
                            }
                            
                        </ul>
                    </div>
                    <div className="medical-care">
                        <h2 className="medical-care-hd">医疗救治医院查询</h2>
                        <div className="medical-care-list">
                            {
                                this.state.hospital.map((item, index) => (
                                    <Link to={{
                                        pathname: '/hospital-detail',
                                        state: {
                                            region: item.region,
                                            name: item.name
                                        }
                                    }} 
                                    replace className="medical-care-item" key={index}>
                                        <span className="city">{item.name}</span>
                                        <span className="number">{item.total}家</span>
                                        <span className="check">查看</span>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </section>
                <footer className="footer">技术支持：四川省文化和旅游大数据工程技术研究中心</footer>
            </div>
        )
    }
}

export default Home;
