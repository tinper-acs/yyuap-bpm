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
                    appType: '2',
                    id: '3be26f2debb442d9b5f8012ba40c3fa3'
                }),
                _react2.default.createElement(_index.BpmFlowChart, {
                    processDefinitionId: "eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08",
                    processInstanceId: "1352ad87-955e-11e8-b376-02420cbf1b08"
                }),
                _react2.default.createElement(_index.BpmTable, {
                    processDefinitionId: "eiap350694:3:e2e70948-9559-11e8-b376-02420cbf1b08",
                    processInstanceId: "1352ad87-955e-11e8-b376-02420cbf1b08"
                }),
                _react2.default.createElement(_index.BpmTestCheckTable, null),
                _react2.default.createElement(_index.BpmButtonSubmit, {
                    funccode: 'ygdemo_yw_info',
                    nodekey: '003',
                    url: '/ygdemo_yw_info/submit',
                    urlAssignSubmit: '/ygdemo_yw_info/assignSubmit',
                    checkedArray: [{ "id": "ea69b9bf-d8b5-47a7-a1fd-1114f36a9321", "code": "180719001", "name": "岳明-01", "ly_code": "1", "ly_sm": '\u5CB3\u660E-01\0', "zr_dw": "97da3229-3308-4492-a457-cb4d4e6264a4", "zr_dw_name": "用友股份", "zrr": null, "xb_dw": null, "xb_dw_name": null, "xbr": null, "begin_date": null, "end_date": null, "zy_cd": 2, "qt_ld": null, "zbr": null, "zbr_name": null, "dbr": null, "jfyq": null, "db_info": null, "jd_bl": null, "rwpf": null, "kpi_flag": 0, "kpi_level": 1, "state": 0, "create_name": null, "create_name_name": null, "create_time": null, "update_name": null, "update_name_name": null, "update_time": null, "unitid": null, "unitid_name": null, "id_ygdemo_yw_sub": null, "metaDefinedName": "ygdemo_yw_info", "namespace": "iuap_qy", "status": 0, "changedPropertyNames": null, "tenant_id": "tenant", "dr": 0, "ts": 1531970736000 }],
                    onSuccess: function onSuccess() {
                        return console.log('success');
                    },
                    onError: function onError(err) {
                        return console.log(err);
                    }
                }),
                _react2.default.createElement(_index.BpmButtonRecall, {
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
                })
            );
        }
    }]);

    return Demo;
}(_react.Component);

exports.default = Demo;