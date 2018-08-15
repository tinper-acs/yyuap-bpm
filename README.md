## Bpm流程组件

[![npm version](https://img.shields.io/npm/v/yyuap-bpm.svg)](https://www.npmjs.com/package/yyuap-bpm)
[![NPM downloads](http://img.shields.io/npm/dt/yyuap-bpm.svg?style=flat)](https://npmjs.org/package/yyuap-bpm)



### 1. 简介

> 基于 [tinper-bee](http://bee.tinper.org/) 组件库对iUap原有UUI流程业务组件进行封装成React应用组件
> 查看更多应用组件前往 [https://github.com/tinper-acs](https://github.com/tinper-acs)

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

实际使用中不需要使用全部组件，按照自己的业务开发需求选择对应的应用组件即可

### 2. 安装

- 前端工程内置 [tinper-bee](http://bee.tinper.org/) 组件库以及平台参照组件 [yyuap-ref](https://www.npmjs.com/package/yyuap-ref)
- 通过npm下载使用 `npm install yyuap-bpm -S`

### 3. 使用

如果使用流程图相关组件那么导入:

```js
import { BpmButtonSubmit,BpmButtonRecall,BpmTaskApprovalWrap,BpmFlowChart,BpmTable } from 'yyuap-bpm';
```
然后在render使用的时候传入相应组件需要的参数即可：

```js

//提交流程按钮使用

<BpmButtonSubmit
    className="ml5"
    checkedArray={[{"id":"02a128d65c47405494f8f2baf087117e"}]}
    funccode="react"
    nodekey="003"
    refCode="newuser"
    url={`/sany_order/submit`}
    urlAssignSubmit={`/sany_order/assignSubmit`}
    filterRefUrl="/wbalone/common/filterRef"
    onSuccess={() => console.log('success')}
    onError={(err) => console.log(err)}
    onStart={() => console.log('start loading')}
    onEnd={() => console.log('end loading')}
>
    <Button size='sm' shape="border">
        <Icon type='uf-arrow-c-o-up' />提交
    </Button>
</BpmButtonSubmit>

//收回流程按钮使用

<BpmButtonRecall
    className="ml5"
    checkedArray={[{"id":"02a128d65c47405494f8f2baf087117e"}]}
    url={`/sany_order/recall`}
    onSuccess={() => console.log('success')}
    onError={(err) => console.log(err)}
    onStart={() => console.log('start loading')}
    onEnd={() => console.log('end loading')}
>
    <Button size='sm' shape="border">
        <Icon type='uf-arrow-c-o-down' />收回
    </Button>
</BpmButtonRecall>

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

//流程图组件

<BpmFlowChart
    processDefinitionId={"eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08"}
    processInstanceId={"1352ad87-955e-11e8-b376-02420cbf1b08"}
/>

//流程图历史表格组件

<BpmTable
    processDefinitionId={"eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08"}
    processInstanceId={"1352ad87-955e-11e8-b376-02420cbf1b08"}
/>
```

### 4. API

##### BpmFlowChart(流程图)

序号 | 参数 | 类型 | 说明
---|---|---|---
1|url|string|请求流程图的接口默认走平台eiap-plus服务
2|processDefinitionId|string|流程图服务必备参数
3|processInstanceId|string|流程图服务必备参数
4|width|string|流程图宽度
5|height|string|流程图高度

##### BpmTable(流程历史表格)

序号 | 参数 | 类型 | 说明
---|---|---|---
1|processDefinitionId|string|流程图服务必备参数
2|processInstanceId|string|流程图服务必备参数

##### BpmTaskApproval(审批面板)

序号 | 参数 | 类型 | 说明
---|---|---|---
1|id|string|审批的任务ID
2|refCode|string|参照组件需要的refCode
3|appType|string|审批面板类型1=待审批、2=弃审
4|onStart|function|调用异步服务回调，一般用于请求Loading处理
5|onSuccess|function|调用后端服务成功后的回调
6|onError|function|调用后端服务错误后的回调
7|onEnd|function|结束的回调Loading



##### BpmButtonSubmit(流程提交)

序号 | 参数 | 类型 | 说明
---|---|---|---
1|checkedArray|array|传入的选中状态数组(流程单据前面的选择框数据)
2|funccode|string|功能节点编码
3|nodekey|string|nodekey
4|refCode|string|参照组件需要的refCode
5|url|string|提交流程所需要的地址，必须传入
6|urlAssignSubmit|string|流程指派最后提交的接口
7|filterRefUrl|string|参照组件需要的URL
8|onSuccess|function|提交流程业务成功后回调
9|onError|function|提交流程业务失败后回调{type:1,msg:"错误消息"}type=1代表逻辑错误，type=2代表服务器错误
10|className|string|传入class
11|onStart|function|调用异步服务回调，一般用于请求Loading处理
12|onEnd|function|结束的回调Loading
13|size|string|指派弹出modal的尺寸`sm`,`lg`,`xlg`
14|scrollY|number|指派演出modal内的表格滚动高度
15|isOne|bool|是否为一条单据提交默认是多条提交


##### BpmButtonRecall(流程收回)

序号 | 参数 | 类型 | 说明
---|---|---|---
1|checkedArray|array|传入的选中状态数组(流程单据前面的选择框数据)
2|url|string|提交流程所需要的地址，必须传入
3|onSuccess|function|提交流程业务成功后回调
4|onError|function|提交流程业务失败后回调{type:1,msg:"错误消息"}type=1代表逻辑错误，type=2代表服务器错误
5|className|string|传入class
6|onStart|function|调用异步服务回调，一般用于请求Loading处理
7|onEnd|function|结束的回调Loading


##### BpmWrap(流程图+历史表格)

> 基于BpmFlowChart和BpmTable组合使用的流程查看组件
当传入id(TaskID)、processDefinitionId、processInstanceId的时候不请求getbillid接口
当只传入id(单据ID)的时候，组件会从getbillid处请求所需要的参数


序号 | 参数 | 类型 | 说明
---|---|---|---
1|id|string|传入的ID(注：只传ID的话，就是单据ID组件会去请求getbillid接口拿到流程需要的参数，如果传递3个参数的话ID就是TaskID,processDefinitionId,processInstanceId)
2|processDefinitionId|string|processDefinitionId
3|processInstanceId|string|processInstanceId


##### BpmTaskApprovalWrap(审批面板整合)


序号 | 参数 | 类型 | 说明
---|---|---|---
1|id|string|传入的ID(注：只传ID的话，就是单据ID组件会去请求getbillid接口拿到流程需要的参数，如果传递3个参数的话ID就是TaskID,processDefinitionId,processInstanceId)
2|refCode|string|参照组件需要的refCode
3|processDefinitionId|string|processDefinitionId
4|processInstanceId|string|processInstanceId
5|onBpmFlowClick|function|流程图按钮单击事件，一般用来给流程图页面跳转路由和参数使用
6|appType|string|审批面板类型1=待审批、2=弃审、3=无显示
7|onStart|function|调用异步服务回调，一般用于请求Loading处理
8|onSuccess|function|调用后端服务成功后的回调
9|onError|function|调用后端服务错误后的回调
10|onEnd|function|结束的回调Loading

##### BpmTestCheckTable(测试用不要使用在项目里)

> 用来开发的时候测试任务中心表格，禁止用于生产阶段切记！！！


### 5. 指南

1. 审批面板内的流程图按钮事件如何编写？
首先使用审批面板组件
```js
//导入流程审批面板整合组件
import { BpmTaskApprovalWrap } from 'yyuap-bpm';
```
导入组件后，使用我们的组件，传入对应的props，这里主要讲解流程图按钮的后续事件如何做`onBpmFlowClick`
```js
<BpmTaskApprovalWrap
    id={rowData.id}
    onBpmFlowClick={() => { this.onClickToBPM(rowData) }}//拿到我们的行数据，主要用id
    appType={appType}
    onStart={this.onBpmStart}
    onEnd={this.onBpmEnd}
    onSuccess={this.onBpmSuccess}
    onError={this.onBpmError}
/>
```
这里面的`onBpmFlowClick`就是我们需要传入的事件，也就是点击流程图按钮，触发页面跳转带着相应的参数传给我们的流程图页面去使用

编写按钮内的事件
```js
    // 跳转到流程图
    onClickToBPM = (rowData) => {
        actions.routing.push({
            pathname: 'example-chart',//跳转到我们写好的路由流程图那里 /#/templates/example-chart?id=46652dd9900a4f0ca6372eb42a890c83
            search: `?id=${rowData.id}`//构建我们需要的单据ID传入即可，组件内部会请求对应的参数
        })
    }
```
上面就设置好我们流程图按钮带着单据id跳转到流程图路由页面了，接下来去编写最终的流程图页面，一般来说脚手架工程里面已经写好了

```js
//导入我们需要的流程图整合组件，包含流程图和历史审批面板表格
import { BpmWrap } from 'yyuap-bpm';
//以及我们需要使用的参数解析组件
import queryString from 'query-string';
```
然后在我们的render里就可以写组件的使用

**注意这里，如果用户传入id那么processDefinitionId和processInstanceId就无需设置，它会发送请求查询该参数**
**如果三个参数都传递了，那么就不会发送请求，直接调用最终后台接口显示流程图和历史数据表格**
```js
    render() {
        let { id, processDefinitionId, processInstanceId } = queryString.parse(this.props.location.search);
        return (
            <div>
                <BpmWrap
                    id={id}
                    processDefinitionId={processDefinitionId}
                    processInstanceId={processInstanceId}
                />
            </div>
        );
    }
```


### 6. Change Log

[Change Log](https://github.com/tinper-acs/yyuap-bpm/releases)