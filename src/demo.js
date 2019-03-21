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
                    id="3be26f2debb442d9b5f8012ba40c3fa3"
                />
                <BpmLinkAssign />
                <BpmFlowChart
                    processDefinitionId={"eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08"}
                    processInstanceId={"1352ad87-955e-11e8-b376-02420cbf1b08"}
                />
                <BpmTable
                    processDefinitionId={"eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08"}
                    processInstanceId={"1352ad87-955e-11e8-b376-02420cbf1b08"}
                />
                <BpmTestCheckTable />
                <BpmButtonSubmit
                    funccode="orderinfo"
                    nodekey="003"
                    size="lg"
                    isOne={false}
                    url={`/orderinfo/order_info/submit`}
                    urlAssignSubmit={`/orderinfo/order_info/assignSubmit`}
                    checkedArray={
                        [{"id":"4be5580d9aa54bb4b88b7e63c9da95e1","createTime":"2019-03-20 14:04:26 370","createUser":"b009952b5b604965a744852dc213d208","lastModified":"2019-03-20 14:04:26 370","lastModifyUser":"b009952b5b604965a744852dc213d208","ts":"2019-03-20 14:04:26 370","newTs":"2019-03-21 09:52:19 995","dr":0,"bpmState":0,"taskKey":null,"taskId":null,"processInstanceId":null,"processDefineCode":null,"comment":null,"orderType":"0","orderTypeEnumValue":"生产订单","orderNo":"1234","purOrg":"","releaseTime":"2019-03-20 14:04:19","orderAmount":3,"applyNo":"7475c390-cac5-4287-a022-017205de99f5","purGroupNo":"111","purOrgSrc":null,"confirmTime":"2019-03-20 14:04:19","applyName":"用友集团","orderState":"0","orderStateEnumValue":"未提交","tenantid":"tenant","bpmBillCode":"201903210952195","mainBoCode":"order_info","key":1,"_checked":true}]
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
