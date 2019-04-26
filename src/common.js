/**
 * 核心功能函数处理类
 */
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import {getlocals,FormattedMessage} from './local/intl'
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
        var Week = [getlocals({id:"js.b9f.src3.0001" ,defaultMessage:"日" }), getlocals({id:"js.b9f.src3.0002" ,defaultMessage:"一" }), getlocals({id:"js.b9f.src3.0003" ,defaultMessage:"二" }), getlocals({id:"js.b9f.src3.0004" ,defaultMessage:"三" }), getlocals({id:"js.b9f.src3.0005" ,defaultMessage:"四" }), getlocals({id:"js.b9f.src3.0006" ,defaultMessage:"五" }), getlocals({id:"js.b9f.src3.0007" ,defaultMessage:"六" })];

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
export const descriptionToText = (vApproveType) =>{
    switch (vApproveType){
        case 'submit':
            return getlocals({id: "js.b9f.src3.0008", defaultMessage: "提交"});
            break;
        case 'agree':
            return getlocals({id: "js.b9f.src3.0009", defaultMessage: "审批"});
            break;
        case 'unagree':
            return getlocals({id: "js.b9f.src3.0010", defaultMessage: "不同意"});
            break;
        case 'reject':
            return getlocals({id: "js.b9f.src3.0011", defaultMessage: "驳回"});
            break;
        case  'signAdd':
            return getlocals({id: "js.b9f.src3.0012", defaultMessage: "加签"});
            break;
        case 'signAdding':
            return getlocals({id: "js.b9f.src3.0013", defaultMessage: "加签中"});
            break;
        case 'delegate':
            return getlocals({id: "js.b9f.src3.0014", defaultMessage: "改派"});
            break;
        case 'termination':
            return getlocals({id: "js.b9f.src3.0015", defaultMessage: "终止"});
            break;
        case 'withdraw':
            return getlocals({id: "js.b9f.src3.0016", defaultMessage: "删除"});
            break;
        case 'postCompleted':
            return getlocals({id: "js.b9f.src3.0009", defaultMessage: "审批"});
            break;
        default:
            return getlocals({id: "js.b9f.src3.0008", defaultMessage: "提交"});
            break;
    }

}
export const  recordToState=(record)=>{
   if (record.description === 'withdraw') {
       return getlocals({id:"js.b9f.src3.0017" ,defaultMessage:"已完成" });
   }else{
       if(record.endTime && record.startTime){
           return getlocals({id:"js.b9f.src3.0017" ,defaultMessage:"已完成" });//getlocals({id:"js.b9f.src3.0018" ,defaultMessage:"有开始时间 有结束时间为已完成" })
       }else if(record.claimTime && new Date() >record.claimTime){
           return getlocals({id:"js.b9f.src3.0019" ,defaultMessage:"已逾期" });//getlocals({id:"js.b9f.src3.0020" ,defaultMessage:"当前时间大于超时时间" })
       }else{
           return getlocals({id:"js.b9f.src3.0021" ,defaultMessage:"审批中" });//getlocals({id:"js.b9f.src3.0022" ,defaultMessage:"其他情况为审批中" })
       }
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
                participants: data.participants,
                assignInfo:data.assignInfo
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
export const onRecall = (url, data,onError) => {
    return axios({
        url: `${url}`,
        method: "post",
        data: data
    }).catch(function () {
        onError && onError({
            type: 2,
            msg: getlocals({id:"js.b9f.src5.0003" ,defaultMessage:"服务器请求出错" })
        })
    });
}

/**
 * 审批状态类型返回默认审批文案
 */
export const approvetypeToText = (type) => {
    switch (type) {
        case 'agree':
            return getlocals({id:"js.b9f.src3.0023",defaultMessage:"审批同意" });
        case 'unagree':
            return getlocals({id:"js.b9f.src3.0024",defaultMessage:"审批不同意" });
        case 'rejectToActivity':
            return getlocals({id:"js.b9f.src3.0025",defaultMessage:"驳回到环节" });
        case 'rejectToBillMaker':
            return getlocals({id:"js.b9f.src3.0026",defaultMessage:"驳回到制单人" });
        case 'signAdd':
            return getlocals({id:"js.b9f.src3.0012",defaultMessage:"加签" });
        case 'delegate':
            return getlocals({id:"js.b9f.src3.0014",defaultMessage:"改派" });
        case 'withdraw':
            return getlocals({id:"js.b9f.src3.0027",defaultMessage:"弃审" });
        default:
            break;
    }
}

/**
 * Unicode编码转换
 */
export const reconvert = (str) => {
    str = str||'';
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
