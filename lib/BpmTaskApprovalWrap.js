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

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tinperBee = require('tinper-bee');

var _BpmTaskApproval = require('./BpmTaskApproval');

var _BpmTaskApproval2 = _interopRequireDefault(_BpmTaskApproval);

var _common = require('./common');

var _refOptions = require('./refOptions');

var _refOptions2 = _interopRequireDefault(_refOptions);

var _yyuapRef = require('yyuap-ref');

var _yyuapRef2 = _interopRequireDefault(_yyuapRef);

var _BpmTaskCopyPanel = require('./BpmTaskCopyPanel');

var _BpmTaskCopyPanel2 = _interopRequireDefault(_BpmTaskCopyPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    id: _propTypes2.default.string,
    refCode: _propTypes2.default.string,
    processDefinitionId: _propTypes2.default.string,
    processInstanceId: _propTypes2.default.string,
    onBpmFlowClick: _propTypes2.default.func,
    appType: _propTypes2.default.string,
    onStart: _propTypes2.default.func,
    onEnd: _propTypes2.default.func,
    onSuccess: _propTypes2.default.func,
    onError: _propTypes2.default.func
};

var BpmTaskApprovalWrap = function (_Component) {
    _inherits(BpmTaskApprovalWrap, _Component);

    function BpmTaskApprovalWrap() {
        var _this2 = this;

        _classCallCheck(this, BpmTaskApprovalWrap);

        var _this = _possibleConstructorReturn(this, (BpmTaskApprovalWrap.__proto__ || (0, _getPrototypeOf2.default)(BpmTaskApprovalWrap)).call(this));

        _this.componentWillMount = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var pID, _pID$data, processDefinitionId, processInstanceId, taskId, _pID$data$currentActi, addsignAble, iscopytouser, rejectAble, delegateAble, unagreeable, assignAble, deleteable;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (_this.props.processDefinitionId) {
                                _context.next = 7;
                                break;
                            }

                            _context.next = 3;
                            return (0, _common.billidToIds)(_this.props.id);

                        case 3:
                            pID = _context.sent;

                            if (pID.data.message && pID.data.message == 'NoBpm') {
                                _this.setState({
                                    isShowFlowBtn: false
                                });
                            } else if (pID.data.taskId) {
                                _pID$data = pID.data, processDefinitionId = _pID$data.processDefinitionId, processInstanceId = _pID$data.processInstanceId, taskId = _pID$data.taskId;
                                _pID$data$currentActi = pID.data.currentActivity.properties, addsignAble = _pID$data$currentActi.addsignAble, iscopytouser = _pID$data$currentActi.iscopytouser, rejectAble = _pID$data$currentActi.rejectAble, delegateAble = _pID$data$currentActi.delegateAble, unagreeable = _pID$data$currentActi.unagreeable, assignAble = _pID$data$currentActi.assignAble, deleteable = _pID$data$currentActi.deleteable;


                                _this.setState({
                                    id: taskId,
                                    taskId: taskId,
                                    properties: {
                                        addsignAble: addsignAble, iscopytouser: iscopytouser, rejectAble: rejectAble, delegateAble: delegateAble, unagreeable: unagreeable, assignAble: assignAble, deleteable: deleteable
                                    },
                                    processDefinitionId: processDefinitionId,
                                    processInstanceId: processInstanceId
                                });
                            } else {
                                _this.setState({
                                    isShowFlowBtn: true
                                });
                            }
                            _context.next = 8;
                            break;

                        case 7:
                            _this.setState({
                                processDefinitionId: _this.props.processDefinitionId,
                                processInstanceId: _this.props.processInstanceId,
                                id: _this.props.id
                            });

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        _this.handlerSubmitBtn = _asyncToGenerator(_regenerator2.default.mark(function _callee3() {
            var _this$props, onStart, onEnd, onSuccess, onError, result, options, _this$state, activityId, approvetype, comment, processInstanceId, taskId, rejectToBillMakerMsg, signAddMsg, delegateMsg, res, rejectres;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _this$props = _this.props, onStart = _this$props.onStart, onEnd = _this$props.onEnd, onSuccess = _this$props.onSuccess, onError = _this$props.onError;

                            if (!(_this.state.comment == "")) {
                                _context3.next = 4;
                                break;
                            }

                            _tinperBee.Message.create({ content: '审批意见不能为空', color: 'danger', position: 'top' });
                            return _context3.abrupt('return');

                        case 4:
                            onStart && onStart();
                            _context3.t0 = _this.state.approvetype;
                            _context3.next = _context3.t0 === 'agree' ? 8 : _context3.t0 === 'unagree' ? 8 : _context3.t0 === 'rejectToActivity' ? 14 : _context3.t0 === 'signAdd' ? 24 : _context3.t0 === 'delegate' ? 34 : _context3.t0 === 'withdraw' ? 44 : _context3.t0 === 'rejectToBillMaker' ? 49 : 54;
                            break;

                        case 8:
                            _context3.next = 10;
                            return (0, _common.sendBpmTaskAJAX)(_this.state.approvetype, _this.state);

                        case 10:
                            result = _context3.sent;

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
                                    title: '指派人员选择',
                                    backdrop: false,
                                    hasPage: true,
                                    refType: 5,
                                    isRadio: false,
                                    className: '',
                                    param: {
                                        refCode: _this.props.refCode,
                                        tenantId: '',
                                        sysId: '',
                                        transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION'
                                    },

                                    checkedArray: [],
                                    textOption: {
                                        modalTitle: '选择指派人员',
                                        leftTitle: '组织结构',
                                        rightTitle: '人员列表',
                                        leftTransferText: '待选人员',
                                        rightTransferText: '已选人员'

                                    },
                                    onCancel: function onCancel(p) {
                                        console.log(p);
                                    },

                                    onSave: function () {
                                        var _ref3 = _asyncToGenerator(_regenerator2.default.mark(function _callee2(sels, showVal) {
                                            var agreeeMsg;
                                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                while (1) {
                                                    switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                            onStart && onStart();
                                                            _context2.next = 3;
                                                            return (0, _common.sendBpmTaskAJAX)('commit', {
                                                                activityId: _this.state.HuoDongID,
                                                                activityName: _this.state.HuoDongName,
                                                                comment: _this.state.comment,
                                                                taskId: _this.state.taskId,
                                                                approvetype: _this.state.approvetype,
                                                                processInstanceId: _this.state.processInstanceId,
                                                                participants: (0, _from2.default)(sels, function (x) {
                                                                    return { "id": x.id };
                                                                })
                                                            }).catch(function (e) {
                                                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                                                onError && onError({
                                                                    type: 2,
                                                                    msg: '\u670D\u52A1\u5668\u8BF7\u6C42\u51FA\u9519'
                                                                });
                                                            });

                                                        case 3:
                                                            agreeeMsg = _context2.sent;

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
                                                            return _context2.stop();
                                                    }
                                                }
                                            }, _callee2, _this2);
                                        }));

                                        return function onSave(_x, _x2) {
                                            return _ref3.apply(this, arguments);
                                        };
                                    }(),
                                    showVal: '',
                                    showKey: 'refname',
                                    verification: false
                                });

                                (0, _yyuapRef2.default)(options);
                            }
                            return _context3.abrupt('break', 55);

                        case 14:
                            _this$state = _this.state, activityId = _this$state.activityId, approvetype = _this$state.approvetype, comment = _this$state.comment, processInstanceId = _this$state.processInstanceId, taskId = _this$state.taskId;

                            if (!(!activityId || activityId.length === 0)) {
                                _context3.next = 19;
                                break;
                            }

                            _tinperBee.Message.create({ content: '\u9A73\u56DE\u73AF\u8282\u4E0D\u53EF\u4E3A\u7A7A', color: 'warning', position: 'top' });
                            onError && onError({
                                type: 2,
                                msg: '\u9A73\u56DE\u73AF\u8282\u4E0D\u53EF\u4E3A\u7A7A'
                            });
                            return _context3.abrupt('return');

                        case 19:
                            _context3.next = 21;
                            return (0, _common.sendBpmTaskAJAX)('rejectToBillMaker', {
                                activityId: activityId,
                                approvetype: approvetype,
                                comment: comment,
                                processInstanceId: processInstanceId,
                                taskId: taskId,
                                copyusers: _this.state.copyusers,
                                intersection: _this.state.intersection
                            }).catch(function (e) {
                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: '\u670D\u52A1\u5668\u8BF7\u6C42\u9519\u8BEF'
                                });
                            });

                        case 21:
                            rejectToBillMakerMsg = _context3.sent;


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
                            return _context3.abrupt('break', 55);

                        case 24:
                            onStart && onStart();

                            if (!(!_this.state.userIds || _this.state.userIds.length === 0)) {
                                _context3.next = 29;
                                break;
                            }

                            _tinperBee.Message.create({ content: '\u52A0\u7B7E\u4EBA\u5458\u4E0D\u53EF\u4E3A\u7A7A', color: 'warning', position: 'top' });
                            onError && onError({
                                type: 2,
                                msg: '\u52A0\u7B7E\u4EBA\u5458\u4E0D\u53EF\u4E3A\u7A7A'
                            });
                            return _context3.abrupt('return');

                        case 29:
                            _context3.next = 31;
                            return (0, _common.sendBpmTaskAJAX)('signaddtask', {
                                approvetype: _this.state.approvetype,
                                comment: _this.state.comment,
                                processInstanceId: _this.state.processInstanceId,
                                taskId: _this.state.taskId,
                                userIds: _this.state.userIds,
                                copyusers: _this.state.copyusers,
                                intersection: _this.state.intersection
                            }).catch(function (e) {
                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: '\u670D\u52A1\u5668\u8BF7\u6C42\u51FA\u9519'
                                });
                            });

                        case 31:
                            signAddMsg = _context3.sent;

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
                            return _context3.abrupt('break', 55);

                        case 34:
                            onStart && onStart();

                            if (!(!_this.state.userId || _this.state.userId.length === 0)) {
                                _context3.next = 39;
                                break;
                            }

                            _tinperBee.Message.create({ content: '\u6539\u6D3E\u4EBA\u5458\u4E0D\u53EF\u4E3A\u7A7A', color: 'warning', position: 'top' });
                            onError && onError({
                                type: 2,
                                msg: '\u6539\u6D3E\u4EBA\u5458\u4E0D\u53EF\u4E3A\u7A7A'
                            });
                            return _context3.abrupt('return');

                        case 39:
                            _context3.next = 41;
                            return (0, _common.sendBpmTaskAJAX)('delegatetask', {
                                approvetype: _this.state.approvetype,
                                comment: _this.state.comment,
                                processInstanceId: _this.state.processInstanceId,
                                taskId: _this.state.taskId,
                                userId: _this.state.userId,
                                copyusers: _this.state.copyusers,
                                intersection: _this.state.intersection
                            }).catch(function (e) {
                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: '\u670D\u52A1\u5668\u8BF7\u6C42\u51FA\u9519'
                                });
                            });

                        case 41:
                            delegateMsg = _context3.sent;

                            if (delegateMsg.data.flag === 'success') {
                                _tinperBee.Message.create({ content: '' + delegateMsg.data.msg, color: 'info', position: 'top' });
                                onSuccess && onSuccess();
                            } else {
                                _tinperBee.Message.create({ content: '' + delegateMsg.data.msg, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: delegateMsg.data.msg
                                });
                            }
                            return _context3.abrupt('break', 55);

                        case 44:
                            _context3.next = 46;
                            return (0, _common.sendBpmTaskAJAX)(_this.state.approvetype, _this.state);

                        case 46:
                            res = _context3.sent;

                            if (res.data.flag === 'success') {
                                _tinperBee.Message.create({ content: res.data.msg, color: 'info', position: 'top' });
                                onSuccess && onSuccess();
                            } else {
                                _tinperBee.Message.create({ content: res.data.msg, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: res.data.msg
                                });
                            }
                            return _context3.abrupt('break', 55);

                        case 49:
                            _context3.next = 51;
                            return (0, _common.sendBpmTaskAJAX)(_this.state.approvetype, {
                                activityId: 'markerbill',
                                approvetype: _this.state.approvetype,
                                comment: _this.state.comment,
                                processInstanceId: _this.state.processInstanceId,
                                taskId: _this.state.taskId,
                                copyusers: _this.state.copyusers,
                                intersection: _this.state.intersection
                            });

                        case 51:
                            rejectres = _context3.sent;

                            if (rejectres.data.flag === 'success') {
                                _tinperBee.Message.create({ content: rejectres.data.msg, color: 'info', position: 'top' });
                                onSuccess && onSuccess();
                            } else {
                                _tinperBee.Message.create({ content: rejectres.data.msg, color: 'danger', position: 'top' });
                                onError && onError({
                                    type: 2,
                                    msg: rejectres.data.msg
                                });
                            }
                            return _context3.abrupt('break', 55);

                        case 54:
                            return _context3.abrupt('break', 55);

                        case 55:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }));

        _this.onChangestate = function (s) {
            var approvetype = s.approvetype,
                comment = s.comment,
                taskId = s.taskId,
                activityId = s.activityId,
                userIds = s.userIds,
                userId = s.userId;

            _this.setState({
                approvetype: approvetype, comment: comment, taskId: taskId, activityId: activityId, userIds: userIds, userId: userId
            });
        };

        _this.state = {
            isShowFlowBtn: false,
            id: "",
            taskId: "",
            processDefinitionId: "",
            processInstanceId: "",
            copyusers: [],
            intersection: true,
            approvetype: "agree",
            comment: "审批同意",
            activityId: "",
            userIds: [],
            userId: "",
            properties: {
                addSignAble: true,
                iscopytouser: true,
                rejectAble: true,
                delegateAble: true,
                unagreeable: true,
                assignAble: true,
                deleteable: true }
        };
        return _this;
    }

    _createClass(BpmTaskApprovalWrap, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'clearfix' },
                this.state.processDefinitionId && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _tinperBee.Row,
                        null,
                        _react2.default.createElement('div', null)
                    ),
                    _react2.default.createElement(
                        _tinperBee.Row,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Col,
                            { md: 12 },
                            _react2.default.createElement(_BpmTaskApproval2.default, {
                                id: this.state.id,
                                refCode: this.props.refCode,
                                onBpmFlowClick: this.props.onBpmFlowClick,
                                processDefinitionId: this.state.processDefinitionId,
                                processInstanceId: this.state.processInstanceId,
                                appType: this.props.appType,
                                properties: this.state.properties,
                                onStart: this.props.onStart,
                                onEnd: this.props.onEnd,
                                onSuccess: this.props.onSuccess,
                                onError: this.props.onError,
                                onChangestate: this.onChangestate
                            })
                        )
                    ),
                    this.state.properties.iscopytouser && this.props.appType == 1 && _react2.default.createElement(
                        _tinperBee.Row,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Col,
                            { md: 12 },
                            _react2.default.createElement(_BpmTaskCopyPanel2.default, {
                                panelOpen: false,
                                title: '抄送(选填)',
                                onCopyusersChange: function onCopyusersChange(s) {
                                    _this3.setState({ copyusers: s });
                                },
                                onintersectionChange: function onintersectionChange(s) {
                                    _this3.setState({ intersection: s });
                                }

                            })
                        )
                    ),
                    _react2.default.createElement(
                        _tinperBee.Row,
                        { style: { "margin": "8px 0", "padding": "0 10px" } },
                        _react2.default.createElement(
                            _tinperBee.Col,
                            { md: 4, mdOffset: 8, xs: 4, xsOffset: 8, sm: 4, smOffset: 8, style: { "textAlign": "right", "paddingRight": 0 } },
                            _react2.default.createElement(
                                _tinperBee.Button,
                                { onClick: this.handlerSubmitBtn, colors: 'primary' },
                                '\u63D0\u4EA4'
                            )
                        )
                    )
                ),
                this.state.isShowFlowBtn && _react2.default.createElement(
                    _tinperBee.Row,
                    null,
                    _react2.default.createElement(
                        _tinperBee.Col,
                        { mdOffset: 11, md: 1, style: { "textAlign": "right" } },
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { onClick: this.props.onBpmFlowClick, style: { "marginBottom": "4px", "marginRight": "15px" }, colors: 'primary' },
                            '\u6D41\u7A0B\u56FE'
                        )
                    )
                )
            );
        }
    }]);

    return BpmTaskApprovalWrap;
}(_react.Component);

BpmTaskApprovalWrap.propTypes = propTypes;
BpmTaskApprovalWrap.defaultProps = {
    id: "",
    appType: "1",
    refCode: "userUnderOrgRef"
};
exports.default = BpmTaskApprovalWrap;