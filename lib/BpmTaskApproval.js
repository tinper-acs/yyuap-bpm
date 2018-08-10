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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

var _yyuapRef = require('yyuap-ref');

var _yyuapRef2 = _interopRequireDefault(_yyuapRef);

var _common = require('./common');

var _refOptions = require('./refOptions');

var _refOptions2 = _interopRequireDefault(_refOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    id: _propTypes2.default.string,
    appType: _propTypes2.default.string,
    refCode: _propTypes2.default.string,
    onBpmFlowClick: _propTypes2.default.func,
    onStart: _propTypes2.default.func,
    onEnd: _propTypes2.default.func,
    onSuccess: _propTypes2.default.func,
    onError: _propTypes2.default.func
};

var BpmTaskApproval = function (_Component) {
    _inherits(BpmTaskApproval, _Component);

    function BpmTaskApproval(props) {
        var _this2 = this;

        _classCallCheck(this, BpmTaskApproval);

        var _this = _possibleConstructorReturn(this, (BpmTaskApproval.__proto__ || (0, _getPrototypeOf2.default)(BpmTaskApproval)).call(this, props));

        _this.componentWillMount = function () {};

        _this.componentDidMount = function () {
            if (_this.props.appType == "2") {
                _this.setState({
                    approvetype: "withdraw",
                    comment: (0, _common.approvetypeToText)("withdraw")
                });
            }
        };

        _this.handleChange = function (value) {
            _this.setState({ approvetype: value, comment: (0, _common.approvetypeToText)(value) });
        };

        _this.handlerCommentChange = function (e) {
            _this.setState({ comment: e.target.value });
        };

        _this.handlerSubmitBtn = _asyncToGenerator(_regenerator2.default.mark(function _callee4() {
            var _this$props, onStart, onEnd, onSuccess, onError, result, options;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _this$props = _this.props, onStart = _this$props.onStart, onEnd = _this$props.onEnd, onSuccess = _this$props.onSuccess, onError = _this$props.onError;

                            if (!(_this.state.comment == "")) {
                                _context4.next = 4;
                                break;
                            }

                            _tinperBee.Message.create({ content: '不能为空', color: 'danger', position: 'top' });
                            return _context4.abrupt('return');

                        case 4:
                            onStart && onStart();
                            _context4.next = 7;
                            return (0, _common.sendBpmTaskAJAX)(_this.state.approvetype, _this.state);

                        case 7:
                            result = _context4.sent;
                            _context4.t0 = _this.state.approvetype;
                            _context4.next = _context4.t0 === 'agree' ? 11 : _context4.t0 === 'unagree' ? 11 : _context4.t0 === 'rejectToActivity' ? 14 : _context4.t0 === 'signAdd' ? 16 : _context4.t0 === 'delegate' ? 18 : 20;
                            break;

                        case 11:
                            if (result.data.flag == 'success') {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'info', position: 'top' });
                                onSuccess && onSuccess();
                            } else if (result.data.flag == 'faile') {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: result.data.msg
                                });
                            }

                            if (result.data.assignAble) {
                                if (result.data.assignList.length > 0) {
                                    _this.setState({
                                        HuoDongID: result.data.assignList[0].activityId,
                                        HuoDongName: result.data.assignList[0].activityName
                                    });
                                }

                                onEnd && onEnd();
                                options = (0, _assign2.default)(JSON.parse(_refOptions2.default), {
                                    title: '人员选择',
                                    backdrop: false,
                                    hasPage: true,
                                    refType: 2,
                                    isRadio: false,
                                    className: '',
                                    param: {
                                        refCode: _this.props.refCode,
                                        tenantId: '',
                                        sysId: '',
                                        transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION'
                                    },

                                    keyList: [],

                                    onSave: function () {
                                        var _ref2 = _asyncToGenerator(_regenerator2.default.mark(function _callee(sels, showVal) {
                                            var agreeeMsg;
                                            return _regenerator2.default.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            onStart && onStart();
                                                            _context.next = 3;
                                                            return (0, _common.sendBpmTaskAJAX)('commit', {
                                                                activityId: _this.state.HuoDongID,
                                                                activityName: _this.state.HuoDongName,
                                                                comment: _this.state.comment,
                                                                taskId: _this.state.taskId,
                                                                approvetype: _this.state.approvetype,
                                                                processInstanceId: _this.state.processInstanceId,
                                                                participants: (0, _from2.default)(sels, function (x) {
                                                                    return { id: x.id };
                                                                })
                                                            }).catch(function (e) {
                                                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                                                onError && onError({
                                                                    type: 2,
                                                                    msg: '\u670D\u52A1\u5668\u8BF7\u6C42\u51FA\u9519'
                                                                });
                                                            });

                                                        case 3:
                                                            agreeeMsg = _context.sent;

                                                            if (agreeeMsg.data.flag == 'success') {
                                                                _tinperBee.Message.create({ content: '' + agreeeMsg.data.msg, color: 'info', position: 'top' });
                                                                _this.setState({
                                                                    rejectlist: [],
                                                                    selectedRow: []
                                                                });
                                                                onSuccess && onSuccess();
                                                            } else {
                                                                _tinperBee.Message.create({ content: '' + agreeeMsg.data.msg, color: 'danger', position: 'top' });
                                                                onError && onError({
                                                                    type: 2,
                                                                    msg: agreeeMsg.data.msg
                                                                });
                                                            }

                                                        case 5:
                                                        case 'end':
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, _this2);
                                        }));

                                        return function onSave(_x, _x2) {
                                            return _ref2.apply(this, arguments);
                                        };
                                    }(),
                                    showVal: '',
                                    showKey: 'refname',
                                    verification: false
                                });

                                (0, _yyuapRef2.default)(options);
                            }
                            return _context4.abrupt('break', 22);

                        case 14:
                            if (result.data.flag == 'success') {
                                onEnd && onEnd();
                                _this.setState({
                                    rejectlist: result.data.rejectlist,
                                    selectedRow: new Array(result.data.rejectlist.length),
                                    rejectToActivityShow: true
                                });
                            } else {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: result.data.msg
                                });
                            }
                            return _context4.abrupt('break', 22);

                        case 16:
                            if (result.data.status == 1) {
                                onEnd && onEnd();
                                options = (0, _assign2.default)(JSON.parse(_refOptions2.default), {
                                    title: '加签人员',
                                    backdrop: false,
                                    hasPage: true,
                                    refType: 2,
                                    isRadio: false,
                                    className: '',
                                    param: {
                                        refCode: _this.props.refCode,
                                        tenantId: '',
                                        sysId: '',
                                        transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION'
                                    },

                                    keyList: [],

                                    onSave: function () {
                                        var _ref3 = _asyncToGenerator(_regenerator2.default.mark(function _callee2(sels, showVal) {
                                            var signAddMsg;
                                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                while (1) {
                                                    switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                            onStart && onStart();
                                                            _context2.next = 3;
                                                            return (0, _common.sendBpmTaskAJAX)('signaddtask', {
                                                                approvetype: _this.state.approvetype,
                                                                comment: _this.state.comment,
                                                                processInstanceId: _this.state.processInstanceId,
                                                                taskId: _this.state.taskId,
                                                                userIds: (0, _from2.default)(sels, function (x) {
                                                                    return x.id;
                                                                })
                                                            }).catch(function (e) {
                                                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                                                onError && onError({
                                                                    type: 2,
                                                                    msg: '\u670D\u52A1\u5668\u8BF7\u6C42\u51FA\u9519'
                                                                });
                                                            });

                                                        case 3:
                                                            signAddMsg = _context2.sent;

                                                            if (signAddMsg.data.flag == 'success') {
                                                                _tinperBee.Message.create({ content: '' + signAddMsg.data.msg, color: 'info', position: 'top' });
                                                                onSuccess && onSuccess();
                                                            } else {
                                                                _tinperBee.Message.create({ content: '' + signAddMsg.data.msg, color: 'danger', position: 'top' });
                                                                onError && onError({
                                                                    type: 2,
                                                                    msg: signAddMsg.data.msg
                                                                });
                                                            }

                                                        case 5:
                                                        case 'end':
                                                            return _context2.stop();
                                                    }
                                                }
                                            }, _callee2, _this2);
                                        }));

                                        return function onSave(_x3, _x4) {
                                            return _ref3.apply(this, arguments);
                                        };
                                    }(),
                                    showVal: '',
                                    showKey: 'refname',
                                    verification: false
                                });

                                (0, _yyuapRef2.default)(options);
                            } else {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: result.data.msg
                                });
                            }
                            return _context4.abrupt('break', 22);

                        case 18:
                            if (result.data.status == 1) {
                                onEnd && onEnd();
                                options = (0, _assign2.default)(JSON.parse(_refOptions2.default), {
                                    title: '改派人员',
                                    backdrop: false,
                                    hasPage: true,
                                    refType: 2,
                                    isRadio: true,
                                    className: '',
                                    param: {
                                        refCode: _this.props.refCode,
                                        tenantId: '',
                                        sysId: '',
                                        transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION'
                                    },

                                    keyList: [],

                                    onSave: function () {
                                        var _ref4 = _asyncToGenerator(_regenerator2.default.mark(function _callee3(sels, showVal) {
                                            var delegateMsg;
                                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                                                while (1) {
                                                    switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                            onStart && onStart();
                                                            _context3.next = 3;
                                                            return (0, _common.sendBpmTaskAJAX)('delegatetask', {
                                                                approvetype: _this.state.approvetype,
                                                                comment: _this.state.comment,
                                                                processInstanceId: _this.state.processInstanceId,
                                                                taskId: _this.state.taskId,
                                                                userId: Array.isArray(sels) ? sels[0].id : ""
                                                            }).catch(function (e) {
                                                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                                                onError && onError({
                                                                    type: 2,
                                                                    msg: '\u670D\u52A1\u5668\u8BF7\u6C42\u51FA\u9519'
                                                                });
                                                            });

                                                        case 3:
                                                            delegateMsg = _context3.sent;

                                                            if (delegateMsg.data.flag == 'success') {
                                                                _tinperBee.Message.create({ content: '' + delegateMsg.data.msg, color: 'info', position: 'top' });
                                                                onSuccess && onSuccess();
                                                            } else {
                                                                _tinperBee.Message.create({ content: '' + delegateMsg.data.msg, color: 'danger', position: 'top' });
                                                                onError && onError({
                                                                    type: 2,
                                                                    msg: delegateMsg.data.msg
                                                                });
                                                            }

                                                        case 5:
                                                        case 'end':
                                                            return _context3.stop();
                                                    }
                                                }
                                            }, _callee3, _this2);
                                        }));

                                        return function onSave(_x5, _x6) {
                                            return _ref4.apply(this, arguments);
                                        };
                                    }(),
                                    showVal: '',
                                    showKey: 'refname',
                                    verification: false
                                });

                                (0, _yyuapRef2.default)(options);
                            } else {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: result.data.msg
                                });
                            }
                            return _context4.abrupt('break', 22);

                        case 20:
                            if (result.data.flag == 'success') {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'info', position: 'top' });
                                onSuccess && onSuccess();
                            } else {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: result.data.msg
                                });
                            }
                            return _context4.abrupt('break', 22);

                        case 22:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this2);
        }));

        _this.activityModalClose = function () {
            _this.setState({
                rejectToActivityShow: false,
                rejectlist: [],
                selectedRow: []
            });
        };

        _this.rejectToActivityOK = _asyncToGenerator(_regenerator2.default.mark(function _callee5() {
            var _this$props2, onStart, onEnd, onSuccess, onError, rejectToBillMakerMsg;

            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _this$props2 = _this.props, onStart = _this$props2.onStart, onEnd = _this$props2.onEnd, onSuccess = _this$props2.onSuccess, onError = _this$props2.onError;

                            onStart && onStart();
                            _context5.next = 4;
                            return (0, _common.sendBpmTaskAJAX)('rejectToBillMaker', {
                                activityId: _this.state.activityId,
                                approvetype: _this.state.approvetype,
                                comment: _this.state.comment,
                                processInstanceId: _this.state.processInstanceId,
                                taskId: _this.state.taskId
                            }).catch(function (e) {
                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: '\u670D\u52A1\u5668\u8BF7\u6C42\u9519\u8BEF'
                                });
                            });

                        case 4:
                            rejectToBillMakerMsg = _context5.sent;


                            if (rejectToBillMakerMsg.data.flag == 'success') {
                                onSuccess && onSuccess();
                                _tinperBee.Message.create({ content: '' + rejectToBillMakerMsg.data.msg, color: 'info', position: 'top' });
                                _this.setState({
                                    rejectToActivityShow: false,
                                    rejectlist: [],
                                    selectedRow: []
                                });
                            } else {
                                _tinperBee.Message.create({ content: '' + rejectToBillMakerMsg.data.msg, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: rejectToBillMakerMsg.data.msg
                                });
                            }

                        case 6:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this2);
        }));

        _this.handlerFlow = function () {
            var onBpmFlowClick = _this.props.onBpmFlowClick;
            onBpmFlowClick && onBpmFlowClick();
        };

        _this.state = {
            approvetype: "agree",
            comment: "审批同意",
            processDefinitionId: props.processDefinitionId,
            processInstanceId: props.processInstanceId,
            taskId: props.id,
            activityId: "markerbill",
            rejectToActivityShow: false,
            rejectlist: [],
            selectedRow: [],
            userIds: [],
            userId: null,
            HuoDongID: "",
            HuoDongName: "" };

        _this.rejectToActivityCol = [{
            title: "活动编码",
            dataIndex: "activityId",
            key: "activityId",
            width: "40%"
        }, {
            title: "活动名称",
            dataIndex: "activityName",
            key: "activityName",
            width: "30%"
        }];
        return _this;
    }

    _createClass(BpmTaskApproval, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'clearfix' },
                _react2.default.createElement(
                    'div',
                    { style: { "padding": "0px" } },
                    this.props.appType == "1" && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _tinperBee.Row,
                            { style: {
                                    "height": "46px",
                                    "lineHeight": "46px",
                                    "padding": "0 10px"
                                } },
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 8 },
                                _react2.default.createElement(
                                    _tinperBee.Radio.RadioGroup,
                                    {
                                        name: 'approvetype',
                                        selectedValue: this.state.approvetype,
                                        onChange: this.handleChange },
                                    _react2.default.createElement(
                                        _tinperBee.Radio,
                                        { value: 'agree' },
                                        '\u540C\u610F'
                                    ),
                                    _react2.default.createElement(
                                        _tinperBee.Radio,
                                        { value: 'unagree' },
                                        '\u4E0D\u540C\u610F'
                                    ),
                                    _react2.default.createElement(
                                        _tinperBee.Radio,
                                        { value: 'rejectToActivity' },
                                        '\u9A73\u56DE\u5230\u73AF\u8282'
                                    ),
                                    _react2.default.createElement(
                                        _tinperBee.Radio,
                                        { value: 'rejectToBillMaker' },
                                        '\u9A73\u56DE\u5230\u5236\u5355\u4EBA'
                                    ),
                                    _react2.default.createElement(
                                        _tinperBee.Radio,
                                        { value: 'signAdd' },
                                        '\u52A0\u7B7E'
                                    ),
                                    _react2.default.createElement(
                                        _tinperBee.Radio,
                                        { value: 'delegate' },
                                        '\u6539\u6D3E'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 4, style: { "textAlign": "right" } },
                                this.props.appType == "1" && _react2.default.createElement(
                                    _tinperBee.Button,
                                    { onClick: this.handlerSubmitBtn, style: { "marginRight": "10px" }, colors: 'primary' },
                                    '\u63D0\u4EA4'
                                ),
                                this.props.appType == "1" && _react2.default.createElement(
                                    _tinperBee.Button,
                                    { onClick: this.handlerFlow, colors: 'primary' },
                                    '\u6D41\u7A0B\u56FE'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _tinperBee.Row,
                            { style: {
                                    "padding": "0 10px"
                                } },
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 12 },
                                _react2.default.createElement('textarea', {
                                    style: {
                                        "height": "75px",
                                        "width": "100%",
                                        "outline": "none",
                                        "resize": "none",
                                        "border": "1px solid #cecece",
                                        "padding": "10px",
                                        "marginBottom": "20px",
                                        "borderRadius": "4px"
                                    },
                                    placeholder: '\u8BF7\u8F93\u5165\u5904\u7406\u610F\u89C1',
                                    value: this.state.comment,
                                    onChange: this.handlerCommentChange
                                })
                            )
                        )
                    ),
                    this.props.appType == "2" && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _tinperBee.Row,
                            { style: {
                                    "height": "46px",
                                    "lineHeight": "46px",
                                    "padding": "0 10px"
                                } },
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 8 },
                                _react2.default.createElement(
                                    _tinperBee.Radio.RadioGroup,
                                    {
                                        name: 'approvetype',
                                        selectedValue: this.state.approvetype,
                                        onChange: this.handleChange },
                                    _react2.default.createElement(
                                        _tinperBee.Radio,
                                        { value: 'withdraw' },
                                        '\u5F03\u5BA1'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 4, style: { "textAlign": "right" } },
                                this.props.appType == "2" && _react2.default.createElement(
                                    _tinperBee.Button,
                                    { onClick: this.handlerSubmitBtn, style: { "marginRight": "10px" }, colors: 'primary' },
                                    '\u63D0\u4EA4'
                                ),
                                this.props.appType == "2" && _react2.default.createElement(
                                    _tinperBee.Button,
                                    { onClick: this.handlerFlow, colors: 'primary' },
                                    '\u6D41\u7A0B\u56FE'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _tinperBee.Row,
                            { style: {
                                    "padding": "0 10px"
                                } },
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 12 },
                                _react2.default.createElement('textarea', {
                                    style: {
                                        "height": "75px",
                                        "width": "100%",
                                        "outline": "none",
                                        "resize": "none",
                                        "border": "1px solid #cecece",
                                        "padding": "10px",
                                        "marginBottom": "20px",
                                        "borderRadius": "4px"
                                    },
                                    placeholder: '\u8BF7\u8F93\u5165\u5F03\u5BA1\u610F\u89C1',
                                    value: this.state.comment,
                                    onChange: this.handlerCommentChange
                                })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _tinperBee.Modal,
                    {
                        show: this.state.rejectToActivityShow,
                        backdrop: false,
                        onHide: this.activityModalClose },
                    _react2.default.createElement(
                        _tinperBee.Modal.Header,
                        { closeButton: true },
                        _react2.default.createElement(
                            _tinperBee.Modal.Title,
                            null,
                            ' \u6D3B\u52A8\u5217\u8868 '
                        )
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Body,
                        null,
                        _react2.default.createElement(_tinperBee.Table, {
                            rowKey: function rowKey(r) {
                                return r.activityId;
                            },
                            emptyText: function emptyText() {
                                return _react2.default.createElement(
                                    'div',
                                    null,
                                    '\u6682\u65E0\u6570\u636E'
                                );
                            },
                            rowClassName: function rowClassName(record, index, indent) {
                                if (_this3.state.selectedRow[index]) {
                                    return 'selected';
                                } else {
                                    return '';
                                }
                            },
                            onRowClick: function onRowClick(record, index, indent) {
                                var selectedRow = new Array(_this3.state.rejectlist.length);
                                selectedRow[index] = true;
                                _this3.setState({
                                    activityId: record.activityId,
                                    selectedRow: selectedRow
                                });
                            },
                            columns: this.rejectToActivityCol, data: this.state.rejectlist })
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Footer,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'danger', style: { "marginRight": "10px" }, onClick: this.rejectToActivityOK },
                            ' \u786E\u5B9A '
                        ),
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { onClick: this.activityModalClose },
                            ' \u5173\u95ED '
                        )
                    )
                )
            );
        }
    }]);

    return BpmTaskApproval;
}(_react.Component);

BpmTaskApproval.propTypes = propTypes;
BpmTaskApproval.defaultProps = {
    appType: "1",
    refCode: "newuser"
};

exports.default = BpmTaskApproval;