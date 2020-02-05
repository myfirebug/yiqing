/*
 * @Author: hejp
 * @Date:   15:21
 * @Last Modified by:   hejp
 * @Last Modified time: 15:21
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
// 绑定事件
const bindEvent = (element, type, handler) => {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element['on' + type] = handler;
    }
}
// 解除绑定事件
const unbind = (element, type, handler) => {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);
    } else {
        element['on' + type] = null;
    }
}

class ReactEcharts extends Component {
    constructor(props) {
        super(props);
        // echarts
        this.echartsInstance = window.echarts;
        // 挂载echats的dom
        this.echartsElement = null;
        // echarts实例
        this.echartsObj = null;
        // timmer
        this.timmer = null;

    }

    componentDidMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    // 改变窗口大小
    resizeFn = () => {
        this.echartsObj.resize();
    }
    // 清空定时器
    clearTimmer = () => {
        if (this.timmer) {
            clearInterval(this.timmer);
        }
    }
    // 更新组件
    componentDidUpdate() {
        // this.dispose();
        this.init();
    }
    // 是否自动播放
    isPlay = () => {
        let option = this.props.option,
            len = option
            && option.series
            && option.series.length
            && option.series[0].data ?
                option.series[0].data.length : 0;
        if (len) {
            this.autoPlay(len);
        }
        return len
    }
    /**
     * 自动播放
     * @param len
     */
    autoPlay = (len) => {
        let index = 0;
        if (this.timmer) {
            clearInterval(this.timmer);
        }
        if (this.echartsObj && this.props.tooltip && this.props.tooltip.show) {
            if (!this.props.tooltip.speed) {
                return false
            }
            this.timmer = setInterval(() => {
                this.echartsObj.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: index
                });
                index++;
                if (index >= len) {
                    index = 0;
                }
            }, this.props.tooltip && this.props.tooltip.speed ? this.props.tooltip.speed : 2000)
        }
    }
    // 销毁组件
    componentWillUnmount() {
        this.dispose();
    }
    // 销毁组件方法
    dispose = () => {
        if (this.echartsElement) {
            this.echartsInstance.dispose(this.echartsElement);
        }
        if (this.timmer) {
            clearInterval(this.timmer);
        }
        unbind(window, 'resize', this.resizeFn);
    }
    // 初始化组件
    init = () => {
        this.echartsObj = null;
        const echartsObj = this.echartsInstance.getInstanceByDom(this.echartsElement)
            || this.echartsInstance.init(this.echartsElement, this.props.theme),
            onEvents = this.props.onEvents || {};
        this.echartsObj = echartsObj;
        if (this.props.option) {
            unbind(window, 'resize', this.resizeFn);
            if (this.props.tooltip && this.props.tooltip.show) {
                unbind(this.echartsElement, 'mouseover', this.clearTimmer);
                unbind(this.echartsElement, 'mouseout', this.isPlay);
                bindEvent(this.echartsElement, 'mouseover', this.clearTimmer);
                bindEvent(this.echartsElement, 'mouseout', this.isPlay);
            }
            // 事件绑定
            this.bindEvents(echartsObj, onEvents);
            // 绑定window的resize
            bindEvent(window, 'resize', this.resizeFn);
            echartsObj.setOption(this.props.option, true);
        } else {
            alert('请传入echarts配置项');
        }
    }
    /**
     * 事件
     * @param instance echarts实例
     * @param events echarts事件
     */
    bindEvents = (instance, events) => {
        const loopEvent = (eventName) => {
            if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
                instance.off(eventName);
                instance.on(eventName, (param) => {
                    events[eventName](param, instance);
                });
            }
        }
        for (const eventName in events) {
            if (Object.prototype.hasOwnProperty.call(events, eventName)) {
                loopEvent(eventName);
            }
        }
    }
    render() {
        let len = this.isPlay();
        const style = this.props.style || {
            height: '100%',
            width: '100%'
        }
        return (
            <div
                ref={(e) => (this.echartsElement = e)}
                style={style}
                className={!len ? 'echarts-no-data ' : '' + this.props.className}
            >
            </div>
        );
    }
}

ReactEcharts.propTypes = {
    // 图标的配置项
    option: PropTypes.object.isRequired,
    // 内链样式
    style: PropTypes.object,
    // 样式名
    className: PropTypes.string,
    // 主题暂无未封装
    theme: PropTypes.string,
    // 事件
    onEvents: PropTypes.object,
    // 提示
    tooltip: PropTypes.object
};
ReactEcharts.defaultProps = {
    style: {height: '400px'},
    className: '',
    tooltip: {
        show: true,
        speed: 3000
    }
}
export default ReactEcharts;
