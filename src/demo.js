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
                <BpmTaskApprovalWrap
                    onSuccess={() => console.log('success')}
                    onError={() => console.log('error')}
                    appType="1"
                    id="ea69b9bf-d8b5-47a7-a1fd-1114f36a9321"
                />
                <BpmFlowChart />
                <BpmTable />
                <BpmButtonSubmit
                    funccode="ygdemo_yw_info"
                    nodekey="003"
                    url={`/ygdemo_yw_info/submit`}
                    urlAssignSubmit={`/ygdemo_yw_info/assignSubmit`}
                    checkedArray={
                        [
                            { "id": "ea69b9bf-d8b5-47a7-a1fd-1114f36a9321", "code": "180719001", "name": "岳明-01", "ly_code": "1", "ly_sm": "岳明-01\u0000", "zr_dw": "97da3229-3308-4492-a457-cb4d4e6264a4", "zr_dw_name": "用友股份", "zrr": null, "xb_dw": null, "xb_dw_name": null, "xbr": null, "begin_date": null, "end_date": null, "zy_cd": 2, "qt_ld": null, "zbr": null, "zbr_name": null, "dbr": null, "jfyq": null, "db_info": null, "jd_bl": null, "rwpf": null, "kpi_flag": 0, "kpi_level": 1, "state": 0, "create_name": null, "create_name_name": null, "create_time": null, "update_name": null, "update_name_name": null, "update_time": null, "unitid": null, "unitid_name": null, "id_ygdemo_yw_sub": null, "metaDefinedName": "ygdemo_yw_info", "namespace": "iuap_qy", "status": 0, "changedPropertyNames": null, "tenant_id": "tenant", "dr": 0, "ts": 1531970736000 }
                        ]
                    }
                    onSuccess={() => console.log('success')}
                    onError={(err) => console.log(err)}
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
