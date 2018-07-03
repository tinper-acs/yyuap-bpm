/**
 * bpm流程任务审批组件
 */

import React, { Component } from 'react';
import { Radio, Row, Col, FormControl, Button, Modal, Message, Table, Checkbox, Pagination } from 'tinper-bee';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getBpmTaskURL, sendBpmTaskAJAX, approvetypeToText } from './common';

const propTypes = {
    host: PropTypes.string,
    id: PropTypes.string,
    appType: PropTypes.string,
    onBpmFlowClick: PropTypes.func,
    onStart: PropTypes.func,
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
            signAddShow: false,
            rejectlist: [],
            selectedRow: [],
            signAddList: [],
            checkedArray: [],
            checkedAll: false,
            userIds: [],
            delegateList: [],
            delegateShow: false,
            userId: null,
            signAddSearchValue: "",
            name: "",
            pageNum: 1,
            pageSize: 20,
            totalPages: 0
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
        //驳回到环节的Modal-Table
        this.signAddCol = [{
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: "30%"
        },
        {
            title: "编码",
            dataIndex: "code",
            key: "code",
            width: "30%"
        }]
        //改派 人员列表
        this.delegateCol = [{
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: "30%"
        },
        {
            title: "编码",
            dataIndex: "code",
            key: "id",
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
    onAllCheckChange = () => {
        let self = this;
        let checkedArray = self.state.checkedArray;

        let listData = self.state.signAddList.concat();
        let selIds = [];
        // let id = self.props.multiSelect.param;
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            checkedArray[i].isChecked = !self.state.checkedAll;
        }
        // if (self.state.checkedAll) {
        //   selIds = [];
        // } else {
        //   for (var i = 0; i < listData.length; i++) {
        //     selIds[i] = listData[i][id];
        //   }
        // }
        self.setState({
            checkedAll: !self.state.checkedAll,
            checkedArray: checkedArray,
            // selIds: selIds
        });
        // self.props.onSelIds(selIds);
        let userIdArr = checkedArray.filter((item) => item.isChecked);
        let userIdsArray = [];
        userIdArr.map((item) => {
            userIdsArray.push(item.id);
        });
        this.setState({
            userIds: userIdsArray
        });
    };
    onCheckboxChange = (text, record, index) => {
        let self = this;
        let allFlag = false;
        // let selIds = self.state.selIds;
        // let id = self.props.postId;
        let checkedArray = self.state.checkedArray.concat();
        // if (self.state.checkedArray[index]) {
        // selIds.remove(record[id]);
        // } else {
        // selIds.push(record[id]);
        // }
        checkedArray[index].isChecked = !self.state.checkedArray[index].isChecked;
        checkedArray[index].id = record.id;
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            if (!checkedArray[i].isChecked) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        self.setState({
            checkedAll: allFlag,
            checkedArray: checkedArray,
            // selIds: selIds
        });
        // self.props.onSelIds(selIds);
        let userIdArr = checkedArray.filter((item) => item.isChecked);
        let userIdsArray = [];
        userIdArr.map((item) => {
            userIdsArray.push(item.id);
        });
        this.setState({
            userIds: userIdsArray
        });
    };
    renderColumnsMultiSelect(columns) {
        const { checkedArray } = this.state;
        const { multiSelect } = this.props;
        let select_column = {};
        let indeterminate_bool = false;
        // let indeterminate_bool1 = true;
        if (multiSelect && multiSelect.type === "checkbox") {
            let i = checkedArray.length;
            while (i--) {
                if (checkedArray[i].isChecked) {
                    indeterminate_bool = true;
                    break;
                }
            }
            let defaultColumns = [
                {
                    title: (
                        <Checkbox
                            className="table-checkbox"
                            checked={this.state.checkedAll}
                            indeterminate={indeterminate_bool && !this.state.checkedAll}
                            onChange={this.onAllCheckChange}
                        />
                    ),
                    key: "checkbox",
                    dataIndex: "checkbox",
                    width: "5%",
                    render: (text, record, index) => {
                        return (
                            <Checkbox
                                className="table-checkbox"
                                checked={this.state.checkedArray[index].isChecked}
                                onChange={this.onCheckboxChange.bind(this, text, record, index)}
                            />
                        );
                    }
                }
            ];
            columns = defaultColumns.concat(columns);
        }
        return columns;
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
        if (this.state.comment == "") {
            Message.create({ content: '不能为空', color: 'danger', position: 'top' });
            return;
        }
        //第一次请求审批，有的是直接一次请求，有的需要二次请求
        let result = await sendBpmTaskAJAX(this.state.approvetype, this.state);

        //检测需要二次请求并弹出Modal审批
        switch (this.state.approvetype) {
            //驳回到环节
            case 'rejectToActivity':
                if (result.data.flag == 'success') {
                    this.setState({
                        rejectlist: result.data.rejectlist,
                        selectedRow: new Array(result.data.rejectlist.length),
                        rejectToActivityShow: true
                    });
                } else {
                    Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                }
                break;
            //加签
            case 'signAdd':
                if (result.data.status == 1) {
                    this.setState({
                        signAddList: result.data.data.content,
                        signAddShow: true,
                        checkedArray: result.data.data.content,
                        totalPages: result.data.data.totalPages
                    });

                } else {
                    Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                }
                break;
            //改派
            case 'delegate':
                if (result.data.status == 1) {
                    this.setState({
                        delegateList: result.data.data.content,
                        delegateShow: true,
                        selectedRow: new Array(result.data.data.content.length)
                    });

                } else {
                    Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                }
                break;

            //所有都不满足的话那就是只有一次请求直接给出提示
            default:
                if (result.data.flag == 'success') {
                    Message.create({ content: result.data.msg, color: 'info', position: 'top' });
                    this.props.onSuccess && this.props.onSuccess();
                } else {
                    Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                    this.props.onError && this.props.onError();
                }
                break;
        }

        // if (result.data.flag == 'success') {
        //     Message.create({ content: result.data.msg, color: 'info', position: 'top' });
        // }else{
        //     Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
        // }

    }
    //通用关闭方法
    close = () => {
        this.setState({
            rejectToActivityShow: false,
            signAddShow: false,
            rejectlist: [],
            selectedRow: [],
            signAddList: [],
            checkedArray: [],
            checkedAll: false,
            delegateShow: false,
            name: ""
        });
    }
    //驳回到环节的最终提交
    //需要URL,参数：
    //eiap-plus/task/rejecttask/reject
    //
    rejectToActivityOK = async () => {
        let msg = await axios.post(getBpmTaskURL('rejectToBillMaker'), {
            activityId: this.state.activityId,
            approvetype: this.state.approvetype,
            comment: this.state.comment,
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId,
        }).catch((e) => {
            Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
        });

        if (msg.data.flag == 'success') {
            Message.create({ content: `${msg.data.msg}`, color: 'info', position: 'top' });
            this.setState({
                rejectToActivityShow: false,
                signAddShow: false,
                rejectlist: [],
                selectedRow: [],
                signAddList: [],
                checkedArray: [],
                checkedAll: false
            });
        } else {
            Message.create({ content: `${msg.data.msg}`, color: 'danger', position: 'top' });
        }
    }
    //加签
    signAddOK = async () => {
        let msg = await axios.post('eiap-plus/task/signaddtask/signadd', {
            approvetype: this.state.approvetype,
            comment: this.state.comment,
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId,
            userIds: this.state.userIds
        }).catch((e) => {
            Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            this.props.onError && this.props.onError();
        });

        if (msg.data.flag == 'success') {
            Message.create({ content: `${msg.data.msg}`, color: 'info', position: 'top' });
            this.setState({
                rejectToActivityShow: false,
                signAddShow: false,
                rejectlist: [],
                selectedRow: [],
                signAddList: [],
                checkedArray: [],
                checkedAll: false,
                name: ""
            });
            this.props.onSuccess && this.props.onSuccess();
        } else {
            Message.create({ content: `${msg.data.msg}`, color: 'danger', position: 'top' });
            this.props.onError && this.props.onError();
        }
    }
    //改派
    delegatedOK = async () => {
        if (this.state.userId == null) {
            Message.create({ content: `请选择一条数据`, color: 'danger', position: 'top' });
            return;
        }
        let msg = await axios.post('eiap-plus/task/delegatetask/delegate', {
            approvetype: this.state.approvetype,
            comment: this.state.comment,
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId,
            userId: this.state.userId
        }).catch((e) => {
            Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            this.props.onError && this.props.onError();
        });

        if (msg.data.flag == 'success') {
            Message.create({ content: `${msg.data.msg}`, color: 'info', position: 'top' });
            this.setState({
                rejectToActivityShow: false,
                signAddShow: false,
                rejectlist: [],
                selectedRow: [],
                signAddList: [],
                checkedArray: [],
                checkedAll: false,
                delegateShow: false,
                name: ""
            });
            this.props.onSuccess && this.props.onSuccess();
        } else {
            Message.create({ content: `${msg.data.msg}`, color: 'danger', position: 'top' });
            this.props.onError && this.props.onError();
        }
    }
    handlerFlow = () => {
        let onStart = this.props.onStart;
        if (onStart) {
            onStart();
        }
        let onBpmFlowClick = this.props.onBpmFlowClick;
        if (onBpmFlowClick) {
            onBpmFlowClick();
        }
    }
    handlerSignAddSearch = async () => {
        let result = await sendBpmTaskAJAX(this.state.approvetype, this.state);
        this.setState({
            signAddList: result.data.data.content,
            delegateList: result.data.data.content,
            totalPages: result.data.data.totalPages
        });
    }
    handlerSignAddSearchValue = (value) => {
        this.setState({
            name: value
        })
    }
    handlerSignAddPage = (page) => {
        this.setState({
            pageNum: page
        }, async () => {
            let result = await sendBpmTaskAJAX(this.state.approvetype, this.state);
            this.setState({
                signAddList: result.data.data.content,
                totalPages: result.data.data.totalPages
            });
        });
    }
    render() {
        let { processDefinitionId, processInstanceId, host } = this.props;
        return (
            <div className="clearfix">
                <Row style={{ "margin": "10px 0" }}>
                    <Col mdOffset={10} md={2}>
                        {this.props.appType != "3" && <Button onClick={this.handlerFlow} style={{ "marginRight": "10px" }} colors="primary">流程图</Button>}
                        {this.props.appType != "3" && <Button onClick={this.handlerSubmitBtn} style={{ "marginRight": "10px" }} colors="primary">提交</Button>}
                        {this.props.appType == "3" && <Button onClick={this.handlerFlow} style={{ "marginRight": "10px" }} colors="primary">流程图</Button>}
                    </Col>
                </Row>
                <div style={{ "background": "#eeeff1", "padding": "20px" }}>
                    {this.props.appType == "1" && <div>
                        <Row>
                            <Col style={{
                                "height": "40px",
                                "lineHeight": "20px"
                            }} md={12}>
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
                        </Row>
                        <Row>
                            <Col md={12}>
                                <textarea
                                    style={{
                                        "height": "75px",
                                        "width": "100%",
                                        "outline": "none",
                                        "resize": "none",
                                        "border": "1px solid #636363",
                                        "padding": "10px",
                                        "marginBottom": "20px"
                                    }}
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
                                        "border": "1px solid #636363",
                                        "padding": "10px",
                                        "marginBottom": "20px"
                                    }}
                                    onChange={this.handlerCommentChange}
                                />
                            </Col>
                        </Row>
                    </div>}
                </div>
                <Modal
                    show={this.state.rejectToActivityShow}
                    backdrop={false}
                    onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title> 活动列表 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table
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
                        <Button colors="primary" onClick={this.close}> 关闭 </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.signAddShow}
                    backdrop={false}
                    onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title> 加签人员列表 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row style={{ "paddingBottom": "10px" }}>
                            <Col md={2}>
                                <div style={{ "lineHeight": "30px" }}>名称：</div>
                            </Col>
                            <Col md={5}>
                                <FormControl
                                    value={this.state.name}
                                    onChange={this.handlerSignAddSearchValue}
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    style={{ "marginLeft": "10px" }}
                                    onClick={this.handlerSignAddSearch}
                                    colors="primary">查询</Button>
                            </Col>
                        </Row>
                        <Table
                            scroll={{ y: 200 }}
                            rowKey={record => record.code}
                            columns={this.renderColumnsMultiSelect(this.signAddCol)}
                            data={this.state.signAddList}
                        />
                        <Pagination
                            boundaryLinks
                            prev
                            next
                            items={this.state.totalPages}
                            activePage={this.state.pageNum}
                            onSelect={this.handlerSignAddPage} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button colors="primary" style={{ "marginRight": "10px" }} onClick={this.signAddOK}> 确定 </Button>
                        <Button colors="primary" onClick={this.close}> 关闭 </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.delegateShow}
                    backdrop={false}
                    onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title> 人员列表 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row style={{ "paddingBottom": "10px" }}>
                            <Col md={2}>
                                <div style={{ "lineHeight": "30px" }}>名称：</div>
                            </Col>
                            <Col md={5}>
                                <FormControl
                                    value={this.state.name}
                                    onChange={this.handlerSignAddSearchValue}
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    style={{ "marginLeft": "10px" }}
                                    onClick={this.handlerSignAddSearch}
                                    colors="primary">查询</Button>
                            </Col>
                        </Row>
                        <Table
                            rowClassName={(record, index, indent) => {
                                if (this.state.selectedRow[index]) {
                                    return 'selected';
                                } else {
                                    return '';
                                }
                            }}
                            onRowClick={(record, index, indent) => {
                                let selectedRow = new Array(this.state.delegateList.length);
                                selectedRow[index] = true;
                                this.setState({
                                    userId: record.id,
                                    selectedRow: selectedRow
                                });
                            }}
                            rowKey={record => record.code}
                            scroll={{ y: 200 }}
                            columns={this.delegateCol} data={this.state.delegateList} />
                        <Pagination
                            boundaryLinks
                            prev
                            next
                            items={this.state.totalPages}
                            activePage={this.state.pageNum}
                            onSelect={this.handlerSignAddPage} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button colors="primary" style={{ "marginRight": "10px" }} onClick={this.delegatedOK}> 确定 </Button>
                        <Button colors="primary" onClick={this.close}> 关闭 </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
BpmTaskApproval.propTypes = propTypes;
BpmTaskApproval.defaultProps = {
    host: "",
    prefixCls: "bee-table",
    appType: "1",
    multiSelect: {
        type: "checkbox",
        param: "key"
    }
}

export default BpmTaskApproval;