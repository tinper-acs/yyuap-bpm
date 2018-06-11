/**
 * bpm流程图组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
    processDefinitionId: PropTypes.string,
    processInstanceId: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    host: PropTypes.string
};

class BpmFlowChart extends Component {
    render() {
        let { processDefinitionId, processInstanceId, width, height,host } = this.props;
        return (
            <div>
                <iframe
                    style={{ width, height, "minHeight": "300px" }}
                    src={`${host}/eiap-plus/vendor/diagram-viewer/index.html?processDefinitionId=${processDefinitionId}&processInstanceId=${processInstanceId}`}
                    frameBorder="0"
                >
                </iframe>
            </div>
        );
    }
}
BpmFlowChart.propTypes = propTypes;
BpmFlowChart.defaultProps = {
    width: "99%",
    height: "300px",
    processDefinitionId: "eiap508870:4:c3bc57e8-631a-11e8-8d04-0686c4000fcf",
    processInstanceId: "d5c3ab59-631a-11e8-8d04-0686c4000fcf",
    host: ""
}

export default BpmFlowChart;