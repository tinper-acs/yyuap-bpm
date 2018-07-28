## Bpm流程组件

[![npm version](https://img.shields.io/npm/v/yyuap-bpm.svg)](https://www.npmjs.com/package/yyuap-bpm)
[![NPM downloads](http://img.shields.io/npm/dt/yyuap-bpm.svg?style=flat)](https://npmjs.org/package/yyuap-bpm)



### 1. 简介

> 基于tinper-bee组件库对iUap原有UUI流程业务组件流程部分进行封装React版本

总共包含8种组件，分别是：

序号 | 组件名称 | 备注
---|---|---
1|BpmFlowChart|流程图
2|BpmTable|流程历史表格
3|BpmTaskApproval|流程审批面板
4|BpmButtonSubmit|流程提交按钮
5|BpmButtonRecall|流程收回按钮
6|BpmWrap|包含流程图和流程历史表格
7|BpmTaskApprovalWrap|流程整合审批面板
8|BpmTestCheckTable|测试任务中心表格组件

实际使用中不需要使用全部组件

### 2. 安装

- 通过npm下载使用
`npm install yyuap-bpm -S`

### 3. 使用

如果使用流程图相关组件那么导入:

```js
import { BpmButtonSubmit,BpmButtonRecall,BpmTaskApprovalWrap } from 'yyuap-bpm';
```
然后在render使用的时候传入相应组件需要的参数即可：

```js

//提交流程按钮使用

<BpmButtonSubmit
    className="ml5"
    checkedArray={[{"id":"02a128d65c47405494f8f2baf087117e"}]}
    funccode="react"
    nodekey="003"
    url={`/sany_order/submit`}
    urlAssignSubmit={`/sany_order/assignSubmit`}
    onSuccess={() => console.log('success')}
    onError={(err) => console.log(err)}
    onStart={() => console.log('start loading')}
    onEnd={() => console.log('end loading')}
/>

//收回流程按钮使用

<BpmButtonRecall
    className="ml5"
    checkedArray={[{"id":"02a128d65c47405494f8f2baf087117e"}]}
    url={`/sany_order/recall`}
    onSuccess={() => console.log('success')}
    onError={(err) => console.log(err)}
    onStart={() => console.log('start loading')}
    onEnd={() => console.log('end loading')}
/>

//流程审批面板使用

<BpmTaskApprovalWrap
    id={rowData.id}
    onBpmFlowClick={() => console.log('这里是流程图按钮的事件，用于跳转到流程图组件页面') }
    appType={"1"}
    onSuccess={() => console.log('success')}
    onError={(err) => console.log(err)}
    onStart={() => console.log('start loading')}
    onEnd={() => console.log('end loading')}
/>
```

### 4. API

##### BpmFlowChart

序号 | 参数 | 类型 | 说明
---|---|---|---
1|host|string|请求流程图的接口前缀一般不需要设置默认走本地部署服务
2|processDefinitionId|string|流程图服务必备参数
3|processInstanceId|string|流程图服务必备参数
4|width|string|流程图宽度
5|height|string|流程图高度

##### BpmTable

序号 | 参数 | 类型 | 说明
---|---|---|---
1|host|string|请求流程图的接口前缀一般不需要设置默认走本地部署服务
2|processDefinitionId|string|流程图服务必备参数
3|processInstanceId|string|流程图服务必备参数

##### BpmTaskApproval

序号 | 参数 | 类型 | 说明
---|---|---|---
1|host|string|请求审批的接口前缀一般不需要设置默认走本地部署服务
2|id|string|审批的任务ID
3|appType|string|审批面板类型1=待审批、2=弃审、3=无显示
4|onStart|function|调用异步服务回调，一般用于请求Loading处理
5|onSuccess|function|调用后端服务成功后的回调
6|onError|function|调用后端服务错误后的回调
7|onEnd|function|结束的回调Loading



##### BpmButtonSubmit

序号 | 参数 | 类型 | 说明
---|---|---|---
1|checkedArray|array|传入的选中状态数组(流程单据前面的选择框数据)
2|text|string|按钮的文本，默认提交
3|funccode|string|功能节点编码
4|nodekey|string|nodekey
5|url|string|提交流程所需要的地址，必须传入
6|onSuccess|function|提交流程业务成功后回调
7|onError|function|提交流程业务失败后回调{type:1,msg:"错误消息"}type=1代表逻辑错误，type=2代表服务器错误
8|className|string|传入class
9|onStart|function|调用异步服务回调，一般用于请求Loading处理
10|urlAssignSubmit|string|流程指派最后提交的接口
11|onEnd|function|结束的回调Loading


##### BpmButtonRecall

序号 | 参数 | 类型 | 说明
---|---|---|---
1|checkedArray|array|传入的选中状态数组(流程单据前面的选择框数据)
2|text|string|按钮的文本，默认提交
3|url|string|提交流程所需要的地址，必须传入
4|onSuccess|function|提交流程业务成功后回调
5|onError|function|提交流程业务失败后回调{type:1,msg:"错误消息"}type=1代表逻辑错误，type=2代表服务器错误
6|className|string|传入class
7|onStart|function|调用异步服务回调，一般用于请求Loading处理
8|onEnd|function|结束的回调Loading


##### BpmWrap

> 基于BpmFlowChart和BpmTable组合使用的流程查看组件
当传入id(TaskID)、processDefinitionId、processInstanceId的时候不请求getbillid接口
当只传入id(单据ID)的时候，组件会从getbillid处请求所需要的参数


序号 | 参数 | 类型 | 说明
---|---|---|---
1|id|string|传入的ID(注：只传ID的话，就是单据ID组件会去请求getbillid接口拿到流程需要的参数，如果传递3个参数的话ID就是TaskID,processDefinitionId,processInstanceId)
2|processDefinitionId|string|processDefinitionId
3|processInstanceId|string|processInstanceId


##### BpmTaskApprovalWrap


序号 | 参数 | 类型 | 说明
---|---|---|---
1|id|string|传入的ID(注：只传ID的话，就是单据ID组件会去请求getbillid接口拿到流程需要的参数，如果传递3个参数的话ID就是TaskID,processDefinitionId,processInstanceId)
2|processDefinitionId|string|processDefinitionId
3|processInstanceId|string|processInstanceId
4|onBpmFlowClick|function|流程图按钮单击事件，一般用来给流程图页面跳转路由和参数使用
5|appType|string|审批面板类型1=待审批、2=弃审、3=无显示
6|onStart|function|调用异步服务回调，一般用于请求Loading处理
7|onSuccess|function|调用后端服务成功后的回调
8|onError|function|调用后端服务错误后的回调
9|onEnd|function|结束的回调Loading

##### BpmTestCheckTable

> 用来开发的时候测试任务中心表格，禁止用于生产阶段切记！！！


