'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reconvert = exports.approvetypeToText = exports.onRecall = exports.onCommit = exports.queryBpmTemplateAllocate = exports.billidToIds = exports.sendBpmTaskAJAX = exports.getBpmTaskURL = exports.descriptionToText = exports.timestampToDate = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _tinperBee = require('tinper-bee');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timestampToDate = exports.timestampToDate = function timestampToDate(_stamp) {
    var formatStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd  hh:mm:ss';

    var unixTimestamp = new Date(_stamp);
    {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        str = str.replace(/yyyy|YYYY/, unixTimestamp.getFullYear());
        str = str.replace(/yy|YY/, unixTimestamp.getYear() % 100 > 9 ? (unixTimestamp.getYear() % 100).toString() : '0' + unixTimestamp.getYear() % 100);
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
};

var descriptionToText = exports.descriptionToText = function descriptionToText(vApproveType) {
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
};

var getBpmTaskURL = exports.getBpmTaskURL = function getBpmTaskURL(type) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/eiap-plus/";

    switch (type) {
        case 'agree':
            return root + 'task/completetask/approveCard';
            break;
        case 'unagree':
            return root + 'task/completetask/approveCard';
            break;
        case 'rejectToActivity':
            return root + 'task/rejecttask/bfreject';
            break;
        case 'rejectToBillMaker':
            return root + 'task/rejecttask/reject';
            break;
        case 'signAdd':
            return root + 'task/assignee/getlist';
            break;
        case 'delegate':
            return root + 'task/assignee/getlist';
            break;
        case 'withdraw':
            return root + 'task/withdrawtask/withdraw';
            break;
        default:
            break;
    }
};

var sendBpmTaskAJAX = exports.sendBpmTaskAJAX = function sendBpmTaskAJAX(type, data) {
    switch (type) {
        case 'agree':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch(function (e) {
                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
            });
        case 'unagree':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch(function (e) {
                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
            });
        case 'rejectToActivity':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch(function (e) {
                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
            });
        case 'rejectToBillMaker':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                activityId: "markerbill"
            }).catch(function (e) {
                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
            });
        case 'signAdd':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                name: data.name,
                pageNum: data.pageNum,
                pageSize: data.pageSize
            }).catch(function (e) {
                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
            });
        case 'delegate':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                name: data.name,
                pageNum: data.pageNum,
                pageSize: data.pageSize
            }).catch(function (e) {
                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
            });
        case 'withdraw':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch(function (e) {
                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
            });
        default:
            break;
    }
    return _axios2.default.post(getBpmTaskURL(type), data).catch(function (e) {
        _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
    });
};

var billidToIds = exports.billidToIds = function billidToIds(billId) {
    return _axios2.default.post('/eiap-plus/process/getbillbpm', {
        billId: billId
    });
};
var queryBpmTemplateAllocate = exports.queryBpmTemplateAllocate = function queryBpmTemplateAllocate(obj) {
    return _axios2.default.get('/eiap-plus/appResAllocate/queryBpmTemplateAllocate?_=' + Math.random(), {
        params: {
            funccode: obj.funccode,
            nodekey: obj.nodekey
        }
    });
};
var onCommit = exports.onCommit = function onCommit(data) {
    return (0, _axios2.default)({
        url: '' + data.url,
        method: "post",
        data: data['submitArray'],
        params: { "processDefineCode": data['processDefineCode'] }
    });
};
var onRecall = exports.onRecall = function onRecall(url, data) {
    return (0, _axios2.default)({
        url: '' + url,
        method: "post",
        data: data
    });
};

var approvetypeToText = exports.approvetypeToText = function approvetypeToText(type) {
    switch (type) {
        case 'agree':
            return '审批同意';
            break;
        case 'unagree':
            return '审批不同意';
            break;
        case 'rejectToActivity':
            return '驳回到环节';
            break;
        case 'rejectToBillMaker':
            return '驳回到制单人';
            break;
        case 'signAdd':
            return '加签';
            break;
        case 'delegate':
            return '改派';
            break;
        case 'withdraw':
            return '';
            break;
        default:
            break;
    }
};

var reconvert = exports.reconvert = function reconvert(str) {
    str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2"), 16));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
    });

    return str;
};