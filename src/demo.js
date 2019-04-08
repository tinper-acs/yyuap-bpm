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
                    funccode="f3d51126-c5dd-4d23-9c23-9040e405cb37"
                    nodekey="003"
                    size="lg"
                    isOne={false}
                    url={`/iuapmdm/modeling/mdmshow/flowdata/submit`}
                    urlAssignSubmit={`/iuapmdm/modeling/mdmshow/flowdata/assignSubmit`}
                    params={{
                        pk_gd:'f3d51126-c5dd-4d23-9c23-9040e405cb37', // 左侧树主键
                        main:"{\"mdm_datastatus\":\"3\",\"mdm_duplicate\":0,\"dr\":0,\"mdm_code\":\"lctest00100000002\",\"mdm_version\":1,\"name\":\"ee\",\"code\":\"ee\",\"pk_mdm\":\"ba295cb8-cbed-4c46-9bb7-33ead604ae1f\"}",
                        sub:'', // 子表的json对象字符串，需要拼接(可能多个子表，也可能没有)
                    }}
                    onSuccess={() => console.log('success')}
                    onError={(err) => console.log(err)}
                >
                    <Button size='sm' shape="border" className="admin">
                        <i className='uf uf-arrow-c-o-up'></i>提交
                    </Button>
                </BpmButtonSubmit>
                <BpmButtonRecall
                    url={`/iuapmdm/modeling/mdmshow/flowdata/unsubmit`}
                    params={{
                        pk_gd:'f3d51126-c5dd-4d23-9c23-9040e405cb37', // 左侧树主键
                        pk_mdm:"ba295cb8-cbed-4c46-9bb7-33ead604ae1f"
                    }}
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
