/**
 * 核心功能函数处理类
 */

import axios from 'axios';
import { Message } from 'tinper-bee';

/**
 * 后端时间戳转换正常日期时间
 * @param {*} _stamp 时间戳
 * @param {*} formatStr 日期格式
 */
export const timestampToDate = (_stamp, formatStr = 'yyyy-MM-dd  hh:mm:ss') => {
    let unixTimestamp = new Date(_stamp);
    {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        str = str.replace(/yyyy|YYYY/, unixTimestamp.getFullYear());
        str = str.replace(/yy|YY/, (unixTimestamp.getYear() % 100) > 9 ? (unixTimestamp.getYear() % 100).toString() : '0' + (unixTimestamp.getYear() % 100));
        var month = unixTimestamp.getMonth() + 1;
        str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
        str = str.replace(/M/g, month);

        str = str.replace(/w|W/g, Week[unixTimestamp.getDay()]);

        str = str.replace(/dd|DD/, unixTimestamp.getDate() > 9 ? unixTimestamp.getDate().toString() : '0' + unixTimestamp.getDate());
        str = str.replace(/d|D/g, unixTimestamp.getDate());

        str = str.replace(/hh|HH/, unixTimestamp.getHours() > 9 ? unixTimestamp.getHours().toString() : '0' + unixTimestamp.getHours());
        str = str.replace(/h|H/g, unixTimestamp.getHours());
        str = str.replace(/mm/, unixTimestamp.getMinutes() > 9 ? unixTimestamp.getMinutes().toString() : '0' + unixTimestamp.getMinutes());
        str = str.replace(/m/g, unixTimestamp.getMinutes());

        str = str.replace(/ss|SS/, unixTimestamp.getSeconds() > 9 ? unixTimestamp.getSeconds().toString() : '0' + unixTimestamp.getSeconds());
        str = str.replace(/s|S/g, unixTimestamp.getSeconds());
        return str;
    }
}

/**
 * 流程历史表格描述转换
 */
export const descriptionToText = (vApproveType) => {
    if (vApproveType == 'submit') {
        return '提交';
    }
    if (vApproveType == 'agree') {
        return '审批';
    }
    if (vApproveType == 'unagree') {
        return '不同意';
    }
    if (vApproveType == 'reject') {
        return '驳回';
    }
    if (vApproveType == 'signAdd') {
        return '加签';
    }
    if (vApproveType == 'signAdding') {
        return '加签中';
    }
    if (vApproveType == 'delegate') {
        return '改派';
    }
    if (vApproveType == 'termination') {
        return '终止';
    }
    if (vApproveType == 'withdraw') {
        return '删除';
    }
    if (vApproveType == 'postCompleted') {
        return '审批';
    }
}

/**
 * 获得处理URL
 */
export const getBpmTaskURL = (type, root = "/eiap-plus/") => {
    switch (type) {
        case 'agree':
            return root + 'task/completetask/approveCard';
        case 'unagree':
            return root + 'task/completetask/approveCard';
        case 'rejectToActivity':
            return root + 'task/rejecttask/bfreject';
        case 'rejectToBillMaker':
            return root + 'task/rejecttask/reject';
        case 'signAdd':
            return root + 'task/assignee/getlist';
        case 'delegate':
            return root + 'task/assignee/getlist';
        case 'withdraw':
            return root + 'task/withdrawtask/withdraw';
        case 'hisTasklist':
            return root + 'process/hisTasklist';
        case 'commit':
            return root + 'task/assigntask/commit';
        case 'signaddtask':
            return root + 'task/signaddtask/signadd';
        case 'delegatetask':
            return root + 'task/delegatetask/delegate';
        default:
            return "/"
            break;
    }
}

/**
 * 发送异步
 */
export const sendBpmTaskAJAX = (type, data) => {
    switch (type) {
        case 'agree':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                copyusers:data.copyusers,
                intersection:data.intersection
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                    Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'unagree':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                copyusers:data.copyusers,
                intersection:data.intersection
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                     Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'rejectToActivity':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                    Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'rejectToBillMaker':
            return axios.post(getBpmTaskURL(type), {
                activityId: data.activityId,
                approvetype: data.approvetype,
                comment: data.comment,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                copyusers:data.copyusers,
                intersection:data.intersection
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                     Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'signAdd':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                    Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'delegate':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                    Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'withdraw':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                    Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'hisTasklist':
            return axios.post(getBpmTaskURL(type), {
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                    Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'commit':
            return axios.post(getBpmTaskURL(type), {
                activityId: data.activityId,
                activityName: data.activityName,
                comment: data.comment,
                taskId: data.taskId,
                approvetype: data.approvetype,
                processInstanceId: data.processInstanceId,
                participants: data.participants
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                    Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'signaddtask':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                userIds: data.userIds,
                copyusers:data.copyusers,
                intersection:data.intersection
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                    Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })
        case 'delegatetask':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                userId: data.userId,
                copyusers:data.copyusers,
                intersection:data.intersection
            }).catch((e) => {
                if (e.response && e.response.status == 401){
                     Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
                    return;
                }else{
                    Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
                }
            })

        default:
            break;
    }
    return axios.post(getBpmTaskURL(type), data).catch((e) => {
        if (e.response && e.response.status == 401){
             Message.create({content: e.response.data && e.response.data.msg, color: 'danger', position: 'top'})
            return;
        }else{
            Message.create({content: `${e.toString()}`, color: 'danger', position: 'top'})
        }
    })
}

/**
 * 通过billID获得流程图参数
 */
export const billidToIds = (billId) => {
    return axios.post('/eiap-plus/process/getbillbpm', {
        billId
    });
}
/**
 * 查询数据
 */
export const queryBpmTemplateAllocate = (obj) => {
    return axios.get(`/eiap-plus/appResAllocate/queryBpmTemplateAllocate?_=${Math.random()}`, {
        params: {
            funccode: obj.funccode,
            nodekey: obj.nodekey
        }
    });
}
/**
 * 提交流程
 */
export const onCommit = (data) => {
    return axios({
        url: `${data.url}`,
        method: "post",
        data: data['submitArray'],
        params: { "processDefineCode": data['processDefineCode'] }
    });
}
/**
 * 收回流程
 */
export const onRecall = (url, data) => {
    return axios({
        url: `${url}`,
        method: "post",
        data: data
    });
}

/**
 * 审批状态类型返回默认审批文案
 */
export const approvetypeToText = (type) => {
    switch (type) {
        case 'agree':
            return '审批同意';
        case 'unagree':
            return '审批不同意';
        case 'rejectToActivity':
            return '驳回到环节';
        case 'rejectToBillMaker':
            return '驳回到制单人';
        case 'signAdd':
            return '加签';
        case 'delegate':
            return '改派';
        case 'withdraw':
            return '弃审';
        default:
            break;
    }
}

/**
 * Unicode编码转换
 */
export const reconvert = (str) => {
    str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
    });

    return str;
}