'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

var _index = require('./index');

require('tinper-bee/assets/tinper-bee.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var Demo = function (_Component) {
    _inherits(Demo, _Component);

    function Demo() {
        _classCallCheck(this, Demo);

        var _this = _possibleConstructorReturn(this, (Demo.__proto__ || (0, _getPrototypeOf2.default)(Demo)).call(this));

        _this.state = {};
        return _this;
    }

    _createClass(Demo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index.BpmTaskApproval, {
                    onError: function onError() {
                        return console.log('error');
                    }
                }),
                _react2.default.createElement(_index.BpmFlowChart, null),
                _react2.default.createElement(_index.BpmTable, null),
                _react2.default.createElement(_index.BpmButtonSubmit, {
                    checkedArray: [{
                        "id": "eb2c8a6bf7c449548740a70e2187da55",
                        "createTime": null,
                        "createUser": null,
                        "lastModified": "2018-07-04 12:35:30 610",
                        "lastModifyUser": "9943304b46df4a85a4e43c95653159d2",
                        "ts": "2018-07-04 08:00:46 163",
                        "dr": 0,
                        "bpmState": 0,
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
                    }, {
                        "id": "ff23d6862b584dbf8f9bd60c9d4c9de6",
                        "createTime": "2018-07-04 12:05:55 941",
                        "createUser": "9943304b46df4a85a4e43c95653159d2",
                        "lastModified": "2018-07-04 12:05:55 941",
                        "lastModifyUser": "9943304b46df4a85a4e43c95653159d2",
                        "ts": "2018-07-04 12:05:55 941",
                        "dr": 0,
                        "bpmState": 0,
                        "taskKey": null,
                        "taskId": null,
                        "processInstanceId": null,
                        "processDefineCode": null,
                        "comment": null,
                        "orderCode": "201807042005558",
                        "orderName": null,
                        "supplier": null,
                        "supplierName": null,
                        "type": null,
                        "purchasing": null,
                        "purchasingGroup": null,
                        "voucherDate": null,
                        "approvalState": null,
                        "confirmState": null,
                        "closeState": null,
                        "type_name": "已办结",
                        "approvalState_name": null,
                        "confirmState_name": null,
                        "closeState_name": null,
                        "remark": null,
                        "bpmBillCode": null
                    }, {
                        "id": "40c8ca155cb24f8fb471dbc6b164bbd0",
                        "createTime": "2018-07-04 12:06:51 479",
                        "createUser": "9943304b46df4a85a4e43c95653159d2",
                        "lastModified": "2018-07-04 12:06:51 479",
                        "lastModifyUser": "9943304b46df4a85a4e43c95653159d2",
                        "ts": "2018-07-04 12:06:51 479",
                        "dr": 0,
                        "bpmState": 0,
                        "taskKey": null,
                        "taskId": null,
                        "processInstanceId": null,
                        "processDefineCode": null,
                        "comment": null,
                        "orderCode": "201807042006515",
                        "orderName": null,
                        "supplier": null,
                        "supplierName": null,
                        "type": null,
                        "purchasing": null,
                        "purchasingGroup": null,
                        "voucherDate": null,
                        "approvalState": null,
                        "confirmState": null,
                        "closeState": null,
                        "type_name": "已办结",
                        "approvalState_name": null,
                        "confirmState_name": null,
                        "closeState_name": null,
                        "remark": null,
                        "bpmBillCode": null
                    }, {
                        "id": "d8180c979d6d49f5a624d66b2ddd8b62",
                        "createTime": "2018-07-04 11:55:25 621",
                        "createUser": "U001",
                        "lastModified": "2018-07-04 11:55:25 621",
                        "lastModifyUser": "U001",
                        "ts": "2018-07-04 11:55:25 621",
                        "dr": 0,
                        "bpmState": 0,
                        "taskKey": null,
                        "taskId": null,
                        "processInstanceId": null,
                        "processDefineCode": null,
                        "comment": null,
                        "orderCode": "201807041955257",
                        "orderName": null,
                        "supplier": null,
                        "supplierName": "1",
                        "type": "0",
                        "purchasing": "2",
                        "purchasingGroup": "3",
                        "voucherDate": 1530633600000,
                        "approvalState": 0,
                        "confirmState": 0,
                        "closeState": 0,
                        "type_name": "投诉工单",
                        "approvalState_name": "未提交",
                        "confirmState_name": "未确认",
                        "closeState_name": "未关闭",
                        "remark": null,
                        "bpmBillCode": null
                    }, {
                        "id": "def3e139d287431caae37466f05a7f6f",
                        "createTime": "2018-07-04 12:32:03 797",
                        "createUser": "U001",
                        "lastModified": "2018-07-04 12:32:03 797",
                        "lastModifyUser": "U001",
                        "ts": "2018-07-04 12:32:03 797",
                        "dr": 0,
                        "bpmState": 0,
                        "taskKey": null,
                        "taskId": null,
                        "processInstanceId": null,
                        "processDefineCode": null,
                        "comment": null,
                        "orderCode": "201807042032039",
                        "orderName": null,
                        "supplier": null,
                        "supplierName": "11",
                        "type": "0",
                        "purchasing": "22",
                        "purchasingGroup": "33",
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
                    }, {
                        "id": "ccb34c6d3fc349789be73678d7cc8fac",
                        "createTime": "2018-07-04 12:36:26 088",
                        "createUser": "U001",
                        "lastModified": "2018-07-04 12:36:26 088",
                        "lastModifyUser": "U001",
                        "ts": "2018-07-04 12:36:26 088",
                        "dr": 0,
                        "bpmState": 0,
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
                    }]
                }),
                _react2.default.createElement(_index.BpmButtonRecall, {
                    checkedArray: [{
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
                    }]
                })
            );
        }
    }]);

    return Demo;
}(_react.Component);

exports.default = Demo;