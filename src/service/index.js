/*
 * @Author: hejp
 * @Date:   19:27
 * @Last Modified by:   hejp
 * @Last Modified time: 19:27
 */
import {get} from './fetch'

const api = {
    // 获取地图数据
    map(url, params) {
        return get(`${url}.json`, params, 'map')
    },
    // 疫情地域分析
    epidemicMap(params) {
        return get('rest/epidemic/epidemicMap', params, 'other')
    },
    // 疫情新增趋势
    getEpidemicAddTrend(params) {
        return get('rest/epidemic/getEpidemicAddTrend', params, 'other')
    },
    // 累计确诊/疑似趋势
    getEpidemicTotalTrend(params) {
        return get('rest/epidemic/getEpidemicTotalTrend', params, 'other')
    },
    // 累计治愈/死亡趋势
    getEpidemicResultTrend(params) {
        return get('rest/epidemic/getEpidemicResultTrend', params, 'other')
    },
    // 累计治愈/死亡趋势
    epidemicStatistics(params) {
        return get('rest/epidemic/epidemicStatistics', params, 'other')
    },
    // 疫情救治医院查询
    getEpidemicHospital(params) {
        return get('rest/epidemic/getEpidemicHospital', params, 'other')
    },
    // 疫情救治医院查询详情
    getEpidemicHospitalDetail(params) {
        return get('/rest/epidemic/getEpidemicHospitalDetail', params, 'other')
    },
    // 疫情最新进展
    getEpidemicNews(params) {
        return get('/rest/epidemic/getEpidemicNews', params, 'other')
    },
    // 疫情速报
    getEpidemicReport(params) {
        return get('rest/epidemic/getEpidemicReport', params, 'other')
    },
    // 地区疫情情况
    epidemicOfRegion(params) {
        return get('rest/epidemic/epidemicOfRegion', params, 'other')
    },
    // 国内国外
    epidemicDistribution(params) {
        return get('rest/epidemic/epidemicDistribution', params, 'other')
    }
    

}

export default api
