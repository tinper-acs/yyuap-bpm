/**
 * bpm 收回流程按钮
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { onRecall } from './common';

const propTypes = {
    checkedArray: PropTypes.array,
    url: PropTypes.string,
    data: PropTypes.array,
    className: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onStart: PropTypes.func,
    onEnd: PropTypes.func
};

class BpmButtonRecall extends Component {
    constructor() {
        super();
    }
    /**
     * 收回操作事件
     */
    handlerBtn = async () => {
        let { checkedArray, onStart, onEnd, onSuccess, onError } = this.props;
        let recallArray = [];

        //检查只能一条单据提交流程
        if (checkedArray.length >= 2) {
            onError && onError({
                type: 2,
                msg: `请选择单条数据收回`
            });
            return;
        }
        //操作数据至少有一个
        if (checkedArray.length > 0) {
            if (checkedArray[0].bpmState != 0 && checkedArray[0].bpmState != null) {
                recallArray.push({ id: checkedArray[0].id });
            } else {
                onError && onError({
                    type: 1,
                    msg: `流程没有启动无法撤回`
                });
            }
        } else {
            // 弹出提示请选择数据
            onError && onError({
                type: 1,
                msg: `请选择单据才能撤回`
            });
            return;
        }
        if (recallArray.length > 0) {
            onStart && onStart();
            let { data: { success, detailMsg } } = await onRecall(this.props.url, recallArray);
            if (detailMsg.data['success'] && detailMsg.data.success == 'success') {
                onSuccess && onSuccess();
            } else {
                onError && onError({
                    type: 2,
                    msg: detailMsg.data.message
                });
            }
        }
    }
    render() {
        return (<span onClick={this.handlerBtn}>
            {
                this.props.children
            }
        </span>);
    }
}
BpmButtonRecall.propTypes = propTypes;
BpmButtonRecall.defaultProps = {
    checkedArray: [],
    url: "/example/ygdemo_yw_info/unsubmit",
    data: [],
    className: ""
}
export default BpmButtonRecall;
