/**
 * bpm 提交流程按钮
 */
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal, Table ,Row,Label,Checkbox } from 'tinper-bee';
import RefWithInput from 'yyuap-ref/dist2/refWithInput';
import { onCommit, queryBpmTemplateAllocate, reconvert } from './common';
import refOptions from './refOptions';
import './bpm.less';
const propTypes = {
    checkedArray: PropTypes.array,
    funccode: PropTypes.string,
    nodekey: PropTypes.string,
    url: PropTypes.string,
    urlAssignSubmit: PropTypes.string,
    className: PropTypes.string,
    filterRefUrl: PropTypes.string,
    refCode: PropTypes.string,
    size: PropTypes.string,
    scrollY: PropTypes.number,
    isOne: PropTypes.bool,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onStart: PropTypes.func,
    onEnd: PropTypes.func
};

class BpmButtonSubmit extends Component {
    constructor() {
        super();
        this.state = {
            childRefKey: [],//参照组件选择的数据
            userIds: [],
            processDefineCode: "",
            assignInfo: {
                assignInfoItems: []
            },
            obj: [],//单据数据
            huanjieShow: false,//环节指派显示
            huanjieList: [],
            chaosongShow:false,//抄送显示
            editRowIndex: 0,
            showVal: [],
            copyusers:[],   //抄送数据
            copyuserShowVal:[], //抄送显示
            intersection:true  //是否交集
        }
    }
    //提交流程按钮
    handlerBtn = async () => {
        let { checkedArray, isOne, onStart, onEnd, onSuccess, onError } = this.props;
        //检查是否多单据提交
        if (isOne && checkedArray.length >= 2) {
            onError && onError({
                type: 2,
                msg: `请选择单条数据提交`
            });
            return;
        }

        //处理数据提交第一次请求，然后发起二次请求
        if (checkedArray.length > 0) {
            //如果传来的数据状态bpmState==null or 0 那么直接给出错误重复提交
            if (checkedArray[0].bpmState >= 1) {
                onError && onError({
                    type: 1,
                    msg: `不能提交此单据，重复提交`
                });
                return;
            }
            //加载事件
            onStart && onStart();
            //提交第一次请求，获得res_code通过funccode,nodekey
            let { data: { success, detailMsg } } = await queryBpmTemplateAllocate({
                funccode: this.props.funccode,
                nodekey: this.props.nodekey
            });
            //正常拿到成功数据后
            if (success == "success") {
                //组织新的第二次提交参数，用于是否有流程指派操作等
                let commitParam = {
                    "url": this.props.url,
                    "processDefineCode": detailMsg.data.res_code,
                    "submitArray": checkedArray
                }
                //得到下次需要接口用的res_code
                this.setState({
                    processDefineCode: detailMsg.data.res_code
                });
                //收集参数准备提交submit
                let result = await onCommit(commitParam);
                let flag = result.data.success;
                //一般普通的提交成功和失败
                if (flag == "success" && (typeof result.data.detailMsg.data.assignAble == 'undefined')) {
                    //正确
                    onSuccess && onSuccess();
                } else if (flag == "fail_global") {
                    //后端错误
                    onError && onError({
                        type: 2,
                        msg: reconvert(result.data.message) || '流程启动失败'
                    });
                }
                //当得知需要二次弹出环节面板
                if (result.data.detailMsg.data.assignAble == true) {
                    //判断是否有最新的活动id和name
                    if (result.data.detailMsg.data.assignedActivities && result.data.detailMsg.data.assignedActivities.length > 0) {
                        //停止事件
                        onEnd && onEnd();
                        //更新环节指派数据
                        this.setState({
                            huanjieShow: true,
                            chaosongShow:true,
                            huanjieList: result.data.detailMsg.data.assignedActivities,
                            obj: checkedArray,
                            assignInfo: {
                                assignInfoItems: Array.from(result.data.detailMsg.data.assignedActivities, x => ({ activityId: x.id, activityName: x.name, participants: [] }))
                            }
                        });
                    }
                }
            } else if (success == "fail_global") {
                let { data: { message } } = result
                //流程提交错误
                onError && onError({
                    type: 2,
                    msg: reconvert(message) || '流程启动失败'
                });
            }
        } else {
            // 弹出提示
            onError && onError({
                type: 1,
                msg: `请选择提交的单据`
            });
        }

    }
    //通用关闭方法
    closeHuanjie = () => {
        this.setState({
            huanjieShow: false,
            chaosongShow:false,
            childRefKey: [],
            showVal: []
        });
    }
    //选择人员后的确定事件
    signAddOK = () => {
        //修改第几个数据
        let _index = this.state.editRowIndex;
        //副本原始对象
        let sourseArray = this.state.assignInfo.assignInfoItems.slice();
        //根据修改索引修改指定数据内容
        sourseArray[_index]['participants'] = Array.from(this.state.userIds, x => ({ id: x.id }));
        this.setState({
            assignInfo: {
                assignInfoItems: sourseArray
            },
            userIds: []
        });
    }
    //选择完所有加签后的确定事件
    huanjieHandlerOK = async () => {
        let { urlAssignSubmit, onSuccess, onError, onStart, onEnd } = this.props;
        let { processDefineCode, assignInfo, obj,copyusers,intersection } = this.state;
        obj=obj[0];
        let arr=[];
        copyusers.map(function(value) {
            arr=arr.concat(value);
        });
        copyusers=arr;
        //加载事件
        onStart && onStart();
        let result = await axios.post(urlAssignSubmit, {
            processDefineCode,
            assignInfo,
            obj,
            copyusers,
            intersection

        }).catch((e) => {
            onError && onError({
                type: 2,
                msg: `后台服务请求发生错误`
            });
        });
        if (result.data.success == 'success') {
            onSuccess && onSuccess();
            this.setState({
                huanjieShow: false,
                chaosongShow:false,
                childRefKey: [],
                showVal: []
            });
        } else if (result.data.success == 'fail_global') {
            onError && onError({
                type: 2,
                msg: reconvert(result.data.message) || '流程启动失败'
            });
            this.setState({
                huanjieShow: false,
                chaosongShow:false,
                childRefKey: [],
                showVal: []
            });
        }
    }
    changeCheck=()=> {
        this.setState({intersection:!this.state.intersection});
    }
    render() {
        let self = this;
        let huanjieCol = [{
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: "40%"
        },
        {
            title: "编码",
            dataIndex: "id",
            key: "id",
            width: "40%"
        }, {
            title: "指派",
            dataIndex: "1",
            key: "1",
            width: "20%",
            render(text, record, index) {
                return <RefWithInput disabled={false} option={Object.assign(JSON.parse(refOptions), {
                    title: '指派人员选择',
                    backdrop: false,
                    hasPage: true,
                    refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
                    isRadio: false,
                    filterRefUrl: self.props.filterRefUrl,
                    className: '',
                    param: {//url请求参数
                        refCode: self.props.refCode,
                        tenantId: '',
                        sysId: '',
                        transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                    },
                    //选择中的数据
                    keyList: self.state.childRefKey[index] || [],
                    //保存回调sels选中的行数据showVal显示的字
                    onSave: function (sels, showVal) {//showVal="12;13;管理员"
                        console.log(sels);
                        var temp = sels.map(v => v.id);
                        //显示值
                        let _showVal = self.state.showVal.slice();
                        _showVal[index] = showVal;
                        //选中的值
                        let _childRefKey = self.state.childRefKey.slice();
                        _childRefKey[index] = temp;
                        //副本原始对象
                        let sourseArray = self.state.assignInfo.assignInfoItems.slice();
                        //根据修改索引修改指定数据内容
                        sourseArray[index]['participants'] = Array.from(_childRefKey[index], x => ({ id: x }));
                        self.setState({
                            childRefKey: _childRefKey,
                            showVal: _showVal,
                            assignInfo: {
                                assignInfoItems: sourseArray
                            }
                        });
                    },
                    showVal: self.state.showVal[index],
                    showKey: 'refname',
                    verification: false
                })} />
            }
        }]
        let organRef ={
            title: '抄送部门选择',
            backdrop: false,
            hasPage: true,
            multiple:true,
            refType: 1,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            filterRefUrl: self.props.filterRefUrl,
            className: '',
            param: {//url请求参数
                refCode: self.props.organrefCode,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            //选择中的数据
            keyList: self.state.copyusers[0]?self.state.copyusers[0]:[],
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"
                console.log(sels);
                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[0] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[0]=Array.from(temp, x => ({ id: x ,type:`DEPTS`}));
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,

                });
            },
            showVal: self.state.copyuserShowVal[0],
            showKey: 'refname',
            verification: false
        }
        let positonRef ={
            title: '抄送岗位选择',
            backdrop: false,
            hasPage: true,
            multiple:true,
            refType: 1,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            filterRefUrl: self.props.filterRefUrl,
            className: '',
            param: {//url请求参数
                refCode: self.props.positonrefCode,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            //选择中的数据
            keyList: self.state.copyusers[1]?self.state.copyusers[1]:[],
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"
                console.log(sels);
                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[1] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[1] = Array.from(temp, x => ({ id: x ,type:`POSTS`}));
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,

                });
            },
            showVal: self.state.copyuserShowVal[1],
            showKey: 'refname',
            verification: false
        }
        let roleRef={
            title: '抄送角色选择',
            backdrop: false,
            hasPage: true,
            refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            filterRefUrl: self.props.filterRefUrl,
            className: '',
            param: {//url请求参数
                refCode: self.props.refCode,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            //选择中的数据
            keyList: self.state.copyusers[2]?self.state.copyusers[2]:[],
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"
                console.log(sels);
                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[2] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[2] = Array.from(temp, x => ({ id: x ,type:`USERGROUP`}));
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,

                });
            },
            showVal: self.state.copyuserShowVal[2],
            showKey: 'refname',
            verification: false
        }
        let userRef ={
            title: '抄送人员选择',
            backdrop: false,
            hasPage: true,
            refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            filterRefUrl: self.props.filterRefUrl,
            className: '',
            param: {//url请求参数
                refCode: self.props.refCode,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            //选择中的数据
            keyList: self.state.copyusers[3]?self.state.copyusers[3]:[],
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"
                console.log(sels);
                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[3] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[3] = Array.from(temp, x => ({ id: x ,type:`USER`}));
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,

                });
            },
            showVal: self.state.copyuserShowVal[3],
            showKey: 'refname',
            verification: false
        }
        return (<span>
            <span onClick={this.handlerBtn}>
                {
                    this.props.children
                }
            </span>
            <Modal
                size={this.props.size}
                show={this.state.huanjieShow||this.state.chaosongShow}
                backdrop={false}
                enforceFocus={false}
                onHide={this.closeHuanjie}>
                <Modal.Header closeButton>
                    <Modal.Title> {this.state.huanjieShow?'环节指派':'抄送'}</Modal.Title>
                </Modal.Header>
                {this.state.huanjieShow?<Modal.Body>
                    <Table
                        rowKey={record => record.id}
                        columns={huanjieCol}
                        data={this.state.huanjieList}
                        scroll={{ x: "100%", y: 240 }}
                    />
                </Modal.Body>:""}
                {this.state.huanjieShow?
                <Modal.Header>
                    <Modal.Title> 抄送 </Modal.Title>
                </Modal.Header>:""}
                {this.state.chaosongShow?
                    <Modal.Body>
                        <Row>
                            <Label className={`refLabel`}>按部门:</Label>
                            <div className={`refcon`}>
                                <RefWithInput disabled={false} option={Object.assign(JSON.parse(refOptions),organRef)} />
                            </div>
                            <Label className={`refLabel`}>按岗位:</Label>
                            <div className={`refcon`}>
                                <RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions),positonRef)} />
                            </div>
                        </Row>
                        <Row  style={{'marginTop':'15px','marginBottom':'15px'}}>
                            <Label className={`refLabel`}>按角色:</Label>
                            <div className={`refcon`}>
                                <RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions),roleRef)} />
                            </div>
                            <Label className={`refLabel`}>按用户:</Label>
                            <div className={`refcon`}>
                                <RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions), userRef)} />
                            </div>
                        </Row>
                        <Checkbox className={`intersection`} checked={this.state.intersection} onChange={this.changeCheck}>是否交集</Checkbox>
                    </Modal.Body>:""}
                <Modal.Footer>
                    <Button style={{ "marginRight": "10px" }}  onClick={this.closeHuanjie}> 关闭 </Button>
                    <Button colors="primary"  onClick={this.huanjieHandlerOK}> 确定 </Button>

                </Modal.Footer>
            </Modal>
        </span>);
    }
}
BpmButtonSubmit.propTypes = propTypes;
BpmButtonSubmit.defaultProps = {
    checkedArray: [],
    nodekey: "003",
    funccode: "react",
    url: "/example/ygdemo_yw_info/submit",
    urlAssignSubmit: "/example/ygdemo_yw_info/assignSubmit",
    className: "",
    filterRefUrl: "/iuap_pap_quickstart/common/filterRef",
    refCode: "newuser",
    size: "",
    scrollY: 270,
    isOne: false,
    organrefCode:"newdept",
    positonrefCode:"newposition",
    roleRef:"newrole",
    userRef:"newuser"
}
export default BpmButtonSubmit;
