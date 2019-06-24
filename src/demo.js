import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import {
    BpmTable,
    BpmFlowChart,
    BpmTaskApproval,
    BpmTestCheckTable,
    BpmWrap,
    BpmTaskApprovalWrap,
    BpmButtonSubmit,
    BpmButtonRecall,
    BpmLinkAssign
} from './index';

import 'tinper-bee/assets/tinper-bee.css';
// import './index.less';

class Demo extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <BpmTaskApprovalWrap
                    onSuccess={() => console.log('success')}
                    onError={(err) => console.log(err)}
                    appType="1"
                    id="5062f7d0c69e4a28b9e5a424a8ad57cb"
                />
                <BpmLinkAssign />
                <BpmFlowChart
                    processDefinitionId={"eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08"}
                    processInstanceId={"1352ad87-955e-11e8-b376-02420cbf1b08"}/>

                <BpmTable
                    processDefinitionId={"eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08"}
                    processInstanceId={"1352ad87-955e-11e8-b376-02420cbf1b08"}
                />

                <BpmTestCheckTable />

                <BpmButtonSubmit
                    funccode="masterdetail-one"
                    nodekey="purchaseOrder"
                    size="md"
                    isOne={true}
                    url={`/iuap-pap-demo-be/purchase_order/submit`}
                    urlAssignSubmit={`/iuap-pap-demo-be/purchase_order/assignSubmit`}
                    checkedArray={
                        [{"id":"5062f7d0c69e4a28b9e5a424a8ad57cb","createTime":"2019-06-20 12:57:38 838","createUser":"U001","lastModified":"2019-06-20 12:57:38 838","lastModifyUser":"U001","ts":"2019-06-20 12:57:38 838","newTs":"2019-06-20 15:57:27 301","dr":0,"bpmState":0,"taskKey":null,"taskId":null,"processInstanceId":null,"processDefineCode":null,"comment":null,"bpmStateEnumValue":"待确认","orderUser":"U001","orderType":1,"orderTypeEnumValue":"普通采购","orderDeptName":"开发部","orderDept":"1a0b3fc7-2032-42ac-b13f-80dedb5934fe","orderCode":"B220190620001","orderPrice":2,"orderDate":"2019-06-20","orderUserName":"系统管理员","orderName":"aa","tenantid":"tenant","orderName2":null,"orderName3":null,"orderName4":null,"orderName5":null,"orderName6":null,"bpmBillCode":"201906201557274","mainBoCode":"PURCHASE_ORDER"}]
                        }
                    onSuccess={() => console.log('success')}
                    onError={(err) => console.log(err)}
                >
                    <Button size='sm' shape="border" className="admin">
                        <i className='uf uf-arrow-c-o-up'></i>提交
                    </Button>
                </BpmButtonSubmit>

                <BpmButtonRecall
                    url={`/iuap_pap_quickstart/example_workorder/recall`}
                    checkedArray={
                        [
                            {
                                "id": "ccb34c6d3fc349789be73678d7cc8fac",
                                "createTime": "2018-07-04 12:36:26 088",
                                "createUser": "U001",
                                "lastModified": "2018-07-04 12:36:26 088",
                                "lastModifyUser": "U001",
                                "ts": "2018-07-04 12:36:26 088",
                                "dr": 0,
                                "bpmState": 1,
                                "taskKey": null,
                                "taskId": null,
                                "processInstanceId": null,
                                "processDefineCode": null,
                                "comment": null,
                                "orderCode": "201807042036265",
                                "orderName": null,
                                "supplier": null,
                                "supplierName": "11",
                                "type": "0",
                                "purchasing": "22",
                                "purchasingGroup": "22",
                                "voucherDate": 1530633600000,
                                "approvalState": null,
                                "confirmState": null,
                                "closeState": null,
                                "type_name": "投诉工单",
                                "approvalState_name": null,
                                "confirmState_name": null,
                                "closeState_name": null,
                                "remark": null,
                                "bpmBillCode": null
                            }
                        ]
                    }
                >
                    <Button size='sm' shape="border" className="admin">
                        <i className='uf uf-arrow-c-o-down'></i>收回
                    </Button>
                </BpmButtonRecall>
            </div>
        );
    }
}

export default Demo;
