/**
 * bpm流程任务审批组件
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Col, Message, Modal, Radio, Row, Table,FormControl} from 'tinper-bee';
import Select from 'bee-select';
import createModal from 'yyuap-ref';
import { approvetypeToText, sendBpmTaskAJAX } from './common';
import refOptions from './refOptions';
import RefWithInput from 'yyuap-ref/dist2/refWithInput';
const propTypes = {
    id: PropTypes.string,
    appType: PropTypes.string,
    filterRefUrl: PropTypes.string,
    refCode: PropTypes.string,
    properties:PropTypes.object,
    onBpmFlowClick: PropTypes.func,
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onChangestate:PropTypes.func
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
            activityId: "",
            activityName:"",
            rejectToActivityShow: false,
            rejectlist: [],
            selectedRow: [],
            userIds: [],
            userId: [],
            userName:[],
            checkedArray:[],
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
                approvetype: "withdraw",
                comment: approvetypeToText("withdraw")
            },()=>{
                this.props.onChangestate(this.state);
            });
        }
    }

    //选择审批的类型
    handleChange = (value) => {
        this.setState({
            approvetype: value,
            comment: approvetypeToText(value) ,
            userName:"",
            userIds: [],
            userId: [],
            checkedArray:[]
        },()=>{
            this.props.onChangestate(this.state);
        });
    }
    //绑定审批意见
    handlerCommentChange = (e) => {
        this.setState({ comment: e.target.value },()=>{
            this.props.onChangestate(this.state);
        },()=>{
            this.props.onChangestate(this.state);
        });
    }
    //审批提交

    //通用关闭方法
    activityModalClose = () => {
        this.setState({
            rejectToActivityShow: false,
            rejectlist: [],
            selectedRow: []
        },()=>{
            this.props.onChangestate(this.state);
        });
    }
    //驳回到环节的最终提交
    rejectToActivityOK = async () => {
        let { onStart, onEnd, onSuccess, onError } = this.props;
        onStart && onStart();
        let rejectToBillMakerMsg = await sendBpmTaskAJAX('rejectToBillMaker', {
            activityId: this.state.activityId,
            approvetype: this.state.approvetype,
            comment: this.state.comment,
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId
        }).catch((e) => {
            Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            onError && onError({
                type: 2,
                msg: `服务器请求错误`
            });
        });

        if (rejectToBillMakerMsg.data.flag == 'success') {
            onSuccess && onSuccess();
            Message.create({ content: `${rejectToBillMakerMsg.data.msg}`, color: 'info', position: 'top' });
            this.setState({
                rejectToActivityShow: false,
                rejectlist: [],
                selectedRow: []
            },()=>{
                this.props.onChangestate(this.state);
            });
        } else {
            Message.create({ content: `${rejectToBillMakerMsg.data.msg}`, color: 'danger', position: 'top' });
            onError && onError({
                type: 2,
                msg: rejectToBillMakerMsg.data.msg
            });
        }
    }
    //流程图函数调用
    handlerFlow = () => {
        let onBpmFlowClick = this.props.onBpmFlowClick;
        onBpmFlowClick && onBpmFlowClick();
    }
    getDataSource=()=>{
        let arr =[{
            key: "同意",
            value: "agree"
        }];
        let { addsignAble,rejectAble ,delegateAble,unagreeable ,deleteable} = this.props.properties
        if(unagreeable)arr.push({key: "不同意", value: "unagree"})
        if(rejectAble)arr.push({key: "驳回到环节", value: "rejectToActivity"})
        if(deleteable)arr.push({key: "驳回到制单人", value: "rejectToBillMaker"})
        if(addsignAble)arr.push({key: "加签", value: "signAdd"})
        if(delegateAble)arr.push({key: "改派", value: "delegate"})
        return arr
    }
    rejectToActivity= async ()=>{
        let { onError } = this.props;
        let result = await sendBpmTaskAJAX(this.state.approvetype, this.state);
        if (result.data.flag == 'success'&& result.data.rejectlist.length>0) {
            this.setState({
                rejectlist: result.data.rejectlist,
                selectedRow: new Array(result.data.rejectlist.length),
                rejectToActivityShow: true
            });
        } else {
            Message.create({ content: result.data.msg||'当前环节为首环节，没有可以驳回的环节', color: 'warning', position: 'top' });
            onError && onError({
                type: 2,
                msg: result.data.msg||'当前环节为首环节，没有可以驳回的环节'
            });
        }
    }
    render() {
        let self = this;
        let userRef ={
            title:self.state.approvetype ==='delegate'?'改派人员选择':"加签人员选择",
            backdrop: false,
            hasPage: true,
            refType: self.state.approvetype ==='delegate'?2:5,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: self.state.approvetype === 'delegate',
            className: 'bpm-ref',
            emptyBtn:true,
            param: {//url请求参数
                refCode: self.state.approvetype ==='delegate'?'newuser':'userUnderOrgRef',
                tenantId: '',
                sysId: '',
                cfgParam:true,
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            textOption: {
                modalTitle: '选择加签人员',
                leftTitle: '组织结构',
                rightTitle: '人员列表',
                leftTransferText: '待选人员',
                rightTransferText: '已选人员',

            },
            //选择中的数据
            checkedArray: self.state.checkedArray,
            onCancel: function (p) {
                console.log(p)
            },
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"

                var temp = sels.map(v => v.id);
                //显示值
                let userName = self.state.userName;
                userName = showVal;
                //选中的值
                let userId = self.state.userIds;
                userId = temp;
                self.setState({
                    userId: userId[0],
                    userIds:userId,
                    userName: userName,
                    checkedArray:sels,

                },()=>{
                    self.props.onChangestate(self.state);
                });
            },
            showVal: this.state.userName,
            showKey: 'refname',
            verification: false
        }
        return (
            <div className="clearfix">
                <div style={{ "padding": "0px" }}>
                    {this.props.appType == "1" && <div>
                        <Row style={{
                            "margin":"8px 0",
                            "padding": "0 10px"
                        }}>
                            <Col md={2}  sm={2} xs={3} style={{"paddingLeft":0,"paddingRight":'15px'}}>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择"
                                    onChange={self.handleChange}
                                    defaultValue="agree"
                                    data={self.getDataSource()}
                                />
                            </Col>
                                <Col md={3} xs={3} sm={3} style={{"paddingLeft":0}}>
                                    {this.state.approvetype==="signAdd" &&<RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions), userRef)} />}{/*加签*/}
                                    {this.state.approvetype==="delegate" &&<RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions), userRef)} />}{/*改派*/}
                                    {this.state.approvetype==="rejectToActivity" &&<FormControl
                                        readOnly={true}
                                        placeholder={'请选择环节'}
                                        value={this.state.activityName}
                                        onClick={this.rejectToActivity}
                                        onChange={this.onChange} />}{/*驳回*/}
                                </Col>
                            <Col md={4} mdOffset={3} xs={4} xsOffset={2} sm={4} smOffset={3} style={{ "textAlign": "right","paddingRight": 0}}>
                                {/*{this.props.appType == "1" && <Button onClick={this.handlerSubmitBtn} style={{ "marginRight": "10px" }} colors="primary">提交</Button>}*/}
                                {/*{this.props.appType == "1" && <Button onClick={this.handlerFlow} colors="primary">流程图</Button>}*/}
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
                                    placeholder="请输入处理意见"
                                    value={this.state.comment}
                                    onChange={this.handlerCommentChange}
                                />
                            </Col>
                        </Row>
                    </div>}
                    {this.props.appType == "2" && <div>
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
                                    <Radio value="withdraw">弃审</Radio>
                                </Radio.RadioGroup>
                            </Col>
                            <Col md={4} style={{ "textAlign": "right" }}>
                                {/*{this.props.appType == "2" && <Button onClick={this.handlerSubmitBtn} style={{ "marginRight": "10px" }} colors="primary">提交</Button>}*/}
                                {/*{this.props.appType == "2" && <Button onClick={this.handlerFlow} colors="primary">流程图</Button>}*/}
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
                            rowKey={(r) => r.activityId}
                            emptyText={() => (<div>暂无数据</div>)}
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
                                    activityName:record.activityName,
                                    selectedRow: selectedRow
                                },()=>{
                                    this.props.onChangestate(this.state);
                                });
                            }}
                            columns={this.rejectToActivityCol} data={this.state.rejectlist} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button colors="primary" style={{ "marginRight": "10px" }} onClick={this.activityModalClose}> 确定 </Button>
                        <Button onClick={this.activityModalClose}> 关闭 </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
BpmTaskApproval.propTypes = propTypes;
BpmTaskApproval.defaultProps = {
    appType: "1",
    refCode: "newuser",
    filterRefUrl: "/iuap_pap_quickstart/common/filterRef",
    properties:{
        addSignAble:true, //可否加签
        iscopytouser:true, //可否抄送
        rejectAble:true, //可否驳回
        delegateAble:true, //可否改派
        unagreeable:true, //可否不同意
        assignAble:true, //可否指派
        deleteable:true //可否驳回制单人
    }
}

export default BpmTaskApproval;
