/**
 * 流程图 + table 格式的环节流程指派。
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'tinper-bee';
import BpmFlowChart from './BpmFlowChart';
// import BpmTable from './BpmTable';
import { billidToIds } from './common';


const propTypes = {
    id: PropTypes.string,
    processDefinitionId: PropTypes.string,
    processInstanceId: PropTypes.string,

}
class BpmLinkAssignWrap extends Component {
    constructor() {
        super();
        this.state = {
            processDefinitionId: "",
            processInstanceId: ""
        }
    }

    componentWillMount = async () => {
        if (!this.props.processDefinitionId) {//督办查看详情
            let pID = await billidToIds(this.props.id);
            let { processDefinitionId, processInstanceId } = pID.data;
            this.setState({
                processDefinitionId,
                processInstanceId
            });
        } else {//从任务中心跳转
            this.setState({
                processDefinitionId: this.props.processDefinitionId,
                processInstanceId: this.props.processInstanceId
            });
        }

    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={12}>
                        {this.state.processDefinitionId && <BpmFlowChart
                            processDefinitionId={this.state.processDefinitionId}
                            processInstanceId={this.state.processInstanceId}
                        />}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {this.state.processDefinitionId && <BpmLinkAssign
                            // processDefinitionId={this.state.processDefinitionId}
                            // processInstanceId={this.state.processInstanceId}
                            // axiosType=""
                        />}
                    </Col>
                </Row>
            </div>
        );
    }
}
BpmLinkAssignWrap.propTypes = propTypes;
BpmLinkAssignWrap.defaultProps = {
    id: ""
}
export default BpmLinkAssignWrap;
