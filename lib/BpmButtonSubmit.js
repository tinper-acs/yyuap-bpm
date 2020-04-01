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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactIntl = require('react-intl');

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _intl = require('./local/intl');

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    checkedArray: _propTypes2.default.array,
    params: _propTypes2.default.object,
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

        _this.handlerBtn = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var _this$props, params, checkedArray, isOne, onStart, onEnd, onSuccess, onError, _ref2, _ref2$data, success, detailMsg, commitParam, _result, flag, data, arr, _result2, message;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this$props = _this.props, params = _this$props.params, checkedArray = _this$props.checkedArray, isOne = _this$props.isOne, onStart = _this$props.onStart, onEnd = _this$props.onEnd, onSuccess = _this$props.onSuccess, onError = _this$props.onError;

                            if (!(isOne && checkedArray.length >= 2)) {
                                _context.next = 4;
                                break;
                            }

                            onError && onError({
                                type: 2,
                                msg: (0, _intl.getlocals)({ id: "js.b9f.src6.0001", defaultMessage: "请选择单条数据提交" })
                            });
                            return _context.abrupt('return');

                        case 4:
                            if (!(checkedArray.length > 0 || params && params.main)) {
                                _context.next = 32;
                                break;
                            }

                            if (!(checkedArray[0] && checkedArray[0].bpmState >= 1)) {
                                _context.next = 8;
                                break;
                            }

                            onError && onError({
                                type: 1,
                                msg: (0, _intl.getlocals)({ id: "js.b9f.src6.0002", defaultMessage: "不能提交此单据，重复提交" })
                            });
                            return _context.abrupt('return');

                        case 8:
                            onStart && onStart();
                            _context.next = 11;
                            return (0, _common.queryBpmTemplateAllocate)({
                                funccode: _this.props.funccode,
                                nodekey: _this.props.nodekey
                            });

                        case 11:
                            _ref2 = _context.sent;
                            _ref2$data = _ref2.data;
                            success = _ref2$data.success;
                            detailMsg = _ref2$data.detailMsg;

                            if (!(!detailMsg.data || detailMsg.data == null)) {
                                _context.next = 18;
                                break;
                            }

                            onError && onError({
                                type: 1,
                                msg: (0, _intl.getlocals)({ id: "js.b9f.src6.0003", defaultMessage: "当前单据没有绑定流程" })
                            });
                            return _context.abrupt('return');

                        case 18:
                            if (!(success == "success")) {
                                _context.next = 29;
                                break;
                            }

                            commitParam = {
                                "url": _this.props.url,
                                "processDefineCode": detailMsg.data.res_code,
                                "submitArray": checkedArray,
                                'params': params
                            };

                            _this.setState({
                                processDefineCode: detailMsg.data.res_code
                            });
                            _context.next = 23;
                            return (0, _common.onCommit)(commitParam);

                        case 23:
                            _result = _context.sent;
                            flag = _result.data.flag;

                            if (flag && !_result.data.data.assignAble) {
                                onSuccess && onSuccess();
                            } else if (!flag) {
                                onError && onError({
                                    type: 2,
                                    msg: (0, _common.reconvert)(_result.data.msg) || (0, _intl.getlocals)({ id: "js.b9f.src6.0004", defaultMessage: "流程启动失败" })
                                });
                            }

                            if (flag && _result.data.data && _result.data.data.assignAble == true) {
                                data = _result.data.data;

                                if (data.assignedActivities && data.assignedActivities.length > 0) {
                                    onEnd && onEnd();
                                    arr = data.assignedActivities.filter(function (item) {
                                        return !item.properties.startactivity;
                                    });

                                    _this.setState({
                                        huanjieShow: true,
                                        chaosongShow: data.assignedActivities[0].properties.iscopytouser,
                                        huanjieList: arr,
                                        obj: checkedArray,
                                        assignInfo: {
                                            assignInfoItems: (0, _from2.default)(arr, function (x) {
                                                return { activityId: x.id, activityName: x.name, participants: [] };
                                            })
                                        }
                                    });
                                }
                            }
                            _context.next = 30;
                            break;

                        case 29:
                            if (success == "fail_global") {
                                _result2 = result, message = _result2.data.message;

                                onError && onError({
                                    type: 2,
                                    msg: (0, _common.reconvert)(message) || (0, _intl.getlocals)({ id: "js.b9f.src6.0004", defaultMessage: "流程启动失败" })
                                });
                            }

                        case 30:
                            _context.next = 33;
                            break;

                        case 32:
                            onError && onError({
                                type: 1,
                                msg: (0, _intl.getlocals)({ id: "js.b9f.src6.0005", defaultMessage: "请选择提交的单据" })
                            });

                        case 33:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
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

        _this.huanjieHandlerOK = _asyncToGenerator(_regenerator2.default.mark(function _callee2() {
            var _this$props2, urlAssignSubmit, onSuccess, onError, onStart, onEnd, params, _this$state, processDefineCode, assignInfo, obj, copyusers, intersection, submiting, arr, self, _result3;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _this$props2 = _this.props, urlAssignSubmit = _this$props2.urlAssignSubmit, onSuccess = _this$props2.onSuccess, onError = _this$props2.onError, onStart = _this$props2.onStart, onEnd = _this$props2.onEnd, params = _this$props2.params;
                            _this$state = _this.state, processDefineCode = _this$state.processDefineCode, assignInfo = _this$state.assignInfo, obj = _this$state.obj, copyusers = _this$state.copyusers, intersection = _this$state.intersection, submiting = _this$state.submiting;

                            obj = obj[0];
                            arr = [];
                            self = _this;

                            copyusers.map(function (value) {
                                arr = arr.concat(value);
                            });
                            copyusers = arr;

                            if (submiting) {
                                _context2.next = 14;
                                break;
                            }

                            onStart && onStart();
                            _this.setState({
                                submiting: true
                            });
                            _context2.next = 12;
                            return _axios2.default.post(urlAssignSubmit, _extends({
                                processDefineCode: processDefineCode,
                                assignInfo: assignInfo,
                                obj: obj,
                                copyusers: copyusers,
                                intersection: intersection
                            }, params)).catch(function (e) {

                                onError && onError({
                                    type: 2,
                                    msg: (0, _intl.getlocals)({ id: "js.b9f.src6.0006", defaultMessage: "后台服务请求发生错误" })
                                });
                                self.setState({
                                    submiting: false
                                });
                            });

                        case 12:
                            _result3 = _context2.sent;


                            if (_result3.data.flag) {
                                onSuccess && onSuccess();
                                _this.setState({
                                    huanjieShow: false,
                                    chaosongShow: false,
                                    childRefKey: [],
                                    showVal: [],
                                    submiting: false
                                });
                            } else if (!_result3.data.flag) {
                                onError && onError({
                                    type: 2,
                                    msg: (0, _common.reconvert)(_result3.data.msg) || (0, _intl.getlocals)({ id: "js.b9f.src6.0004", defaultMessage: "流程启动失败" })
                                });
                                _this.setState({
                                    huanjieShow: false,
                                    chaosongShow: false,
                                    childRefKey: [],
                                    showVal: [],
                                    submiting: false
                                });
                            }

                        case 14:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
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
            checkedArray: [],
            copyusers: [],
            intersection: true,
            submiting: false
        };
        return _this;
    }

    _createClass(BpmButtonSubmit, [{
        key: 'render',
        value: function render() {
            var self = this;
            var huanjieCol = [{
                title: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0007', defaultMessage: '\u540D\u79F0' }),
                dataIndex: "name",
                key: "name"

            }, {
                title: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0008', defaultMessage: '\u6307\u6D3E' }),
                dataIndex: "1",
                key: "1",
                render: function render(text, record, index) {
                    return _react2.default.createElement(_refWithInput2.default, { disabled: false, option: (0, _assign2.default)(JSON.parse(_refOptions2.default), {
                            title: (0, _intl.getlocals)({ id: "js.b9f.src6.0009", defaultMessage: "选择指派用户" }),
                            refType: 5,
                            className: '',
                            param: {
                                refCode: 'userUnderOrgRef',
                                tenantId: '',
                                sysId: '',
                                transmitParam: '5',
                                locale: _reactCookie2.default.load('u_locale')
                            },
                            emptyBtn: true,
                            textOption: {
                                modalTitle: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0009', defaultMessage: '\u9009\u62E9\u6307\u6D3E\u7528\u6237' }),
                                leftTitle: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0010', defaultMessage: '\u7EC4\u7EC7\u7ED3\u6784' }),
                                rightTitle: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0011', defaultMessage: '\u7528\u6237\u5217\u8868' }),
                                leftTransferText: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0012', defaultMessage: '\u5F85\u9009\u7528\u6237' }),
                                rightTransferText: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0013', defaultMessage: '\u5DF2\u9009\u7528\u6237' })

                            },
                            checkedArray: self.state.checkedArray[index] || [],
                            onCancel: function onCancel(p) {
                                console.log(p);
                            },

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
                                var checkedArray = self.state.checkedArray;
                                checkedArray[index] = sels;
                                self.setState({
                                    checkedArray: checkedArray,
                                    childRefKey: _childRefKey,
                                    showVal: _showVal,
                                    assignInfo: {
                                        assignInfoItems: sourseArray
                                    }
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
                            this.state.huanjieShow ? _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0014', defaultMessage: '\u73AF\u8282\u6307\u6D3E' }) : _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0015', defaultMessage: '\u6284\u9001' })
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
                        })
                    ) : "",
                    this.state.chaosongShow ? _react2.default.createElement(
                        _tinperBee.Modal.Header,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Modal.Title,
                            null,
                            _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0016', defaultMessage: '\u6284\u9001' })
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
                        null,
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { style: { "marginRight": "10px" }, onClick: this.closeHuanjie },
                            _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0017', defaultMessage: '\u5173\u95ED' })
                        ),
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'primary', onClick: this.huanjieHandlerOK },
                            _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src6.0018', defaultMessage: '\u786E\u5B9A' })
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
    refCode: "relatedUser",
    size: "",
    scrollY: 270,
    isOne: false,
    organrefCode: "newdept",
    positonrefCode: "newposition",
    roleRef: "newRoleRef",
    userRef: "relatedUser"
};
exports.default = BpmButtonSubmit;