'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

var _refWithInput = require('yyuap-ref/dist2/refWithInput');

var _refWithInput2 = _interopRequireDefault(_refWithInput);

var _common = require('./common');

var _refOptions = require('./refOptions');

var _refOptions2 = _interopRequireDefault(_refOptions);

var _BpmCopyContent = require('./BpmCopyContent');

var _BpmCopyContent2 = _interopRequireDefault(_BpmCopyContent);

var _BpmFlowChart = require('./BpmFlowChart');

var _BpmFlowChart2 = _interopRequireDefault(_BpmFlowChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    checkedArray: _propTypes2.default.array,
    funccode: _propTypes2.default.string,
    nodekey: _propTypes2.default.string,
    url: _propTypes2.default.string,
    urlAssignSubmit: _propTypes2.default.string,
    className: _propTypes2.default.string,
    filterRefUrl: _propTypes2.default.string,
    refCode: _propTypes2.default.string,
    size: _propTypes2.default.string,
    scrollY: _propTypes2.default.number,
    isOne: _propTypes2.default.bool,
    onSuccess: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    onStart: _propTypes2.default.func,
    onEnd: _propTypes2.default.func
};

var BpmButtonSubmit = function (_Component) {
    _inherits(BpmButtonSubmit, _Component);

    function BpmButtonSubmit() {
        var _this2 = this;

        _classCallCheck(this, BpmButtonSubmit);

        var _this = _possibleConstructorReturn(this, (BpmButtonSubmit.__proto__ || (0, _getPrototypeOf2.default)(BpmButtonSubmit)).call(this));

        _this.getByProcessDefinitionId = function () {
            var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(processDefineCode) {
                var _ref2, _ref2$data, data, flag;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _common.getByFindProcessDefinitionId)(processDefineCode);

                            case 2:
                                _ref2 = _context.sent;
                                _ref2$data = _ref2.data;
                                data = _ref2$data.data;
                                flag = _ref2$data.flag;

                                if (data && flag === "success") {
                                    _this.setState({
                                        processDefinitionId: data.id
                                    });
                                } else {
                                    console.log("根据流程定义key查询processDefinitionId");
                                }

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();

        _this.handlerBtn = _asyncToGenerator(_regenerator2.default.mark(function _callee2() {
            var _this$props, checkedArray, isOne, onStart, onEnd, onSuccess, onError, _ref4, _ref4$data, success, detailMsg, commitParam, _result, flag, arr, _result2, message;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _this$props = _this.props, checkedArray = _this$props.checkedArray, isOne = _this$props.isOne, onStart = _this$props.onStart, onEnd = _this$props.onEnd, onSuccess = _this$props.onSuccess, onError = _this$props.onError;

                            _this.setState({
                                submitStatus: true
                            });

                            if (!(isOne && checkedArray.length >= 2)) {
                                _context2.next = 5;
                                break;
                            }

                            onError && onError({
                                type: 2,
                                msg: '\u8BF7\u9009\u62E9\u5355\u6761\u6570\u636E\u63D0\u4EA4'
                            });
                            return _context2.abrupt('return');

                        case 5:
                            if (!(checkedArray.length > 0)) {
                                _context2.next = 34;
                                break;
                            }

                            if (!(checkedArray[0].bpmState >= 1)) {
                                _context2.next = 9;
                                break;
                            }

                            onError && onError({
                                type: 1,
                                msg: '\u4E0D\u80FD\u63D0\u4EA4\u6B64\u5355\u636E\uFF0C\u91CD\u590D\u63D0\u4EA4'
                            });
                            return _context2.abrupt('return');

                        case 9:
                            onStart && onStart();
                            _context2.next = 12;
                            return (0, _common.queryBpmTemplateAllocate)({
                                funccode: _this.props.funccode,
                                nodekey: _this.props.nodekey
                            });

                        case 12:
                            _ref4 = _context2.sent;
                            _ref4$data = _ref4.data;
                            success = _ref4$data.success;
                            detailMsg = _ref4$data.detailMsg;

                            if (!(success == "success")) {
                                _context2.next = 31;
                                break;
                            }

                            commitParam = {
                                "url": _this.props.url,
                                "processDefineCode": detailMsg.data.res_code,
                                "submitArray": checkedArray
                            };

                            if (detailMsg.data.res_code) {
                                _context2.next = 21;
                                break;
                            }

                            console.log("单据没有关联流程!");
                            return _context2.abrupt('return');

                        case 21:
                            _this.getByProcessDefinitionId(detailMsg.data.res_code);

                            _this.setState({
                                processDefineCode: detailMsg.data.res_code
                            });
                            _context2.next = 25;
                            return (0, _common.onCommit)(commitParam);

                        case 25:
                            _result = _context2.sent;
                            flag = _result.data.success;

                            if (flag == "success" && typeof _result.data.detailMsg.data.assignAble == 'undefined') {
                                onSuccess && onSuccess();
                            } else if (flag == "fail_global") {
                                onError && onError({
                                    type: 2,
                                    msg: (0, _common.reconvert)(_result.data.message) || '流程启动失败'
                                });
                            }

                            if (_result.data.detailMsg.data.assignAble == true) {
                                if (_result.data.detailMsg.data.assignedActivities && _result.data.detailMsg.data.assignedActivities.length > 0) {
                                    onEnd && onEnd();
                                    arr = _result.data.detailMsg.data.assignedActivities.filter(function (item) {
                                        return !item.properties.startactivity;
                                    });

                                    _this.setState({
                                        huanjieShow: true,
                                        chaosongShow: _result.data.detailMsg.data.assignedActivities[0].properties.iscopytouser,
                                        huanjieList: arr,
                                        obj: checkedArray,
                                        assignInfo: {
                                            assignInfoItems: (0, _from2.default)(_result.data.detailMsg.data.assignedActivities, function (x) {
                                                return { activityId: x.id, activityName: x.name, participants: [] };
                                            })
                                        }
                                    });
                                }
                            }
                            _context2.next = 32;
                            break;

                        case 31:
                            if (success == "fail_global") {
                                _result2 = result, message = _result2.data.message;

                                onError && onError({
                                    type: 2,
                                    msg: (0, _common.reconvert)(message) || '流程启动失败'
                                });
                            }

                        case 32:
                            _context2.next = 35;
                            break;

                        case 34:
                            onError && onError({
                                type: 1,
                                msg: '\u8BF7\u9009\u62E9\u63D0\u4EA4\u7684\u5355\u636E'
                            });

                        case 35:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        _this.closeHuanjie = function () {
            _this.setState({
                huanjieShow: false,
                chaosongShow: false,
                childRefKey: [],
                showVal: []
            });
        };

        _this.signAddOK = function () {
            var _index = _this.state.editRowIndex;

            var sourseArray = _this.state.assignInfo.assignInfoItems.slice();

            sourseArray[_index]['participants'] = (0, _from2.default)(_this.state.userIds, function (x) {
                return { id: x.id };
            });
            _this.setState({
                assignInfo: {
                    assignInfoItems: sourseArray
                },
                userIds: []
            });
        };

        _this.huanjieHandlerOK = _asyncToGenerator(_regenerator2.default.mark(function _callee3() {
            var _this$props2, urlAssignSubmit, onSuccess, onError, onStart, onEnd, _this$state, processDefineCode, assignInfo, obj, copyusers, intersection, arr, result;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _this$props2 = _this.props, urlAssignSubmit = _this$props2.urlAssignSubmit, onSuccess = _this$props2.onSuccess, onError = _this$props2.onError, onStart = _this$props2.onStart, onEnd = _this$props2.onEnd;
                            _this$state = _this.state, processDefineCode = _this$state.processDefineCode, assignInfo = _this$state.assignInfo, obj = _this$state.obj, copyusers = _this$state.copyusers, intersection = _this$state.intersection;
                            arr = [];

                            copyusers.map(function (value) {
                                arr = arr.concat(value);
                            });
                            copyusers = arr;

                            onStart && onStart();
                            _context3.next = 8;
                            return _axios2.default.post(urlAssignSubmit, {
                                processDefineCode: processDefineCode,
                                assignInfo: assignInfo,
                                obj: obj,
                                copyusers: copyusers,
                                intersection: intersection

                            }).catch(function (e) {
                                onError && onError({
                                    type: 2,
                                    msg: '\u540E\u53F0\u670D\u52A1\u8BF7\u6C42\u53D1\u751F\u9519\u8BEF'
                                });
                            });

                        case 8:
                            result = _context3.sent;

                            if (result.data.success == 'success') {
                                onSuccess && onSuccess();
                                _this.setState({
                                    huanjieShow: false,
                                    chaosongShow: false,
                                    childRefKey: [],
                                    showVal: []
                                });
                            } else if (result.data.success == 'fail_global') {
                                onError && onError({
                                    type: 2,
                                    msg: (0, _common.reconvert)(result.data.message) || '流程启动失败'
                                });
                                _this.setState({
                                    huanjieShow: false,
                                    chaosongShow: false,
                                    childRefKey: [],
                                    showVal: []
                                });
                            }

                        case 10:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }));

        _this.changeCheck = function () {
            _this.setState({ intersection: !_this.state.intersection });
        };

        _this.state = {
            childRefKey: [],
            userIds: [],
            processDefineCode: "",
            assignInfo: {
                assignInfoItems: []
            },
            obj: [],
            huanjieShow: false,
            huanjieList: [],
            chaosongShow: false,
            editRowIndex: 0,
            showVal: [],
            copyusers: [],
            copyuserShowVal: [],
            intersection: true,
            processDefinitionId: "",
            submitStatus: true
        };
        return _this;
    }

    _createClass(BpmButtonSubmit, [{
        key: 'participantsValidate',
        value: function participantsValidate(sourseArray) {
            var status = true;
            debugger;
            sourseArray.forEach(function (da) {
                if (da.participants && da.participants.length >= 1) {
                    status = false;
                } else {
                    status = true;
                }
            });
            return status;
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            var huanjieCol = [{
                title: "名称",
                dataIndex: "name",
                key: "name",
                width: "40%"
            }, {
                title: "编码",
                dataIndex: "id",
                key: "id",
                width: "40%"
            }, {
                title: "指派",
                dataIndex: "1",
                key: "1",
                width: "20%",
                render: function render(text, record, index) {
                    return _react2.default.createElement(_refWithInput2.default, { disabled: false, option: (0, _assign2.default)(JSON.parse(_refOptions2.default), {
                            title: '指派人员选择',
                            backdrop: false,
                            hasPage: true,
                            refType: 2,
                            isRadio: false,
                            filterRefUrl: self.props.filterRefUrl,
                            className: '',
                            param: {
                                refCode: self.props.refCode,
                                tenantId: '',
                                sysId: '',
                                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION'
                            },

                            keyList: self.state.childRefKey[index] || [],

                            onSave: function onSave(sels, showVal) {
                                console.log(sels);
                                var temp = sels.map(function (v) {
                                    return v.id;
                                });

                                var _showVal = self.state.showVal.slice();
                                _showVal[index] = showVal;

                                var _childRefKey = self.state.childRefKey.slice();
                                _childRefKey[index] = temp;

                                var sourseArray = self.state.assignInfo.assignInfoItems.slice();

                                sourseArray[index]['participants'] = (0, _from2.default)(_childRefKey[index], function (x) {
                                    return { id: x };
                                });
                                self.setState({
                                    childRefKey: _childRefKey,
                                    showVal: _showVal,
                                    assignInfo: {
                                        assignInfoItems: sourseArray
                                    },
                                    submitStatus: self.participantsValidate(sourseArray)
                                });
                            },
                            showVal: self.state.showVal[index],
                            showKey: 'refname',
                            verification: false
                        }) });
                }
            }];

            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'span',
                    { onClick: this.handlerBtn },
                    this.props.children
                ),
                _react2.default.createElement(
                    _tinperBee.Modal,
                    {
                        size: this.props.size,
                        show: this.state.huanjieShow || this.state.chaosongShow,
                        backdrop: false,
                        enforceFocus: false,
                        onHide: this.closeHuanjie },
                    _react2.default.createElement(
                        _tinperBee.Modal.Header,
                        { closeButton: true },
                        _react2.default.createElement(
                            _tinperBee.Modal.Title,
                            null,
                            ' ',
                            this.state.huanjieShow ? '环节指派' : '抄送'
                        )
                    ),
                    this.state.huanjieShow ? _react2.default.createElement(
                        _tinperBee.Modal.Body,
                        null,
                        _react2.default.createElement(_tinperBee.Table, {
                            rowKey: function rowKey(record) {
                                return record.id;
                            },
                            columns: huanjieCol,
                            data: this.state.huanjieList,
                            scroll: { x: "100%", y: 200 }
                        }),
                        _react2.default.createElement(_BpmFlowChart2.default, {
                            processDefinitionId: this.state.processDefinitionId
                        })
                    ) : "",
                    this.state.chaosongShow ? _react2.default.createElement(
                        _tinperBee.Modal.Header,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Modal.Title,
                            null,
                            ' \u6284\u9001 '
                        )
                    ) : "",
                    this.state.chaosongShow ? _react2.default.createElement(
                        _tinperBee.Modal.Body,
                        null,
                        _react2.default.createElement(_BpmCopyContent2.default, _extends({
                            onCopyusersChange: function onCopyusersChange(s) {
                                self.setState({ copyusers: s });
                            }
                        }, self.props, {
                            onintersectionChange: function onintersectionChange(s) {
                                self.setState({ intersection: s });
                            }
                        }))
                    ) : "",
                    _react2.default.createElement(
                        _tinperBee.Modal.Footer,
                        { style: { "position": "relative" } },
                        _react2.default.createElement(
                            'span',
                            { style: { "color": "red", "position": "absolute", "left": "10px", "top": "32%" } },
                            this.state.submitStatus ? "* 请把所有的环节都设置一个指派人" : ""
                        ),
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { style: { "marginRight": "10px" }, onClick: this.closeHuanjie },
                            ' \u5173\u95ED '
                        ),
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'primary', disabled: this.state.submitStatus, onClick: this.huanjieHandlerOK },
                            ' \u786E\u5B9A '
                        )
                    )
                )
            );
        }
    }]);

    return BpmButtonSubmit;
}(_react.Component);

BpmButtonSubmit.propTypes = propTypes;
BpmButtonSubmit.defaultProps = {
    checkedArray: [],
    nodekey: "003",
    funccode: "react",
    url: "/example/ygdemo_yw_info/submit",
    urlAssignSubmit: "/example/ygdemo_yw_info/assignSubmit",
    className: "",
    filterRefUrl: "/iuap_pap_quickstart/common/filterRef",
    refCode: "newuser",
    size: "lg",
    scrollY: 270,
    isOne: false,
    organrefCode: "newdept",
    positonrefCode: "newposition",
    roleRef: "role_new_table",
    userRef: "newuser"
};
exports.default = BpmButtonSubmit;