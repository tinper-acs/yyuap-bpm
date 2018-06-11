## Bpm流程组件

[![npm version](https://img.shields.io/npm/v/yyuap-bpm.svg)](https://www.npmjs.com/package/yyuap-bpm)
[![NPM downloads](http://img.shields.io/npm/dt/yyuap-bpm.svg?style=flat)](https://npmjs.org/package/yyuap-bpm)



### 1. 简介

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

实际使用中不需要使用全部组件

### 2. 安装

- 通过npm下载使用
`npm install yyuap-bpm -S`

### 3. 使用

如果使用流程图相关组件那么导入:

```js
import { BpmWrap } from 'yyuap-bpm';
```
然后在render使用的时候传入相应组件需要的参数即可：

```js
<BpmWrap
    id={id}
    processDefinitionId={processDefinitionId}
    processInstanceId={processInstanceId}
/>
```

### 4. API

##### BpmFlowChart

序号 | 参数 | 类型 | 说明
---|---|---|---|---
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


##### BpmButtonSubmit

序号 | 参数 | 类型 | 说明
---|---|---|---
1|checkedArray|array|传入的选中状态数组(流程单据前面的选择框数据)
2|data|array|单据表格的数据(流程单据表格的data数据)
3|text|string|按钮的文本，默认提交
4|funccode|string|功能节点编码
5|nodekey|string|nodekey
6|url|string|提交流程所需要的地址，必须传入
7|onSuccess|function|提交流程业务成功后回调
8|onError|function|提交流程业务失败后回调


##### BpmButtonRecall

序号 | 参数 | 类型 | 说明
---|---|---|---
1|checkedArray|array|传入的选中状态数组(流程单据前面的选择框数据)
2|data|array|单据表格的数据(流程单据表格的data数据)
3|text|string|按钮的文本，默认提交
4|url|string|提交流程所需要的地址，必须传入
5|onSuccess|function|提交流程业务成功后回调
6|onError|function|提交流程业务失败后回调


##### BpmWrap

> 基于BpmFlowChart和BpmTable组合使用的流程查看组件
当传入id(TaskID)、processDefinitionId、processInstanceId的时候不请求getbillid接口
当只传入id(单据ID)的时候，组件会从getbillid处请求所需要的参数


序号 | 参数 | 类型 | 说明
---|---|---|---
1|id|string|传入的ID(注：只传ID的话，就是单据ID组件会去请求getbillid接口拿到流程需要的参数，如果传递3个参数的话ID就是TaskID,processDefinitionId,processInstanceId)
2|processDefinitionId|string|processDefinitionId
3|processInstanceId|string|processInstanceId


##### BpmTaskApprovalWrap


序号 | 参数 | 类型 | 说明
---|---|---|---
1|id|string|传入的ID(注：只传ID的话，就是单据ID组件会去请求getbillid接口拿到流程需要的参数，如果传递3个参数的话ID就是TaskID,processDefinitionId,processInstanceId)
2|processDefinitionId|string|processDefinitionId
3|processInstanceId|string|processInstanceId
4|onBpmFlowClick|function|流程图按钮单击事件，一般用来给流程图页面跳转路由和参数使用


##### BpmTestCheckTable

> 用来开发的时候测试任务中心表格，禁止用于生产阶段切记！！！


