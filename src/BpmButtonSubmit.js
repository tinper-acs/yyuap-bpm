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
        let { checkedArray, data, onStart } = this.props;
        if (onStart) {
            onStart();
        }
        let submitArray = [];
        // for (var i = 0; i < checkedArray.length; i++) {
        //     if (checkedArray[i]) {
        //         if (data[i]["status"] == 0) {
        //             submitArray.push({ "id": data[i]["id"] });
        //         } else {
        //             Message.create({ content: `单据${data[i]["code"]}不能重复提交`, color: 'danger', position: 'top' });
        //             if (this.props.onError) {
        //                 this.props.onError();
        //             }
        //         }
        //     }
        // }
        for (let i = 0; i < checkedArray.length; i++) {
            if (checkedArray[i].bpmState == null || checkedArray[i].bpmState == 0) {
                submitArray.push({ "id": checkedArray[i].id });
            } else {
                Message.create({ content: `单据不能重复提交`, color: 'danger', position: 'top' });
                if (this.props.onError) {
                    this.props.onError();
                }
            }
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
                    //Message.create({ content: `单据提交操作成功`, color: 'success', position: 'top' });
                    if (this.props.onSuccess) {
                        this.props.onSuccess();
                    }
                } else {
                    // Message.create({ content: reconvert(result.data.message), color: 'danger', position: 'top' });
                    if (this.props.onError) {
                        this.props.onError();
                    }
                }
            } else if (success == "fail_global") {
                let { data: { message } } = result
                //错误
                // Message.create({ content: message, color: 'danger', position: 'top' });
                if (this.props.onError) {
                    this.props.onError();
                }
            }
        } else {
            // 弹出提示请选择数据
            Message.create({ content: `请选择提交的单据`, color: 'info', position: 'top' });
            this.props.onError && this.props.onError();
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
