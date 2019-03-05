/**
 * bpm 提交流程按钮
 */
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal, Table } from 'tinper-bee';
import RefWithInput from 'yyuap-ref/dist2/refWithInput';
import { onCommit, queryBpmTemplateAllocate, reconvert } from './common';
import refOptions from './refOptions';
const propTypes = {
    checkedArray: PropTypes.array,
    funccode: PropTypes.string,
    nodekey: PropTypes.string,
    url: PropTypes.string,
    urlAssignSubmit: PropTypes.string,
    className: PropTypes.string,
    filterRefUrl: PropTypes.string,
    refCode: PropTypes.string,
    scrollY: PropTypes.number,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onStart: PropTypes.func,
    onEnd: PropTypes.func
};

class BpmLinkAssign extends Component {
    constructor() {
        super();
        this.state = {
            childRefKey: [],//参照组件选择的数据
            userIds: [],
            processDefineCode: "",
            assignInfo: {
                assignInfoItems: []
            },
            obj: {},//单据数据
            huanjieShow: false,//环节指派显示
            huanjieList: [
                { "id": "approveUserTask3283", "name": "1", "type": "userTask" },
                { "id": "approveUserTask3183", "name": "1", "type": "userTask" },
                { "id": "approveUserTask3a83", "name": "1", "type": "userTask" },
                { "id": "approveUserTask3s83", "name": "1", "type": "userTask" },
                { "id": "approveUserTask32d3", "name": "1", "type": "userTask" },
                { "id": "approveUserTask3zza83", "name": "1", "type": "userTask" },
                { "id": "approveUserTasqzza83", "name": "1", "type": "userTask" },
                { "id": "approveUserTask34za83", "name": "1", "type": "userTask" },
                { "id": "approveUserTas43zza83", "name": "1", "type": "userTask" }
            ],
            editRowIndex: 0,
            showVal: []
        }
    }
    //提交流程按钮
    handlerBtn = async () => {
        let { checkedArray, onStart, onEnd, onSuccess, onError } = this.props;
        //检查只能一条单据提交流程
        if (checkedArray.length >= 2) {
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
                            huanjieList: result.data.detailMsg.data.assignedActivities,
                            obj: checkedArray[0],
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
        let { processDefineCode, assignInfo, obj } = this.state;
        //加载事件
        onStart && onStart();
        let result = await axios.post(urlAssignSubmit, {
            processDefineCode,
            assignInfo,
            obj
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
                childRefKey: [],
                showVal: []
            });
        }
    }
    render() {
        let self = this;
        let huanjieCol = [{
            title: "名称",
            dataIndex: "name",
            key: "name",

        },
        {
            title: "编码",
            dataIndex: "id",
            key: "id",

        }, {
            title: "指派",
            dataIndex: "1",
            key: "1",

            render(text, record, index) {
                return <RefWithInput disabled={false} option={Object.assign(JSON.parse(refOptions), {
                    title: '人员选择',
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
        return (<Table
            loading={false}
            scroll={{ y: this.props.scrollY }}
            emptyText={() => (<span>暂无环节</span>)}
            rowKey={record => record.id}
            columns={huanjieCol}
            data={this.state.huanjieList}
        />);
    }
}
BpmLinkAssign.propTypes = propTypes;
BpmLinkAssign.defaultProps = {
    checkedArray: [],
    nodekey: "003",
    funccode: "react",
    url: "/example/ygdemo_yw_info/submit",
    urlAssignSubmit: "/example/ygdemo_yw_info/assignSubmit",
    className: "",
    filterRefUrl: "/iuap_pap_quickstart/common/filterRef",
    refCode: "newuser",
    scrollY: 270
}
export default BpmLinkAssign;
