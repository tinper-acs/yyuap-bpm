'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reconvert = exports.approvetypeToText = exports.onRecall = exports.onCommit = exports.queryBpmTemplateAllocate = exports.billidToIds = exports.sendBpmTaskAJAX = exports.getBpmTaskURL = exports.recordToState = exports.descriptionToText = exports.timestampToDate = undefined;

var _reactIntl = require('react-intl');

var _intl = require('./local/intl');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _tinperBee = require('tinper-bee');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timestampToDate = exports.timestampToDate = function timestampToDate(_stamp) {
    var formatStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd  hh:mm:ss';

    var unixTimestamp = new Date(_stamp);
    {
        var str = formatStr;
        var Week = [(0, _intl.getlocals)({ id: "js.b9f.src3.0001", defaultMessage: "日" }), (0, _intl.getlocals)({ id: "js.b9f.src3.0002", defaultMessage: "一" }), (0, _intl.getlocals)({ id: "js.b9f.src3.0003", defaultMessage: "二" }), (0, _intl.getlocals)({ id: "js.b9f.src3.0004", defaultMessage: "三" }), (0, _intl.getlocals)({ id: "js.b9f.src3.0005", defaultMessage: "四" }), (0, _intl.getlocals)({ id: "js.b9f.src3.0006", defaultMessage: "五" }), (0, _intl.getlocals)({ id: "js.b9f.src3.0007", defaultMessage: "六" })];

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
    switch (vApproveType) {
        case 'submit':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0008", defaultMessage: "提交" });
            break;
        case 'agree':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0009", defaultMessage: "审批" });
            break;
        case 'unagree':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0010", defaultMessage: "不同意" });
            break;
        case 'reject':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0011", defaultMessage: "驳回" });
            break;
        case 'signAdd':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0012", defaultMessage: "加签" });
            break;
        case 'signAdding':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0013", defaultMessage: "加签中" });
            break;
        case 'delegate':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0014", defaultMessage: "改派" });
            break;
        case 'termination':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0015", defaultMessage: "终止" });
            break;
        case 'withdraw':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0016", defaultMessage: "删除" });
            break;
        case 'postCompleted':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0009", defaultMessage: "审批" });
            break;
        default:
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0008", defaultMessage: "提交" });
            break;
    }
};
var recordToState = exports.recordToState = function recordToState(record) {
    if (record.description === 'withdraw') {
        return (0, _intl.getlocals)({ id: "js.b9f.src3.0017", defaultMessage: "已完成" });
    } else {
        if (record.endTime && record.startTime) {
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0017", defaultMessage: "已完成" });
        } else if (record.claimTime && new Date() > record.claimTime) {
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0019", defaultMessage: "已逾期" });
        } else {
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0021", defaultMessage: "审批中" });
        }
    }
};

var getBpmTaskURL = exports.getBpmTaskURL = function getBpmTaskURL(type) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/eiap-plus/";

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
            return "/";
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
                taskId: data.taskId,
                copyusers: data.copyusers,
                intersection: data.intersection
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'unagree':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                copyusers: data.copyusers,
                intersection: data.intersection
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'rejectToActivity':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'rejectToBillMaker':
            return _axios2.default.post(getBpmTaskURL(type), {
                activityId: data.activityId,
                approvetype: data.approvetype,
                comment: data.comment,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                copyusers: data.copyusers,
                intersection: data.intersection
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'signAdd':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'delegate':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'withdraw':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'hisTasklist':
            return _axios2.default.post(getBpmTaskURL(type), {
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'commit':
            return _axios2.default.post(getBpmTaskURL(type), {
                activityId: data.activityId,
                activityName: data.activityName,
                comment: data.comment,
                taskId: data.taskId,
                approvetype: data.approvetype,
                processInstanceId: data.processInstanceId,
                participants: data.participants,
                assignInfo: data.assignInfo
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'signaddtask':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                userIds: data.userIds,
                copyusers: data.copyusers,
                intersection: data.intersection
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });
        case 'delegatetask':
            return _axios2.default.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                userId: data.userId,
                copyusers: data.copyusers,
                intersection: data.intersection
            }).catch(function (e) {
                if (e.response && e.response.status == 401) {
                    _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
                    return;
                } else {
                    _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                }
            });

        default:
            break;
    }
    return _axios2.default.post(getBpmTaskURL(type), data).catch(function (e) {
        if (e.response && e.response.status == 401) {
            _tinperBee.Message.create({ content: e.response.data && e.response.data.msg, color: 'danger', position: 'top' });
            return;
        } else {
            _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
        }
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
        data: data['params'] ? data['params'] : data['submitArray'],
        params: { "processDefineCode": data['processDefineCode'] }
    });
};
var onRecall = exports.onRecall = function onRecall(url, data, onError) {
    return (0, _axios2.default)({
        url: '' + url,
        method: "post",
        data: data
    }).catch(function () {
        onError && onError({
            type: 2,
            msg: (0, _intl.getlocals)({ id: "js.b9f.src5.0003", defaultMessage: "服务器请求出错" })
        });
    });
};

var approvetypeToText = exports.approvetypeToText = function approvetypeToText(type) {
    switch (type) {
        case 'agree':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0023", defaultMessage: "审批同意" });
        case 'unagree':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0024", defaultMessage: "审批不同意" });
        case 'rejectToActivity':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0025", defaultMessage: "驳回到环节" });
        case 'rejectToBillMaker':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0026", defaultMessage: "驳回到制单人" });
        case 'signAdd':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0012", defaultMessage: "加签" });
        case 'delegate':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0014", defaultMessage: "改派" });
        case 'withdraw':
            return (0, _intl.getlocals)({ id: "js.b9f.src3.0027", defaultMessage: "弃审" });
        default:
            break;
    }
};

var reconvert = exports.reconvert = function reconvert(str) {
    str = str || '';
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