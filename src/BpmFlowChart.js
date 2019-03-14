/**
 * bpm流程图组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
    url: PropTypes.string,
    processDefinitionId: PropTypes.string,
    processInstanceId: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

class BpmFlowChart extends Component {
    render() {
        let { processDefinitionId, processInstanceId, width, height, url } = this.props;
        return (
            <div>
                <iframe
                    style={{ width, height, "minHeight": "300px" }}
                    src={`${url}?procDefId=${processDefinitionId}&procInstId=${processInstanceId}`}
                    frameBorder="0"
                >
                </iframe>
            </div>
        );
    }
}
BpmFlowChart.propTypes = propTypes;
BpmFlowChart.defaultProps = {
    url: "/ubpm-web-process-designer/process-designer/index.html#/processDetail",
    width: "99%",
    height: "300px",
    processDefinitionId: "eiap508870:4:c3bc57e8-631a-11e8-8d04-0686c4000fcf",
    processInstanceId: "d5c3ab59-631a-11e8-8d04-0686c4000fcf"
}

export default BpmFlowChart;