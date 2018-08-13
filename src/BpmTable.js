/**
 * bpm流程数据历史表格
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'tinper-bee';
import { descriptionToText, sendBpmTaskAJAX, timestampToDate } from './common';
const propTypes = {
    processDefinitionId: PropTypes.string,
    processInstanceId: PropTypes.string
};

class BpmTable extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
        this.columns = [
            {
                title: "任务ID",
                dataIndex: "id",
                key: "id",
                width: "30%"
            },
            {
                title: "任务名称",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "任务类型",
                dataIndex: "description",
                key: "description",
                render: (text, record, index) => {
                    return <div>{descriptionToText(text)}</div>
                }
            },
            {
                title: "执行者",
                dataIndex: "executionId",
                key: "executionId"
            },
            {
                title: "开始时间",
                dataIndex: "startTime",
                key: "startTime",
                render: (text, record, index) => {
                    return <div>{timestampToDate(text)}</div>
                }
            },
            {
                title: "结束时间",
                dataIndex: "endTime",
                key: "endTime",
                render: (text, record, index) => {
                    if (text == null) {
                        return <div>-</div>
                    } else {
                        return <div>{timestampToDate(text)}</div>
                    }
                }
            },
            {
                title: "审批意见",
                dataIndex: "deleteReason",
                key: "deleteReason"
            },
            {
                title: "超时时间",
                dataIndex: "claimTime",
                key: "claimTime"
            }
        ];
    }
    componentDidMount = async () => {
        let { processDefinitionId, processInstanceId } = this.props;
        let hisTasklistData = await sendBpmTaskAJAX('hisTasklist', {
            processDefinitionId,
            processInstanceId
        });
        this.setState({
            data: hisTasklistData.data.data
        });
    }
    render() {
        return (<Table
            bordered
            emptyText={() => <span>暂时没有流程历史数据</span>}
            columns={this.columns}
            data={this.state.data}
        />);
    }
}
BpmTable.propTypes = propTypes;
BpmTable.defaultProps = {
    processDefinitionId: "eiap508870:4:c3bc57e8-631a-11e8-8d04-0686c4000fcf",
    processInstanceId: "d5c3ab59-631a-11e8-8d04-0686c4000fcf"
}
export default BpmTable;
