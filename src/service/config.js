/*
 * @Author: hejp
 * @Date:   19:20
 * @Last Modified by:   hejp
 * @Last Modified time: 19:20
 */
const config = {
    // 开发环境
    development: {
        map: 'http://filealiyun.geeker.com.cn/ued/map/regionJson/',
        other: 'http://business-dc.hzcloud.daqsoft.com/api/',
        /*other: 'http://192.168.0.38:8010/',*/
        test: ''
    },
    // 测试环境
    production: {
        map: 'http://filealiyun.geeker.com.cn/ued/map/regionJson/',
        other: 'http://business-dc.hzcloud.daqsoft.com/api/',
        test: ''
    }
}
export default config
