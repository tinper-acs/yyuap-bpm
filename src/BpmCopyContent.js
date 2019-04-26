/**
 * bpm 提交流程按钮
 */
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import cookie from 'react-cookie'
import {getlocals,FormattedMessage} from './local/intl'
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
            copyusers:[],   //抄送数据
            copyuserShowVal:[], //抄送显示
            copycheckedArray:[],
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
            "padding": "15px",
            "display":"inline"
        }
        const refcon={
            "display": "inline-block",
            "width": "36%"
        }
        let organRef ={
            title: <FormattedMessage id="js.b9f.src7.0001" defaultMessage="抄送部门选择" />,
            backdrop: false,
            hasPage: true,
            multiple:true,
            refType: 1,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            className: '',
            emptyBtn:true,
            param: {//url请求参数
                refCode: self.props.organrefCode,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                locale:cookie.load('u_locale')
            },
            //选择中的数据
            checkedArray:self.state.copycheckedArray[0]||[],
            onCancel: function (p) {
                console.log(p)
            },
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"

                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[0] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[0]=Array.from(temp, x => ({ id: x ,type:`DEPTS`}));
                let arr = self.state.copycheckedArray;
                arr[0] = sels;
                let {onCopyusersChange} = self.props;
                onCopyusersChange && onCopyusersChange(copyusers);

                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,
                    copycheckedArray:arr
                });
            },
            showVal: self.state.copyuserShowVal[0],
            showKey: 'refname',
            verification: false
        }
        let positonRef ={
            title: <FormattedMessage id="js.b9f.src7.0002" defaultMessage="抄送岗位选择" />,
            backdrop: false,
            hasPage: true,
            multiple:true,
            refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            emptyBtn:true,
            className: '',
            param: {//url请求参数
                refCode: self.props.positonrefCode,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                locale:cookie.load('u_locale')
            },
            //选择中的数据
            checkedArray:self.state.copycheckedArray[1]||[],
            onCancel: function (p) {
                console.log(p)
            },
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"

                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[1] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[1] = Array.from(temp, x => ({ id: x ,type:`POSTS`}));
                let arr = self.state.copycheckedArray;
                arr[1] = sels;
                let {onCopyusersChange} = self.props;
                onCopyusersChange && onCopyusersChange(copyusers);
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,
                    copycheckedArray:arr
                });
            },
            showVal: self.state.copyuserShowVal[1],
            showKey: 'refname',
            verification: false
        }
        let roleRef={
            title: <FormattedMessage id="js.b9f.src7.0003" defaultMessage="抄送角色选择" />,
            backdrop: false,
            hasPage: true,
            refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            emptyBtn:true,
            className: '',
            param: {//url请求参数
                refCode: self.props.roleRef,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                locale:cookie.load('u_locale')
            },
            //选择中的数据
            checkedArray:self.state.copycheckedArray[2]||[],
            onCancel: function (p) {
                console.log(p)
            },
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"

                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[2] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[2] = Array.from(temp, x => ({ id: x ,type:`USERGROUP`}));
                let arr = self.state.copycheckedArray;
                arr[2] = sels;
                let {onCopyusersChange} = self.props;
                onCopyusersChange && onCopyusersChange(copyusers);
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,
                    copycheckedArray:arr
                });
            },
            showVal: self.state.copyuserShowVal[2],
            showKey: 'refname',
            verification: false
        }
        let userRef ={
            title: <FormattedMessage id="js.b9f.src7.0004" defaultMessage="抄送用户选择" />,
            backdrop: false,
            hasPage: true,
            emptyBtn:true,
            refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
            isRadio: false,
            className: '',
            param: {//url请求参数
                refCode: self.props.refCode,
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                locale:cookie.load('u_locale')
            },
            //选择中的数据
            checkedArray:self.state.copycheckedArray[3]||[],
            onCancel: function (p) {
                console.log(p)
            },
            //保存回调sels选中的行数据showVal显示的字
            onSave: function (sels, showVal) {//showVal="12;13;管理员"
                var temp = sels.map(v => v.id);
                //显示值
                let copyuserShowVal = self.state.copyuserShowVal.slice();
                copyuserShowVal[3] = showVal;
                //选中的值
                let copyusers = self.state.copyusers.slice();
                copyusers[3] = Array.from(temp, x => ({ id: x ,type:`USER`}));
                let arr = self.state.copycheckedArray;
                arr[3] = sels;
                let {onCopyusersChange} = self.props;
                onCopyusersChange && onCopyusersChange(copyusers);
                self.setState({
                    copyusers: copyusers,
                    copyuserShowVal: copyuserShowVal,
                    copycheckedArray:arr
                });
            },
            showVal: self.state.copyuserShowVal[3],
            showKey: 'refname',
            verification: false
        }
        return (<div>
                    <Row>
                        <Label style={labelStyle} className={`refLabel`}>{<FormattedMessage id="js.b9f.src7.0005" defaultMessage="按部门:" />}</Label>
                        <div style={refcon}>
                            <RefWithInput disabled={false} option={Object.assign(JSON.parse(refOptions),organRef)} />
                        </div>
                        <Label style={labelStyle} className={`refLabel`}>{<FormattedMessage id="js.b9f.src7.0006" defaultMessage="按岗位:" />}</Label>
                        <div style={refcon}>
                            <RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions),positonRef)} />
                        </div>
                    </Row>
                    <Row   style={{'marginTop':'15px','marginBottom':'15px'}}>
                        <Label style={labelStyle} className={`refLabel`}>{<FormattedMessage id="js.b9f.src7.0007" defaultMessage="按角色:" />}</Label>
                        <div style={refcon}>
                            <RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions),roleRef)} />
                        </div>
                        <Label style={labelStyle} className={`refLabel`}>{<FormattedMessage id="js.b9f.src7.0008" defaultMessage="按用户:" />}</Label>
                        <div style={refcon}>
                            <RefWithInput  disabled={false} option={Object.assign(JSON.parse(refOptions), userRef)} />
                        </div>
                    </Row>
                    <Checkbox style={{ "margin": 0}} checked={this.state.intersection} onChange={this.changeCheck}><FormattedMessage id="js.b9f.src7.0009" defaultMessage="是否交集" /></Checkbox>
        </div>);
    }
}
BpmCopyContent.propTypes = propTypes;
BpmCopyContent.defaultProps = {
    className: "",
    filterRefUrl: "/iuap_pap_quickstart/common/filterRef",
    organrefCode:"newdept",
    positonrefCode:"newposition",
    roleRef:"newRoleRef",
    userRef:"relatedUser"
}
export default BpmCopyContent;
