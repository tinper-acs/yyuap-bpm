/**
 * bpm 提交流程按钮
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Radio, Row, Col, FormControl, Button, Modal, Message, Table, Checkbox, Pagination } from 'tinper-bee';
import { queryBpmTemplateAllocate, onCommit, reconvert, sendBpmTaskAJAX } from './common';
import PropTypes from 'prop-types';
const propTypes = {
    checkedArray: PropTypes.array,
    text: PropTypes.string,
    funccode: PropTypes.string,
    nodekey: PropTypes.string,
    url: PropTypes.string,
    urlAssignSubmit: PropTypes.string,
    className: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onStart: PropTypes.func
};

class BpmButtonSubmit extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            checkedArray: [],
            signAddList: [],
            signAddShow: false,
            pageNum: 1,
            pageSize: 20,
            totalPages: 0,
            userIds: [],
            processDefineCode: "",
            assignInfo: {
                assignInfoItems: []
            },
            obj: {},//单据数据
            huanjieShow: false,//环节指派显示
            editRowIndex: 0,

        }
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
        //环节Col

    }
    //提交流程按钮
    handlerBtn = async () => {
        // let errFlag = false;
        let { checkedArray, onStart, onSuccess, onError } = this.props;
        //加载事件
        if (onStart) {
            onStart();
        }
        //筛选选择单据
        let submitArray = [];
        // for (let i = 0; i < checkedArray.length; i++) {
        //     if (checkedArray[i].bpmState == null || checkedArray[i].bpmState == 0) {
        //         submitArray.push({ "id": checkedArray[i].id });
        //         errFlag = false;
        //     } else {
        //         errFlag = true;
        //         onError && onError({
        //             type: 1,
        //             msg: `单据 ${checkedArray[i].id} 不能重复提交`
        //         });
        //     }
        // }
        // if (errFlag) {
        //     return;
        // }
        //检查只能一条单据提交流程
        if (checkedArray.length >= 2) {
            onError && onError({
                type: 2,
                msg: `请选择单条数据提交`
            });
            return;
        }
        //如果传来的数据状态bpmState==null or 0 那么直接给出错误重复提交
        // if (checkedArray[0].bpmState == null || checkedArray[0].bpmState == 0) {
        //     onError && onError({
        //         type: 1,
        //         msg: `不能提交此单据，重复提交`
        //     });
        //     return;
        // }
        if (checkedArray[0].bpmState >= 1) {
            onError && onError({
                type: 1,
                msg: `不能提交此单据，重复提交`
            });
            return;
        }
        //处理数据提交第一次请求，然后发起二次请求
        if (checkedArray.length > 0) {
            let { data: { success, detailMsg } } = await queryBpmTemplateAllocate({
                funccode: this.props.funccode,
                nodekey: this.props.nodekey
            });
            if (success == "success") {
                let commitParam = {
                    "url": this.props.url,
                    "processDefineCode": detailMsg.data.res_code,
                    "submitArray": checkedArray
                }
                this.setState({
                    processDefineCode: detailMsg.data.res_code
                });
                //收集参数准备提交submit
                let result = await onCommit(commitParam);
                let flag = result.data.success;
                if (flag == "success" && (typeof result.data.detailMsg.data.assignAble == 'undefined')) {
                    //正确
                    onSuccess && onSuccess();
                } else if (flag == "fail_global") {
                    onError && onError({
                        type: 2,
                        msg: `流程启动失败`
                    });
                }

                if (result.data.detailMsg.data.assignAble == 'true') {
                    //判断是否有最新的活动id和name
                    if (result.data.detailMsg.data.assignedActivities && result.data.detailMsg.data.assignedActivities.length > 0) {
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
    //选择多选
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
    }
    //使用多选框
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
    //搜索加签人员name
    handlerSignAddSearchValue = (value) => {
        this.setState({
            name: value
        })
    }
    //查找加签人员
    handlerSignAddSearch = async () => {
        let result = await sendBpmTaskAJAX('signAdd', this.state);
        this.setState({
            signAddList: result.data.data.content,
            checkedArray: result.data.data.content,
            totalPages: result.data.data.totalPages
        });
    }
    //分页条查询
    handlerSignAddPage = (page) => {
        this.setState({
            pageNum: page
        }, async () => {
            let result = await sendBpmTaskAJAX('signAdd', this.state);
            this.setState({
                signAddList: result.data.data.content,
                checkedArray: result.data.data.content,
                totalPages: result.data.data.totalPages
            });
        });
    }
    //通用关闭方法
    close = () => {
        this.setState({
            signAddShow: false,
            selectedRow: [],
            signAddList: [],
            checkedArray: [],
            checkedAll: false,
            name: ""
        });
    }
    closeHuanjie = () => {
        this.setState({
            huanjieShow: false
        });
    }
    //选择人员后的确定事件
    signAddOK = () => {
        let _index = this.state.editRowIndex;//修改第几个数据
        let sourseArray = this.state.assignInfo.assignInfoItems.slice();
        sourseArray[_index]['participants'] = Array.from(this.state.userIds, x => ({ id: x }));
        this.setState({
            assignInfo: {
                assignInfoItems: sourseArray
            },
            userIds: [],
            signAddShow: false
        });
    }
    //选择完所有加签后的确定事件
    huanjieHandlerOK = async () => {
        let { onSuccess, onError } = this.props;
        let { processDefineCode, assignInfo, obj } = this.state;
        let result = await axios.post(this.props.urlAssignSubmit, {
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
                huanjieShow: false
            });
        } else if (result.data.success == 'fail_global') {
            onError && onError({
                type: 2,
                msg: `提交发生了错误`
            });
        }

    }
    render() {
        let { text } = this.props;
        let self = this;
        let huanjieCol = [{
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: "30%"
        },
        {
            title: "编码",
            dataIndex: "id",
            key: "id",
            width: "30%"
        }, {
            title: "指派",
            dataIndex: "1",
            key: "1",
            width: "30%",
            render(text, record, index) {
                return <Button colors="primary" size="sm" onClick={() => {
                    //提前加载指派人员数据
                    self.handlerSignAddSearch();
                    self.setState({
                        editRowIndex: index,
                        signAddShow: true
                    });
                }}>选择</Button>
            }
        }]
        return (<span>
            <Button className={this.props.className} size="sm" onClick={this.handlerBtn} colors="primary">{text}</Button>
            <Modal
                show={this.state.signAddShow}
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
                show={this.state.huanjieShow}
                backdrop={false}
                onHide={this.closeHuanjie}>
                <Modal.Header closeButton>
                    <Modal.Title> 环节指派 </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table
                        rowKey={record => record.id}
                        columns={huanjieCol}
                        data={this.state.huanjieList}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button colors="primary" style={{ "marginRight": "10px" }} onClick={this.huanjieHandlerOK}> 确定 </Button>
                    <Button colors="primary" onClick={this.closeHuanjie}> 关闭 </Button>
                </Modal.Footer>
            </Modal>
        </span>);
    }
}
BpmButtonSubmit.propTypes = propTypes;
BpmButtonSubmit.defaultProps = {
    checkedArray: [],
    text: "提交",
    nodekey: "003",
    url: "/example/ygdemo_yw_info/submit",
    urlAssignSubmit: "/example/ygdemo_yw_info/assignSubmit",
    className: "",
    multiSelect: {
        type: "checkbox",
        param: "key"
    }
}
export default BpmButtonSubmit;
