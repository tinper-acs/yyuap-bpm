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
        let { checkedArray, data, onStart } = this.props;
        if (onStart) {
            onStart();
        }
        let recallArray = [];
        for (let i = 0; i < checkedArray.length; i++) {
            if (checkedArray[i]) {
                if (data[i]["status"] == 1) {
                    recallArray.push({ "id": data[i]["id"] });
                } else {
                    Message.create({ content: `单据${data[i]["code"]}未提交,不能执行撤回操作`, color: 'danger', position: 'top' });
                }
            }
        }
        if (recallArray.length > 0) {
            let { data: { success, detailMsg } } = await onRecall(this.props.url, recallArray);
            if (success) {
                Message.create({ content: detailMsg.data.message, color: 'info', position: 'top' });
            } else {
                Message.create({ content: message, color: 'danger', position: 'top' });
            }
        } else {
            // 弹出提示请选择数据
            Message.create({ content: `请选择撤回`, color: 'info', position: 'top' });
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
