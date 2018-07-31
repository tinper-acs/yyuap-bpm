/**
 * bpm流程任务审批组件
 */

import React, { Component } from 'react';
import { Radio, Row, Col, Button, Modal, Message, Table } from 'tinper-bee';
import createModal from 'yyuap-ref';
import refOptions from './refOptions';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getBpmTaskURL, sendBpmTaskAJAX, approvetypeToText } from './common';

const propTypes = {
    host: PropTypes.string,
    id: PropTypes.string,
    appType: PropTypes.string,
    onBpmFlowClick: PropTypes.func,
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};

class BpmTaskApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvetype: "agree",
            comment: "审批同意",
            processDefinitionId: props.processDefinitionId,
            processInstanceId: props.processInstanceId,
            taskId: props.id,
            activityId: "markerbill",
            rejectToActivityShow: false,
            rejectlist: [],
            selectedRow: [],
            userIds: [],
            userId: null,
            HuoDongID: "",//新版活动ID
            HuoDongName: ""//新版活动名字
        }
        //驳回到环节的Modal-Table
        this.rejectToActivityCol = [{
            title: "活动编码",
            dataIndex: "activityId",
            key: "activityId",
            width: "40%"
        },
        {
            title: "活动名称",
            dataIndex: "activityName",
            key: "activityName",
            width: "30%"
        }]
    }
    componentWillMount = () => {
        //通过billID获得processDefinitionId,processInstanceId
        // let pID = await billidToIds('f39234a2-ed92-473f-b7c1-45f71559facb');
    }
    componentDidMount = () => {
        //传入类型是弃审，那么直接设置2
        if (this.props.appType == "2") {
            this.setState({
                approvetype: "withdraw"
            });
        }
    }

    //选择审批的类型
    handleChange = (value) => {
        this.setState({ approvetype: value, comment: approvetypeToText(value) });
    }
    //绑定审批意见
    handlerCommentChange = (e) => {
        this.setState({ comment: e.target.value });
    }
    //审批提交
    handlerSubmitBtn = async () => {
        let { onStart, onEnd, onSuccess, onError } = this.props;
        if (this.state.comment == "") {
            Message.create({ content: '不能为空', color: 'danger', position: 'top' });
            return;
        }
        onStart && onStart();
        //第一次请求审批，有的是直接一次请求，有的需要二次请求
        let result = await sendBpmTaskAJAX(this.state.approvetype, this.state);
        //检测需要二次请求并弹出Modal审批
        switch (this.state.approvetype) {
            case 'agree'://同意
            case 'unagree'://不同意
                //普通同意操作，没有后续操作，直接成功
                if (result.data.flag == 'success') {
                    Message.create({ content: result.data.msg, color: 'info', position: 'top' });
                    onSuccess && onSuccess();
                } else if (result.data.flag == 'faile') {
                    Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                    onError && onError({
                        type: 2,
                        msg: result.data.msg
                    });
                }
                //普通同意操作，有后续操作，有加签人员判断
                if (result.data.assignAble) {
                    //判断是否有最新的活动id和name
                    if (result.data.assignList.length > 0) {
                        this.setState({
                            HuoDongID: result.data.assignList[0].activityId,
                            HuoDongName: result.data.assignList[0].activityName
                        });
                    }
                    // onStart && onStart();
                    //可以是加签操作，拉取加签请求
                    onEnd && onEnd();
                    //配置参照需要参数
                    var options = Object.assign(JSON.parse(refOptions), {
                        title: '人员选择',
                        backdrop: false,
                        hasPage: true,
                        refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
                        isRadio: false,
                        className: '',
                        param: {//url请求参数
                            refCode: 'newuser',
                            tenantId: '',
                            sysId: '',
                            transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                        },
                        //选择中的数据
                        keyList: [],
                        //保存回调sels选中的行数据showVal显示的字
                        onSave: async (sels, showVal) => {//showVal="12;13;管理员"
                            //回调
                            onStart && onStart();
                            //同意后续的加签
                            //TO DO:重构URL
                            var agreeeMsg = await axios.post('/eiap-plus/task/assigntask/commit', {
                                activityId: this.state.HuoDongID,
                                activityName: this.state.HuoDongName,
                                comment: this.state.comment,
                                taskId: this.state.taskId,
                                approvetype: this.state.approvetype,
                                processInstanceId: this.state.processInstanceId,
                                participants: Array.from(sels, x => ({ id: x.id }))
                            }).catch((e) => {
                                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: `服务器请求出错`
                                });
                            });
                            //确认加签后的处理
                            if (agreeeMsg.data.flag == 'success') {
                                Message.create({ content: `${agreeeMsg.data.msg}`, color: 'info', position: 'top' });
                                this.setState({
                                    rejectlist: [],
                                    selectedRow: []
                                });
                                onSuccess && onSuccess();
                            } else {
                                Message.create({ content: `${agreeeMsg.data.msg}`, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: agreeeMsg.data.msg
                                });
                            }
                        },
                        showVal: '',
                        showKey: 'refname',
                        verification: false
                    });
                    //弹出参照组件
                    createModal(options);
                }
                break;
            //驳回到环节
            case 'rejectToActivity':
                if (result.data.flag == 'success') {
                    onEnd && onEnd();
                    this.setState({
                        rejectlist: result.data.rejectlist,
                        selectedRow: new Array(result.data.rejectlist.length),
                        rejectToActivityShow: true
                    });
                } else {
                    Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                    onError && onError({
                        type: 2,
                        msg: result.data.msg
                    });
                }
                break;
            //加签
            case 'signAdd':
                if (result.data.status == 1) {
                    onEnd && onEnd();
                    //配置参照需要参数
                    var options = Object.assign(JSON.parse(refOptions), {
                        title: '加签人员',
                        backdrop: false,
                        hasPage: true,
                        refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
                        isRadio: false,
                        className: '',
                        param: {//url请求参数
                            refCode: 'newuser',
                            tenantId: '',
                            sysId: '',
                            transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                        },
                        //选择中的数据
                        keyList: [],
                        //保存回调sels选中的行数据showVal显示的字
                        onSave: async (sels, showVal) => {//showVal="12;13;管理员"
                            //回调
                            onStart && onStart();
                            //TO DO:重构URL
                            //执行最终加签操作
                            var signAddMsg = await axios.post('/eiap-plus/task/signaddtask/signadd', {
                                approvetype: this.state.approvetype,
                                comment: this.state.comment,
                                processInstanceId: this.state.processInstanceId,
                                taskId: this.state.taskId,
                                userIds: Array.from(sels, x => x.id)
                            }).catch((e) => {
                                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: `服务器请求出错`
                                });
                            });
                            //判断加签最终是否成功
                            if (signAddMsg.data.flag == 'success') {
                                Message.create({ content: `${signAddMsg.data.msg}`, color: 'info', position: 'top' });
                                onSuccess && onSuccess();
                            } else {
                                Message.create({ content: `${signAddMsg.data.msg}`, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: signAddMsg.data.msg
                                });
                            }
                        },
                        showVal: '',
                        showKey: 'refname',
                        verification: false
                    });
                    //弹出参照组件
                    createModal(options);
                } else {
                    Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                    onError && onError({
                        type: 2,
                        msg: result.data.msg
                    });
                }
                break;
            //改派
            case 'delegate':
                if (result.data.status == 1) {
                    onEnd && onEnd();
                    //配置参照需要参数
                    var options = Object.assign(JSON.parse(refOptions), {
                        title: '改派人员',
                        backdrop: false,
                        hasPage: true,
                        refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
                        isRadio: true,
                        className: '',
                        param: {//url请求参数
                            refCode: 'newuser',
                            tenantId: '',
                            sysId: '',
                            transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                        },
                        //选择中的数据
                        keyList: [],
                        //保存回调sels选中的行数据showVal显示的字
                        onSave: async (sels, showVal) => {//showVal="12;13;管理员"
                            //回调
                            onStart && onStart();
                            //TO DO:重构URL
                            let delegateMsg = await axios.post('/eiap-plus/task/delegatetask/delegate', {
                                approvetype: this.state.approvetype,
                                comment: this.state.comment,
                                processInstanceId: this.state.processInstanceId,
                                taskId: this.state.taskId,
                                userId: Array.isArray(sels) ? sels[0].id : ""
                            }).catch((e) => {
                                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: `服务器请求出错`
                                });
                            });
                            //处理后续的操作
                            if (delegateMsg.data.flag == 'success') {
                                Message.create({ content: `${delegateMsg.data.msg}`, color: 'info', position: 'top' });
                                onSuccess && onSuccess();
                            } else {
                                Message.create({ content: `${delegateMsg.data.msg}`, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: delegateMsg.data.msg
                                });
                            }
                        },
                        showVal: '',
                        showKey: 'refname',
                        verification: false
                    });
                    //弹出参照组件
                    createModal(options);
                } else {
                    Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                    onError && onError({
                        type: 2,
                        msg: result.data.msg
                    });
                }
                break;

            //所有都不满足的话那就是只有一次请求直接给出提示
            default:
                if (result.data.flag == 'success') {
                    Message.create({ content: result.data.msg, color: 'info', position: 'top' });
                    onSuccess && onSuccess();
                } else {
                    Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                    onError && onError({
                        type: 2,
                        msg: result.data.msg
                    });
                }
                break;
        }
    }
    //通用关闭方法
    activityModalClose = () => {
        this.setState({
            rejectToActivityShow: false,
            rejectlist: [],
            selectedRow: []
        });
    }
    //驳回到环节的最终提交
    rejectToActivityOK = async () => {
        let { onStart, onEnd, onSuccess, onError } = this.props;
        onStart && onStart();
        let msg = await axios.post(getBpmTaskURL('rejectToBillMaker'), {
            activityId: this.state.activityId,
            approvetype: this.state.approvetype,
            comment: this.state.comment,
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId,
        }).catch((e) => {
            Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            onError && onError({
                type: 2,
                msg: `服务器请求错误`
            });
        });

        if (msg.data.flag == 'success') {
            onSuccess && onSuccess();
            Message.create({ content: `${msg.data.msg}`, color: 'info', position: 'top' });
            this.setState({
                rejectToActivityShow: false,
                rejectlist: [],
                selectedRow: []
            });
        } else {
            Message.create({ content: `${msg.data.msg}`, color: 'danger', position: 'top' });
            onError && onError({
                type: 2,
                msg: msg.data.msg
            });
        }
    }
    //流程图函数调用
    handlerFlow = () => {
        let onBpmFlowClick = this.props.onBpmFlowClick;
        onBpmFlowClick && onBpmFlowClick();
    }
    render() {
        let { processDefinitionId, processInstanceId, host } = this.props;
        return (
            <div className="clearfix">
                <div style={{ "padding": "0px" }}>
                    {this.props.appType == "1" && <div>
                        <Row style={{
                            "height": "46px",
                            "lineHeight": "46px",
                            "padding": "0 10px"
                        }}>
                            <Col md={8}>
                                <Radio.RadioGroup
                                    name="approvetype"
                                    selectedValue={this.state.approvetype}
                                    onChange={this.handleChange}>
                                    <Radio value="agree">同意</Radio>
                                    <Radio value="unagree">不同意</Radio>
                                    <Radio value="rejectToActivity">驳回到环节</Radio>
                                    <Radio value="rejectToBillMaker">驳回到制单人</Radio>
                                    <Radio value="signAdd">加签</Radio>
                                    <Radio value="delegate">改派</Radio>
                                </Radio.RadioGroup>
                            </Col>
                            <Col md={4} style={{ "textAlign": "right" }}>
                                {this.props.appType != "3" && <Button onClick={this.handlerSubmitBtn} style={{ "marginRight": "10px" }} colors="primary">提交</Button>}
                                {this.props.appType != "3" && <Button onClick={this.handlerFlow} colors="primary">流程图</Button>}
                                {this.props.appType == "3" && <Button onClick={this.handlerFlow} colors="primary">流程图</Button>}
                            </Col>
                        </Row>
                        <Row style={{
                            "padding": "0 10px"
                        }}>
                            <Col md={12}>
                                <textarea
                                    style={{
                                        "height": "75px",
                                        "width": "100%",
                                        "outline": "none",
                                        "resize": "none",
                                        "border": "1px solid #cecece",
                                        "padding": "10px",
                                        "marginBottom": "20px",
                                        "borderRadius": "4px"
                                    }}
                                    placeholder="请输入审批意见"
                                    value={this.state.comment}
                                    onChange={this.handlerCommentChange}
                                />
                            </Col>
                        </Row>
                    </div>}
                    {this.props.appType == "2" && <div>
                        <Row>
                            <Col md={12}>
                                <Radio.RadioGroup
                                    name="approvetype"
                                    selectedValue={this.state.approvetype}
                                    onChange={this.handleChange}>
                                    <Radio value="withdraw">弃审</Radio>
                                </Radio.RadioGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <textarea
                                    style={{
                                        "height": "75px",
                                        "width": "100%",
                                        "outline": "none",
                                        "resize": "none",
                                        "border": "1px solid #cecece",
                                        "padding": "10px",
                                        "marginBottom": "20px",
                                        "borderRadius": "4px"
                                    }}
                                    placeholder="请输入弃审意见"
                                    value={this.state.comment}
                                    onChange={this.handlerCommentChange}
                                />
                            </Col>
                        </Row>
                    </div>}
                </div>
                <Modal
                    show={this.state.rejectToActivityShow}
                    backdrop={false}
                    onHide={this.activityModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> 活动列表 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table
                            emptyText={()=>(<div>暂无数据</div>)}
                            rowClassName={(record, index, indent) => {
                                if (this.state.selectedRow[index]) {
                                    return 'selected';
                                } else {
                                    return '';
                                }
                            }}
                            onRowClick={(record, index, indent) => {
                                let selectedRow = new Array(this.state.rejectlist.length);
                                selectedRow[index] = true;
                                this.setState({
                                    activityId: record.activityId,
                                    selectedRow: selectedRow
                                });
                            }}
                            columns={this.rejectToActivityCol} data={this.state.rejectlist} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button colors="primary" style={{ "marginRight": "10px" }} onClick={this.rejectToActivityOK}> 确定 </Button>
                        <Button onClick={this.activityModalClose}> 关闭 </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
BpmTaskApproval.propTypes = propTypes;
BpmTaskApproval.defaultProps = {
    host: "",
    appType: "1"
}

export default BpmTaskApproval;
