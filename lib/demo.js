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
                _react2.default.createElement(_index.BpmTaskApprovalWrap, {
                    onSuccess: function onSuccess() {
                        return console.log('success');
                    },
                    onError: function onError(err) {
                        return console.log(err);
                    },
                    appType: '1',
                    id: '5062f7d0c69e4a28b9e5a424a8ad57cb'
                }),
                _react2.default.createElement(_index.BpmLinkAssign, null),
                _react2.default.createElement(_index.BpmFlowChart, {
                    processDefinitionId: "eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08",
                    processInstanceId: "1352ad87-955e-11e8-b376-02420cbf1b08" }),
                _react2.default.createElement(_index.BpmTable, {
                    processDefinitionId: "eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08",
                    processInstanceId: "1352ad87-955e-11e8-b376-02420cbf1b08"
                }),
                _react2.default.createElement(_index.BpmTestCheckTable, null),
                _react2.default.createElement(
                    _index.BpmButtonSubmit,
                    {
                        funccode: 'masterdetail-one',
                        nodekey: 'purchaseOrder',
                        size: 'md',
                        isOne: true,
                        url: '/iuap-pap-demo-be/purchase_order/submit',
                        urlAssignSubmit: '/iuap-pap-demo-be/purchase_order/assignSubmit',
                        checkedArray: [{ "id": "5062f7d0c69e4a28b9e5a424a8ad57cb", "createTime": "2019-06-20 12:57:38 838", "createUser": "U001", "lastModified": "2019-06-20 12:57:38 838", "lastModifyUser": "U001", "ts": "2019-06-20 12:57:38 838", "newTs": "2019-06-20 15:57:27 301", "dr": 0, "bpmState": 0, "taskKey": null, "taskId": null, "processInstanceId": null, "processDefineCode": null, "comment": null, "bpmStateEnumValue": "待确认", "orderUser": "U001", "orderType": 1, "orderTypeEnumValue": "普通采购", "orderDeptName": "开发部", "orderDept": "1a0b3fc7-2032-42ac-b13f-80dedb5934fe", "orderCode": "B220190620001", "orderPrice": 2, "orderDate": "2019-06-20", "orderUserName": "系统管理员", "orderName": "aa", "tenantid": "tenant", "orderName2": null, "orderName3": null, "orderName4": null, "orderName5": null, "orderName6": null, "bpmBillCode": "201906201557274", "mainBoCode": "PURCHASE_ORDER" }],
                        onSuccess: function onSuccess() {
                            return console.log('success');
                        },
                        onError: function onError(err) {
                            return console.log(err);
                        }
                    },
                    _react2.default.createElement(
                        _tinperBee.Button,
                        { size: 'sm', shape: 'border', className: 'admin' },
                        _react2.default.createElement('i', { className: 'uf uf-arrow-c-o-up' }),
                        '\u63D0\u4EA4'
                    )
                ),
                _react2.default.createElement(
                    _index.BpmButtonRecall,
                    {
                        url: '/iuap_pap_quickstart/example_workorder/recall',
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
                    },
                    _react2.default.createElement(
                        _tinperBee.Button,
                        { size: 'sm', shape: 'border', className: 'admin' },
                        _react2.default.createElement('i', { className: 'uf uf-arrow-c-o-down' }),
                        '\u6536\u56DE'
                    )
                )
            );
        }
    }]);

    return Demo;
}(_react.Component);

exports.default = Demo;