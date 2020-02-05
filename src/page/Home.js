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
let isIOS = navigator.userAgent.match(/iphone|ipod|ipad|android/gi);
let dpr = isIOS ? Math.min(window.devicePixelRatio, 3) : 1;

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
            hospital: []
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
        // 疫情新增趋势
        this.getEpidemicAddTrend();
        // 累计确诊/疑似趋势
        this.getEpidemicTotalTrend();
        // 累计治愈/死亡趋势
        this.getEpidemicResultTrend();
        // 疫情救治医院查询
        this.getEpidemicHospital();
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
                    tabs[i].checked = true
                } else {
                    tabs[i].checked = false
                }
            }
            this.epidemicMap({
                region: item.region
            });
            this.epidemicStatistics({
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
    getEpidemicHospital = () => {
        Ajax.getEpidemicHospital({
            region: '100000'
        })
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
                if (res.code === 0) {
                    let data = res.data.content.blocksEx,
                        statistics = [];
                    data.map((item) => {
                        statistics.push({
                            title: item.title,
                            total: item.data.length ? item.data[0].value : 0,
                            add: item.data.length ? item.data[1].value : 0
                        });
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
                                return `<div style="padding:0 .1rem;line-height:.36rem">
                                             <p style="margin:0;padding:0;font-size:.24rem;font-weight: bold">
                                                ${a.name}
                                             </p>
                                             <p style="margin:0;padding:0;;font-size:.24rem">
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
                                        color: '#000'
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
    getEpidemicAddTrend = () => {
        Ajax.getEpidemicAddTrend()
            .then(res => {
                if (res.code === 0) {
                    this.renderLine(['#ff8420', '#0dc4eb'], 'addTrendOption', res.data.content.charts[0].series);
                }
            })
    }
    /**
     * 累计确诊/疑似趋势
     */
    getEpidemicTotalTrend = () => {
        Ajax.getEpidemicTotalTrend()
            .then(res => {
                if (res.code === 0) {
                    this.renderLine(['#ff4949', '#a363c8'], 'totalTrendOption', res.data.content.charts[0].series);
                }
            })
    }
    /**
     * 累计确诊/疑似趋势
     */
    getEpidemicResultTrend = () => {
        Ajax.getEpidemicResultTrend()
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
        let xAxisData = [],
            series = [];
        if (data && data.length) {
            data[0].data.map(item => {
                xAxisData.push(item.name);
            });
            data.map(item => {
                series.push({
                    name: item.name,
                    data: item.data,
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6 * dpr,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2 * dpr
                            }
                        }
                    }
                })
            });
        }
        this.setState({
            [name]: {
                color: colors,
                grid: {
                    right: 0
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    formatter: (params) => {
                        let html = `<div style="text-align: left;font-size:.24rem;padding:0 .1rem;line-height: .36rem">
                        <p style="margin:0;font-weight: bold">${params.length ? params[0].axisValue : ''}</p>`;
                        for (let i = 0; i < params.length; i++) {
                            html += `<p style="margin:0;">
                            ${params[i].seriesName}：${params[i].data.value}次
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
                        color: '#999',
                        fontSize: 12 * dpr
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd',
                            width: 1
                        }
                    },
                    axisLabel: {
                        color: '#999',
                        fontSize: 12 * dpr
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

    render() {
        return (
            <div className="app">
                <header className="header">
                    <h1 className="title">新型肺炎疫情最新动态</h1>
                    <p className="source">数据来源:国家及各地卫健委每日信息发布</p>
                    <div className="bunner"></div>
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
                        <div className="tab-bd" style={{marginTop: '.4rem'}}>
                            {/*<p className="label">统计截至2020-02-04 08:52:56更新于9分钟前</p>*/}
                            <div className="blocks">
                                {
                                    this.state.statistics.map((item, index) => (
                                        <div className="blocks-item" key={index}>
                                            <div className="blocks-title">{item.title}</div>
                                            <div className="blocks-bd">
                                                <p><strong>{item.total}</strong>人</p>
                                                <p>较昨日 +{item.add}</p>
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
                    <div className="echars-box echars-box-1">
                        <div className="echars-box-hd">
                            <h2>疫情新增趋势（人）</h2>
                            <div className="legend">
                                <span>新增确认</span>
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
                                <span>累计确认</span>
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
                    <div className="city-tab">
                        <div className="city-tab-hd">
                            <span className="tab-name">四川</span>疫情速报
                            <div className="city-change">
                                切换省市
                                <select id="select-area">
                                    <option value="hb">切换城市</option>
                                    <option value="hb">湖北</option>
                                    <option value="zj">浙江</option>
                                    <option value="gd">广东</option>
                                    <option value="henan">河南</option>
                                    <option value="hn">湖南</option>
                                    <option value="ah">安徽</option>
                                    <option value="jiangxi">江西</option>
                                    <option value="cq">重庆</option>
                                    <option value="jiangsu">江苏</option>
                                    <option value="cd">四川</option>
                                    <option value="sd">山东</option>
                                    <option value="bj">北京</option>
                                    <option value="sh">上海</option>
                                    <option value="fj">福建</option>
                                    <option value="heilongjiang">黑龙江</option>
                                    <option value="xian">陕西</option>
                                    <option value="guangxi">广西</option>
                                    <option value="hebei">河北</option>
                                    <option value="yn">云南</option>
                                    <option value="hainan">海南</option>
                                    <option value="ln">辽宁</option>
                                    <option value="shanxi">山西</option>
                                    <option value="tj">天津</option>
                                    <option value="guizhou">贵州</option>
                                    <option value="gansu">甘肃</option>
                                    <option value="jilin">吉林</option>
                                    <option value="neimenggu">内蒙古</option>
                                    <option value="ningxia">宁夏</option>
                                    <option value="xinjiang">新疆</option>
                                    <option value="hk">香港</option>
                                    <option value="qinghai">青海</option>
                                    <option value="macau">澳门</option>
                                    <option value="taiwan">台湾</option>
                                    <option value="xizang">西藏</option>
                                </select>
                            </div>
                        </div>
                        <div className="tab-box">
                            <div className="tab-item">
                                <div className="number">213</div>
                                <div className="text">新增确诊</div>
                            </div>
                            <div className="tab-item">
                                <div className="number">213</div>
                                <div className="text">累计确诊</div>
                            </div>
                            <div className="tab-item">
                                <div className="number">213</div>
                                <div className="text">治愈人数</div>
                            </div>
                            <div className="tab-item">
                                <div className="number">213</div>
                                <div className="text">死亡人数</div>
                            </div>
                        </div>
                        <ul className="tab-text">
                            <li className="tab-item">快讯最新!四川新型冠状病毒肺炎确诊282例，其中成都87例</li>
                            <li className="tab-item">快讯最新!四川新型冠状病毒肺炎确诊282例，其中成都87例</li>
                            <li className="tab-item">快讯最新!四川新型冠状病毒肺炎确诊282例，其中成都87例</li>
                            <li className="tab-item">快讯最新!四川新型冠状病毒肺炎确诊282例，其中成都87例</li>
                        </ul>
                    </div>
                    <div className="china-list">
                        <div className="china-list-hd">
                            <h2>国内病例</h2>
                            <span className="label">(7:00-10:00为更新高峰，数据如有滞后请谅解)</span>
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
                                <div className="tr on">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                                <div className="tr">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                                <div className="tr">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                                <div className="tr">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                                <div className="tr">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="china-list abroad-list">
                        <div className="china-list-hd">
                            <h2>海外国家</h2>
                            <span className="label">确诊159例 死亡1例</span>
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
                                <div className="tr on">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                                <div className="tr">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                                <div className="tr">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                                <div className="tr">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                                <div className="tr">
                                    <div className="address">四川</div>
                                    <div className="add">123</div>
                                    <div className="confirm">12</div>
                                    <div className="heal">12</div>
                                    <div className="dead">1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="news">
                        <h2 className="news-hd">
                            最新进展
                        </h2>
                        <ul className="news-list">
                            <li className="news-item">
                                <div className="time">2-04 12:05</div>
                                <h3 className="title">支付清算行业抗击肺炎疫情九大举措贡献力量</h3>
                                <p>新型冠状病毒感染的肺炎疫情发生以来，习近平总书记高度重视，亲自指挥，亲自部署，做出一系列重要指示。疫情就是命令，防控就是责任。我国支付清算行业认真贯彻党中央、国务院部署，践行“支付为民”初心，快速响应疫情防控要求，主动承担社会责任，为人民群众日常支付服务畅通、境内外救援和捐赠资金及时划拨到位、社会资</p>
                            </li>
                        </ul>
                    </div>
                    <div className="medical-care">
                        <h2 className="medical-care-hd">医疗救治医院查询</h2>
                        <div className="medical-care-list">
                            {
                                this.state.hospital.map((item, index) => (
                                    <Link to={{
                                        pathname: '/hospital-detail',
                                    }} className="medical-care-item" key={index}>
                                        <span className="city">{item.name}</span>
                                        <span className="number">{item.total}家</span>
                                        <span className="check">查看</span>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;
