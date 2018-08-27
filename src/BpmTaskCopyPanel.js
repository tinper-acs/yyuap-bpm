/**
 * 审批抄送组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Panel,Col, Row, Button ,Label,Checkbox} from 'tinper-bee';
import classnames from 'classnames'
import BpmCopyContent from "./BpmCopyContent";
const propTypes = {
    panelOpen:PropTypes.bool,//是否默认展开，false默认关闭
    reset:PropTypes.func,//重置的回调
    title: PropTypes.string,
    filterRefUrl: PropTypes.string,
    organrefCode: PropTypes.string,
    positonrefCode: PropTypes.string,
    refCode: PropTypes.string,
    onCopyusersChange:PropTypes.func,
    onintersectionChange:PropTypes.func
};
class BpmTaskCopyPanel extends Component {
    constructor() {
        super();
        this.state = {
            panelOpen:true,
            copyusers:[],   //抄送数据
            copyuserShowVal:[], //抄送显示
            intersection:true
        };
    }
    open=()=>{
        this.setState({
            panelOpen: !this.state.panelOpen
        })
    }
    changeCheck=()=> {
        this.setState({intersection:!this.state.intersection});
    }
    render() {
        let self = this;
        let classes = 'copy-panel';
        let header = () => {
            return (
                <div className="clearfix" onClick={this.open}>
                    <span  className={'copy-panel-title'} style={{"float":"left","color": "#434A54","fontSize": "14px"}}>
                        {this.props.title}
                    </span>
                    <span  className={'copy-panel-icon'} style={{"float":"right", "color": "#1E7BE2","fontSize": "14px"}}>
                        {this.state.panelOpen ? '展开':'收起'}
                        <i className={classnames({
                            'uf': true,
                            'uf-arrow-down': !this.state.panelOpen,
                            'uf-arrow-right': this.state.panelOpen
                        })}/>
                    </span>
                </div>
            )
        };
        return (
            <Panel className={classes} style={{"borderRadius": "0!important","border": "none!important","borderBottom": "1px solid transparent!important"}}  header={header()}  collapsible expanded={this.state.searchOpen}>
                <div className="clearfix">
                    <BpmCopyContent onCopyusersChange={self.props.onCopyusersChange}
                        {...self.props}
                        onintersectionChange={self.props.onintersectionChange}
                    />
                </div>

        </Panel>
        );
    }
}
BpmTaskCopyPanel.propTypes = propTypes;
BpmTaskCopyPanel.defaultProps = {
    panelOpen:false,//是否默认展开，false默认关闭
    selectResult:() => {},// : PropTypes.func,//查询的回调
    reset: () => {},//重置的回调
    title: "抄送(选填)",
    filterRefUrl:'/iuap_pap_quickstart/common/filterRef',
    refCode: "newuser",
    organrefCode:"newdept",
    positonrefCode:"newposition",
    roleRef:"newrole",
    userRef:"newuser"
}
export default BpmTaskCopyPanel;
