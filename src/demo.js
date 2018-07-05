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
    BpmButtonRecall
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
                <BpmTaskApproval
                    onError={() => console.log('error')}
                />
                <BpmFlowChart />
                <BpmTable />
                <BpmButtonSubmit
                    funccode="react"
                    nodekey="003"
                    url={`/iuap_pap_quickstart/example_workorder/submit`}
                    checkedArray={
                        [
                            {
                                "id": "eb2c8a6bf7c449548740a70e2187da55",
                                "createTime": null,
                                "createUser": null,
                                "lastModified": "2018-07-04 12:35:30 610",
                                "lastModifyUser": "9943304b46df4a85a4e43c95653159d2",
                                "ts": "2018-07-04 08:00:46 163",
                                "dr": 0,
                                "bpmState": 1,
                                "taskKey": null,
                                "taskId": null,
                                "processInstanceId": null,
                                "processDefineCode": null,
                                "comment": null,
                                "orderCode": "201807041600464",
                                "orderName": null,
                                "supplier": null,
                                "supplierName": "16供应商名称",
                                "type": "0",
                                "purchasing": "16采购组织",
                                "purchasingGroup": "14采购组",
                                "voucherDate": 1530633600000,
                                "approvalState": 1,
                                "confirmState": 0,
                                "closeState": 0,
                                "type_name": "投诉工单",
                                "approvalState_name": "已提交",
                                "confirmState_name": "未确认",
                                "closeState_name": "未关闭",
                                "remark": null,
                                "bpmBillCode": null
                            }
                        ]
                    }
                />
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
                />
            </div>
        );
    }
}

export default Demo;
