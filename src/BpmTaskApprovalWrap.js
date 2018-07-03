/**
 * 审批逻辑组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'tinper-bee';
import BpmTaskApproval from './BpmTaskApproval';
import { billidToIds } from './common';


const propTypes = {
    id: PropTypes.string,
    processDefinitionId: PropTypes.string,
    processInstanceId: PropTypes.string,
    onBpmFlowClick: PropTypes.func,
    appType: PropTypes.string,
    onStart: PropTypes.func
}
class BpmTaskApprovalWrap extends Component {
    constructor() {
        super();
        this.state = {
            isShowFlowBtn: false,
            id: "",
            taskId: "",
            processDefinitionId: "",
            processInstanceId: ""
        }
    }

    componentWillMount = async () => {
        if (!this.props.processDefinitionId) {//督办查看详情
            let pID = await billidToIds(this.props.id);
            if (pID.data.message && pID.data.message == 'NoBpm') {
                // console.log('NoBpm');
                this.setState({
                    isShowFlowBtn: false
                });
            } else if (pID.data.taskId) {
                let { processDefinitionId, processInstanceId, taskId } = pID.data;
                this.setState({
                    id: taskId,
                    processDefinitionId,
                    processInstanceId
                });
            } else {
                this.setState({
                    isShowFlowBtn: true
                });
            }
        } else {//从任务中心跳转
            this.setState({
                processDefinitionId: this.props.processDefinitionId,
                processInstanceId: this.props.processInstanceId,
                id: this.props.id
            });
        }

    }

    render() {
        return (
            <div className="clearfix">
                {this.state.processDefinitionId && <Row>
                    <Col md={12}>
                        <BpmTaskApproval
                            id={this.state.id}
                            onBpmFlowClick={this.props.onBpmFlowClick}
                            processDefinitionId={this.state.processDefinitionId}
                            processInstanceId={this.state.processInstanceId}
                            appType={this.props.appType}
                            onStart={this.props.onStart}
                        />
                    </Col>
                </Row>}
                {this.state.isShowFlowBtn && <Row>
                    <Col md={12}>
                        <Col mdOffset={10} md={2}>
                            <Button onClick={this.props.onBpmFlowClick} style={{ "marginRight": "10px" }} colors="primary">流程图</Button>
                        </Col>
                    </Col>
                </Row>}
            </div>
        );
    }
}
BpmTaskApprovalWrap.propTypes = propTypes;
BpmTaskApprovalWrap.defaultProps = {
    id: "",
    appType: "1"
}
export default BpmTaskApprovalWrap;
