/**
 * bpm 提交流程按钮
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal, Table ,Row,Label,Checkbox } from 'tinper-bee';
import RefWithInput from 'yyuap-ref/dist2/refWithInput';
import refOptions from './refOptions';
const propTypes = {
    className: PropTypes.string,
    filterRefUrl: PropTypes.string,
    organrefCode:PropTypes.string,
    positonrefCode:PropTypes.string,
    roleRef:PropTypes.string,
    userRef:PropTypes.string,
    onCopyusersChange: PropTypes.func,
    onintersectionChange: PropTypes.func
};

class BpmCopyContent extends Component {
    constructor() {
        super();
        this.state = {
            childRefKey: [],//参照组件选择的数据
            userIds: [],
            processDefineCode: "",
            assignInfo: {
                assignInfoItems: []
            },
            obj: [],//单据数据
            huanjieShow: false,//环节指派显示
            huanjieList: [],
            chaosongShow:false,//抄送显示
            editRowIndex: 0,
            showVal: [],
            copyusers:[],   //抄送数据
            copyuserShowVal:[], //抄送显示
            intersection:true  //是否交集
        }
    }
    changeCheck=()=> {
        let {onintersectionChange} = this.props;
        this.setState({intersection:!this.state.intersection},()=>{
            onintersectionChange&&onintersectionChange(this.state.intersection);
        });
    }
    render() {
        let self = this;
        const labelStyle={
            "height": "30px",
            "lineHeight": "30px",
            "width": "10%",
            "padding": "15px"
        }
        const refcon={
            "display": "inline-block",
            "width": "36%"
        }
        let organRef ={
            title: '抄送部门选择',
            backdrop: false,
            hasPage: true,
            multiple:true,
            refType: 1,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            filterRefUrl: self.props.filterRefUrl,
            className: '',
            param: {//url请求参数
                refCode: self.props.organrefCode,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            //选择中的数据
            keyList: self.state.copyusers[0]?self.state.copyusers[0]:[],
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"

                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[0] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[0]=Array.from(temp, x => ({ id: x ,type:`DEPTS`}));
                let {onCopyusersChange} = self.props;
                onCopyusersChange && onCopyusersChange(copyusers);
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,

                });
            },
            showVal: self.state.copyuserShowVal[0],
            showKey: 'refname',
            verification: false
        }
        let positonRef ={
            title: '抄送岗位选择',
            backdrop: false,
            hasPage: true,
            multiple:true,
            refType: 1,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            filterRefUrl: self.props.filterRefUrl,
            className: '',
            param: {//url请求参数
                refCode: self.props.positonrefCode,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            //选择中的数据
            keyList: self.state.copyusers[1]?self.state.copyusers[1]:[],
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"

                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[1] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[1] = Array.from(temp, x => ({ id: x ,type:`POSTS`}));
                let {onCopyusersChange} = self.props;
                onCopyusersChange && onCopyusersChange(copyusers);
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,

                });
            },
            showVal: self.state.copyuserShowVal[1],
            showKey: 'refname',
            verification: false
        }
        let roleRef={
            title: '抄送角色选择',
            backdrop: false,
            hasPage: true,
            refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            filterRefUrl: self.props.filterRefUrl,
            className: '',
            param: {//url请求参数
                refCode: self.props.roleRef,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            //选择中的数据
            keyList: self.state.copyusers[2]?self.state.copyusers[2]:[],
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"

                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[2] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[2] = Array.from(temp, x => ({ id: x ,type:`USERGROUP`}));
                let {onCopyusersChange} = self.props;
                onCopyusersChange && onCopyusersChange(copyusers);
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,

                });
            },
            showVal: self.state.copyuserShowVal[2],
            showKey: 'refname',
            verification: false
        }
        let userRef ={
            title: '抄送人员选择',
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
            keyList: self.state.copyusers[3]?self.state.copyusers[3]:[],
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"
                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[3] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[3] = Array.from(temp, x => ({ id: x ,type:`USER`}));
                let {onCopyusersChange} = self.props;
                onCopyusersChange && onCopyusersChange(copyusers);
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,

                });
            },
            showVal: self.state.copyuserShowVal[3],
            showKey: 'refname',
            verification: false
        }
        return (<div>
                    <Row>
                        <Label style={labelStyle} className={`refLabel`}>按部门:</Label>
                        <div style={refcon}>
                            <RefWithInput disabled={false} option={Object.assign(JSON.parse(refOptions),organRef)} />
                        </div>
                        <Label style={labelStyle} className={`refLabel`}>按岗位:</Label>
                        <div style={refcon}>
                            <RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions),positonRef)} />
                        </div>
                    </Row>
                    <Row   style={{'marginTop':'15px','marginBottom':'15px'}}>
                        <Label style={labelStyle} className={`refLabel`}>按角色:</Label>
                        <div style={refcon}>
                            <RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions),roleRef)} />
                        </div>
                        <Label style={labelStyle} className={`refLabel`}>按用户:</Label>
                        <div style={refcon}>
                            <RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions), userRef)} />
                        </div>
                    </Row>
                    <Checkbox style={{ "margin": 0}} checked={this.state.intersection} onChange={this.changeCheck}>是否交集</Checkbox>
        </div>);
    }
}
BpmCopyContent.propTypes = propTypes;
BpmCopyContent.defaultProps = {
    className: "",
    filterRefUrl: "/iuap_pap_quickstart/common/filterRef",
    organrefCode:"newdept",
    positonrefCode:"newposition",
    roleRef:"role_new_table",
    userRef:"newuser"
}
export default BpmCopyContent;
