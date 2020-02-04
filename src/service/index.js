/*
 * @Author: hejp
 * @Date:   19:27
 * @Last Modified by:   hejp
 * @Last Modified time: 19:27
 */
import { get, post } from './fetch'

const api = {
    test(params) {
        return get('test', params, 'test')
    },
    test1(params) {
        return post('test', params, 'test')
    }
}

export default api
