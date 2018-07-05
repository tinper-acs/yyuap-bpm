/**
 * bpm 收回流程按钮
 */
import React, { Component } from 'react';
import { Button, Message } from 'tinper-bee';
import { onRecall } from './common';
import PropTypes from 'prop-types';

const propTypes = {
    checkedArray: PropTypes.array,
    text: PropTypes.string,
    url: PropTypes.string,
    data: PropTypes.array,
    className: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onStart: PropTypes.func
};

class BpmButtonRecall extends Component {
    constructor() {
        super();
    }
    handlerBtn = async () => {
        let errFlag = false;
        let { checkedArray, data, onStart, onSuccess, onError } = this.props;
        if (onStart) {
            onStart();
        }
        let recallArray = [];
        for (let i = 0; i < checkedArray.length; i++) {
            if (checkedArray[i].bpmState != 0) {
                recallArray.push({ "id": checkedArray[i].id });
                errFlag = false;
            } else {
                onError && onError({
                    type: 1,
                    msg: `单据未提交,不能执行撤回操作`
                });
                errFlag = true;
            }
        }
        if (errFlag) {
            return;
        }
        if (recallArray.length > 0) {
            let { data: { success, detailMsg } } = await onRecall(this.props.url, recallArray);
            if (success != 'fail_global') {
                onSuccess && onSuccess();
            } else {
                onError && onError({
                    type : 2,
                    msg : `单据撤回失败`
                });
            }
        } else {
            // 弹出提示请选择数据
            onError && onError({
                type : 1,
                msg : `请选择单据才能撤回`
            });
        }
    }
    render() {
        let { text } = this.props;
        return (
            <Button className={this.props.className} size="sm" onClick={this.handlerBtn} colors="primary">{text}</Button>
        );
    }
}
BpmButtonRecall.propTypes = propTypes;
BpmButtonRecall.defaultProps = {
    checkedArray: [],
    text: "收回",
    url: "/example/ygdemo_yw_info/unsubmit",
    data: [],
    className: ""
}
export default BpmButtonRecall;
