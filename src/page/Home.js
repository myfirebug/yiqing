/*
 * @Author: hejp
 * @Date:   18:05
 * @Last Modified by:   hejp
 * @Last Modified time: 18:05
 */
import React, {Component} from 'react';
import Ajax from '../service'

class Home extends Component {
    constructor (props) {
        super(props);
    }
    componentDidMount () {
        Ajax.test()
            .then(() => {})
            .catch((e) => {
                alert(console.log(e));
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
                        <div className="tab-hd"><span className="on">四川</span><span>全国</span></div>
                        <div className="tab-bd">
                            <p className="label">统计截至2020-02-04 08:52:56更新于9分钟前</p>
                            <div className="blocks">
                                <div className="blocks-item">
                                    <div className="blocks-title">四川确诊</div>
                                    <div className="blocks-bd">
                                        <p>282人</p>
                                        <p>较上日 +3266</p>
                                    </div>
                                </div>
                                <div className="blocks-item">
                                    <div className="blocks-title">新增确认</div>
                                    <div className="blocks-bd">
                                        <p>282人</p>
                                        <p>较上日 +3266</p>
                                    </div>
                                </div>
                                <div className="blocks-item">
                                    <div className="blocks-title">治愈人数</div>
                                    <div className="blocks-bd">
                                        <p>282人</p>
                                        <p>较上日 +3266</p>
                                    </div>
                                </div>
                                <div className="blocks-item">
                                    <div className="blocks-title">死亡人数</div>
                                    <div className="blocks-bd">
                                        <p>282人</p>
                                        <p>较上日 +3266</p>
                                    </div>
                                </div>
                            </div>
                            <div className="map-wrapper">
                                <div className="map"></div>
                                <ul className="labels">
                                    <li>10000人及以上</li>
                                    <li>1000-9999人</li>
                                    <li>500-999人</li>
                                    <li>100-499人</li>
                                    <li>50-99人</li>
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
                        <div className="echars-box-bd"></div>
                    </div>
                    <div className="echars-box echars-box-2">
                        <div className="echars-box-hd">
                            <h2>累计确诊/疑似趋势（人）</h2>
                            <div className="legend">
                                <span>累计确认</span>
                                <span>累计疑似</span>
                            </div>
                        </div>
                        <div className="echars-box-bd"></div>
                    </div>
                    <div className="echars-box echars-box-3">
                        <div className="echars-box-hd">
                            <h2>累计治愈/死亡趋势（人）</h2>
                            <div className="legend">
                                <span>累计治愈</span>
                                <span>累计死亡</span>
                            </div>
                        </div>
                        <div className="echars-box-bd"></div>
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
                                <div className="time">2-04  12:05</div>
                                <h3 className="title">支付清算行业抗击肺炎疫情九大举措贡献力量</h3>
                                <p>新型冠状病毒感染的肺炎疫情发生以来，习近平总书记高度重视，亲自指挥，亲自部署，做出一系列重要指示。疫情就是命令，防控就是责任。我国支付清算行业认真贯彻党中央、国务院部署，践行“支付为民”初心，快速响应疫情防控要求，主动承担社会责任，为人民群众日常支付服务畅通、境内外救援和捐赠资金及时划拨到位、社会资</p>
                            </li>
                        </ul>
                    </div>
                    <div className="medical-care">
                        <h2 className="medical-care-hd">医疗救治医院查询</h2>
                        <ul className="medical-care-list">
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                            <li className="medical-care-item">
                                <span className="city">成都</span>
                                <span className="number">316家</span>
                                <span className="check">查看</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;
