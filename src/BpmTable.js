/**
 * bpm流程数据历史表格
 */

import { defineMessages, injectIntl, intlShape } from 'react-intl';
import {getlocals,FormattedMessage} from './local/intl'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'tinper-bee';
import { descriptionToText, sendBpmTaskAJAX, timestampToDate,recordToState } from './common';
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
            // {
            //     title: "任务ID",
            //     dataIndex: "id",
            //     key: "id",
            //
            // },
            {
                title: <FormattedMessage id="js.b9f.src14.0001" defaultMessage="环节名称" />,
                dataIndex: "name",
                key: "name"
            },
            {
                title: <FormattedMessage id="js.b9f.src14.0002" defaultMessage="任务类型" />,
                dataIndex: "description",
                key: "description",
                render: (text, record, index) => {
                    return <div>{descriptionToText(text)}</div>
                }
            },
            {
                title: <FormattedMessage id="js.b9f.src14.0003" defaultMessage="审批人" />,
                dataIndex: "executionId",
                key: "executionId"
            },
            {
                title: <FormattedMessage id="js.b9f.src14.0004" defaultMessage="开始时间" />,
                dataIndex: "startTime",
                key: "startTime",
                render: (text, record, index) => {
                    return <div>{timestampToDate(text)}</div>
                }
            },
            {
                title: <FormattedMessage id="js.b9f.src14.0005" defaultMessage="结束时间" />,
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
                title: <FormattedMessage id="js.b9f.src14.0006" defaultMessage="任务状态" />,
                dataIndex: "e",
                key: "e",
                render: (text, record, index) => {
                    if (record == null) {
                        return <div>-</div>
                    } else {
                        return <div>{recordToState(record)}</div>
                    }
                }},
            {
                title: <FormattedMessage id="js.b9f.src14.0007" defaultMessage="审批意见" />,
                dataIndex: "deleteReason",
                key: "deleteReason"
            },
            {
                title: <FormattedMessage id="js.b9f.src14.0008" defaultMessage="超时时间" />,
                dataIndex: "claimTime",
                key: "claimTime",
                render: (text, record, index) => {
                    if (text == null) {
                        return <div>-</div>
                    } else {
                        return <div>{timestampToDate(text)}</div>
                    }
                }
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
            emptyText={() => <span><FormattedMessage id="js.b9f.src14.0009" defaultMessage="暂时没有流程历史数据" /></span>}
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
