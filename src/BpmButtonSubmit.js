/**
 * bpm 提交流程按钮
 */
import React, { Component } from 'react';
import { Row, Col, Button, Message } from 'tinper-bee';
import { queryBpmTemplateAllocate, onCommit, reconvert } from './common';
import PropTypes from 'prop-types';
const propTypes = {
    checkedArray: PropTypes.array,
    text: PropTypes.string,
    funccode: PropTypes.string,
    nodekey: PropTypes.string,
    url: PropTypes.string,
    data: PropTypes.array,
    className: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onStart: PropTypes.func
};

class BpmButtonSubmit extends Component {
    constructor() {
        super();
    }
    handlerBtn = async () => {
        let errFlag = false;
        let { checkedArray, data, onStart, onSuccess, onError } = this.props;
        if (onStart) {
            onStart();
        }
        let submitArray = [];
        for (let i = 0; i < checkedArray.length; i++) {
            if (checkedArray[i].bpmState == null || checkedArray[i].bpmState == 0) {
                submitArray.push({ "id": checkedArray[i].id });
                errFlag = false;
            } else {
                errFlag = true;
                onError && onError({
                    type: 1,
                    msg: `单据 ${checkedArray[i].id} 不能重复提交`
                });
            }
        }
        if (errFlag) {
            return;
        }
        if (submitArray.length > 0) {
            let { data: { success, detailMsg } } = await queryBpmTemplateAllocate({
                funccode: this.props.funccode,
                nodekey: this.props.nodekey
            });
            if (success == "success") {
                let commitParam = {
                    "url": this.props.url,
                    "processDefineCode": detailMsg["data"]["res_code"],
                    "submitArray": submitArray
                }
                //commit提交后，返回success状态显示fail_global
                let result = await onCommit(commitParam);
                let flag = result["data"]["success"];
                if (flag == "success") {
                    //正确
                    onSuccess && onSuccess();
                } else {
                    onError && onError({
                        type: 2,
                        msg: `流程启动失败`
                    });
                }
            } else if (success == "fail_global") {
                let { data: { message } } = result
                //错误
                onError && onError({
                    type: 2,
                    msg: `流程启动失败`
                });
            }
        } else {
            // 弹出提示请选择数据
            onError && onError({
                type: 1,
                msg: `请选择提交的单据`
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
BpmButtonSubmit.propTypes = propTypes;
BpmButtonSubmit.defaultProps = {
    checkedArray: [],
    text: "提交",
    nodekey: "003",
    url: "/example/ygdemo_yw_info/submit",
    data: [],
    className: ""
}
export default BpmButtonSubmit;
