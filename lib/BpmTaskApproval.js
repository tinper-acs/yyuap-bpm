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

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    host: _propTypes2.default.string,
    id: _propTypes2.default.string,
    appType: _propTypes2.default.string,
    onBpmFlowClick: _propTypes2.default.func,
    onStart: _propTypes2.default.func,
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
                    approvetype: "withdraw"
                });
            }
        };

        _this.onAllCheckChange = function () {
            var self = _this;
            var checkedArray = self.state.checkedArray;

            var listData = self.state.signAddList.concat();
            var selIds = [];

            for (var i = 0; i < self.state.checkedArray.length; i++) {
                checkedArray[i].isChecked = !self.state.checkedAll;
            }

            self.setState({
                checkedAll: !self.state.checkedAll,
                checkedArray: checkedArray
            });

            var userIdArr = checkedArray.filter(function (item) {
                return item.isChecked;
            });
            var userIdsArray = [];
            userIdArr.map(function (item) {
                userIdsArray.push(item.id);
            });
            _this.setState({
                userIds: userIdsArray
            });
        };

        _this.onCheckboxChange = function (text, record, index) {
            var self = _this;
            var allFlag = false;

            var checkedArray = self.state.checkedArray.concat();

            checkedArray[index].isChecked = !self.state.checkedArray[index].isChecked;
            checkedArray[index].id = record.id;
            for (var i = 0; i < self.state.checkedArray.length; i++) {
                if (!checkedArray[i].isChecked) {
                    allFlag = false;
                    break;
                } else {
                    allFlag = true;
                }
            }
            self.setState({
                checkedAll: allFlag,
                checkedArray: checkedArray
            });

            var userIdArr = checkedArray.filter(function (item) {
                return item.isChecked;
            });
            var userIdsArray = [];
            userIdArr.map(function (item) {
                userIdsArray.push(item.id);
            });
            _this.setState({
                userIds: userIdsArray
            });
        };

        _this.handleChange = function (value) {
            _this.setState({ approvetype: value, comment: (0, _common.approvetypeToText)(value) });
        };

        _this.handlerCommentChange = function (e) {
            _this.setState({ comment: e.target.value });
        };

        _this.handlerSubmitBtn = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(_this.state.comment == "")) {
                                _context.next = 3;
                                break;
                            }

                            _tinperBee.Message.create({ content: '不能为空', color: 'danger', position: 'top' });
                            return _context.abrupt('return');

                        case 3:
                            _context.next = 5;
                            return (0, _common.sendBpmTaskAJAX)(_this.state.approvetype, _this.state);

                        case 5:
                            result = _context.sent;
                            _context.t0 = _this.state.approvetype;
                            _context.next = _context.t0 === 'rejectToActivity' ? 9 : _context.t0 === 'signAdd' ? 11 : _context.t0 === 'delegate' ? 13 : 15;
                            break;

                        case 9:
                            if (result.data.flag == 'success') {
                                _this.setState({
                                    rejectlist: result.data.rejectlist,
                                    selectedRow: new Array(result.data.rejectlist.length),
                                    rejectToActivityShow: true
                                });
                            } else {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                            }
                            return _context.abrupt('break', 17);

                        case 11:
                            if (result.data.status == 1) {
                                _this.setState({
                                    signAddList: result.data.data.content,
                                    signAddShow: true,
                                    checkedArray: result.data.data.content,
                                    totalPages: result.data.data.totalPages
                                });
                            } else {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                            }
                            return _context.abrupt('break', 17);

                        case 13:
                            if (result.data.status == 1) {
                                _this.setState({
                                    delegateList: result.data.data.content,
                                    delegateShow: true,
                                    selectedRow: new Array(result.data.data.content.length)
                                });
                            } else {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                            }
                            return _context.abrupt('break', 17);

                        case 15:
                            if (result.data.flag == 'success') {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'info', position: 'top' });
                                _this.props.onSuccess && _this.props.onSuccess();
                            } else {
                                _tinperBee.Message.create({ content: result.data.msg, color: 'danger', position: 'top' });
                                _this.props.onError && _this.props.onError();
                            }
                            return _context.abrupt('break', 17);

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));

        _this.close = function () {
            _this.setState({
                rejectToActivityShow: false,
                signAddShow: false,
                rejectlist: [],
                selectedRow: [],
                signAddList: [],
                checkedArray: [],
                checkedAll: false,
                delegateShow: false,
                name: ""
            });
        };

        _this.rejectToActivityOK = _asyncToGenerator(_regenerator2.default.mark(function _callee2() {
            var msg;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _axios2.default.post((0, _common.getBpmTaskURL)('rejectToBillMaker'), {
                                activityId: _this.state.activityId,
                                approvetype: _this.state.approvetype,
                                comment: _this.state.comment,
                                processInstanceId: _this.state.processInstanceId,
                                taskId: _this.state.taskId
                            }).catch(function (e) {
                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                            });

                        case 2:
                            msg = _context2.sent;


                            if (msg.data.flag == 'success') {
                                _tinperBee.Message.create({ content: '' + msg.data.msg, color: 'info', position: 'top' });
                                _this.setState({
                                    rejectToActivityShow: false,
                                    signAddShow: false,
                                    rejectlist: [],
                                    selectedRow: [],
                                    signAddList: [],
                                    checkedArray: [],
                                    checkedAll: false
                                });
                            } else {
                                _tinperBee.Message.create({ content: '' + msg.data.msg, color: 'danger', position: 'top' });
                            }

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));
        _this.signAddOK = _asyncToGenerator(_regenerator2.default.mark(function _callee3() {
            var msg;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _axios2.default.post('eiap-plus/task/signaddtask/signadd', {
                                approvetype: _this.state.approvetype,
                                comment: _this.state.comment,
                                processInstanceId: _this.state.processInstanceId,
                                taskId: _this.state.taskId,
                                userIds: _this.state.userIds
                            }).catch(function (e) {
                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                _this.props.onError && _this.props.onError();
                            });

                        case 2:
                            msg = _context3.sent;


                            if (msg.data.flag == 'success') {
                                _tinperBee.Message.create({ content: '' + msg.data.msg, color: 'info', position: 'top' });
                                _this.setState({
                                    rejectToActivityShow: false,
                                    signAddShow: false,
                                    rejectlist: [],
                                    selectedRow: [],
                                    signAddList: [],
                                    checkedArray: [],
                                    checkedAll: false,
                                    name: ""
                                });
                                _this.props.onSuccess && _this.props.onSuccess();
                            } else {
                                _tinperBee.Message.create({ content: '' + msg.data.msg, color: 'danger', position: 'top' });
                                _this.props.onError && _this.props.onError();
                            }

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }));
        _this.delegatedOK = _asyncToGenerator(_regenerator2.default.mark(function _callee4() {
            var msg;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (!(_this.state.userId == null)) {
                                _context4.next = 3;
                                break;
                            }

                            _tinperBee.Message.create({ content: '\u8BF7\u9009\u62E9\u4E00\u6761\u6570\u636E', color: 'danger', position: 'top' });
                            return _context4.abrupt('return');

                        case 3:
                            _context4.next = 5;
                            return _axios2.default.post('eiap-plus/task/delegatetask/delegate', {
                                approvetype: _this.state.approvetype,
                                comment: _this.state.comment,
                                processInstanceId: _this.state.processInstanceId,
                                taskId: _this.state.taskId,
                                userId: _this.state.userId
                            }).catch(function (e) {
                                _tinperBee.Message.create({ content: '' + e.toString(), color: 'danger', position: 'top' });
                                _this.props.onError && _this.props.onError();
                            });

                        case 5:
                            msg = _context4.sent;


                            if (msg.data.flag == 'success') {
                                _tinperBee.Message.create({ content: '' + msg.data.msg, color: 'info', position: 'top' });
                                _this.setState({
                                    rejectToActivityShow: false,
                                    signAddShow: false,
                                    rejectlist: [],
                                    selectedRow: [],
                                    signAddList: [],
                                    checkedArray: [],
                                    checkedAll: false,
                                    delegateShow: false,
                                    name: ""
                                });
                                _this.props.onSuccess && _this.props.onSuccess();
                            } else {
                                _tinperBee.Message.create({ content: '' + msg.data.msg, color: 'danger', position: 'top' });
                                _this.props.onError && _this.props.onError();
                            }

                        case 7:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this2);
        }));

        _this.handlerFlow = function () {
            var onStart = _this.props.onStart;
            if (onStart) {
                onStart();
            }
            var onBpmFlowClick = _this.props.onBpmFlowClick;
            if (onBpmFlowClick) {
                onBpmFlowClick();
            }
        };

        _this.handlerSignAddSearch = _asyncToGenerator(_regenerator2.default.mark(function _callee5() {
            var result;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return (0, _common.sendBpmTaskAJAX)(_this.state.approvetype, _this.state);

                        case 2:
                            result = _context5.sent;

                            _this.setState({
                                signAddList: result.data.data.content,
                                delegateList: result.data.data.content,
                                totalPages: result.data.data.totalPages
                            });

                        case 4:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this2);
        }));

        _this.handlerSignAddSearchValue = function (value) {
            _this.setState({
                name: value
            });
        };

        _this.handlerSignAddPage = function (page) {
            _this.setState({
                pageNum: page
            }, _asyncToGenerator(_regenerator2.default.mark(function _callee6() {
                var result;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return (0, _common.sendBpmTaskAJAX)(_this.state.approvetype, _this.state);

                            case 2:
                                result = _context6.sent;

                                _this.setState({
                                    signAddList: result.data.data.content,
                                    totalPages: result.data.data.totalPages
                                });

                            case 4:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this2);
            })));
        };

        _this.state = {
            approvetype: "agree",
            comment: "审批同意",
            processDefinitionId: props.processDefinitionId,
            processInstanceId: props.processInstanceId,
            taskId: props.id,
            activityId: "markerbill",
            rejectToActivityShow: false,
            signAddShow: false,
            rejectlist: [],
            selectedRow: [],
            signAddList: [],
            checkedArray: [],
            checkedAll: false,
            userIds: [],
            delegateList: [],
            delegateShow: false,
            userId: null,
            signAddSearchValue: "",
            name: "",
            pageNum: 1,
            pageSize: 20,
            totalPages: 0
        };

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

        _this.signAddCol = [{
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: "30%"
        }, {
            title: "编码",
            dataIndex: "code",
            key: "code",
            width: "30%"
        }];

        _this.delegateCol = [{
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: "30%"
        }, {
            title: "编码",
            dataIndex: "code",
            key: "id",
            width: "30%"
        }];
        return _this;
    }

    _createClass(BpmTaskApproval, [{
        key: 'renderColumnsMultiSelect',
        value: function renderColumnsMultiSelect(columns) {
            var _this3 = this;

            var checkedArray = this.state.checkedArray;
            var multiSelect = this.props.multiSelect;

            var select_column = {};
            var indeterminate_bool = false;

            if (multiSelect && multiSelect.type === "checkbox") {
                var i = checkedArray.length;
                while (i--) {
                    if (checkedArray[i].isChecked) {
                        indeterminate_bool = true;
                        break;
                    }
                }
                var defaultColumns = [{
                    title: _react2.default.createElement(_tinperBee.Checkbox, {
                        className: 'table-checkbox',
                        checked: this.state.checkedAll,
                        indeterminate: indeterminate_bool && !this.state.checkedAll,
                        onChange: this.onAllCheckChange
                    }),
                    key: "checkbox",
                    dataIndex: "checkbox",
                    width: "5%",
                    render: function render(text, record, index) {
                        return _react2.default.createElement(_tinperBee.Checkbox, {
                            className: 'table-checkbox',
                            checked: _this3.state.checkedArray[index].isChecked,
                            onChange: _this3.onCheckboxChange.bind(_this3, text, record, index)
                        });
                    }
                }];
                columns = defaultColumns.concat(columns);
            }
            return columns;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props,
                processDefinitionId = _props.processDefinitionId,
                processInstanceId = _props.processInstanceId,
                host = _props.host;

            return _react2.default.createElement(
                'div',
                { className: 'clearfix' },
                _react2.default.createElement(
                    _tinperBee.Row,
                    { style: { "margin": "10px 0" } },
                    _react2.default.createElement(
                        _tinperBee.Col,
                        { mdOffset: 10, md: 2 },
                        this.props.appType != "3" && _react2.default.createElement(
                            _tinperBee.Button,
                            { onClick: this.handlerFlow, style: { "marginRight": "10px" }, colors: 'primary' },
                            '\u6D41\u7A0B\u56FE'
                        ),
                        this.props.appType != "3" && _react2.default.createElement(
                            _tinperBee.Button,
                            { onClick: this.handlerSubmitBtn, style: { "marginRight": "10px" }, colors: 'primary' },
                            '\u63D0\u4EA4'
                        ),
                        this.props.appType == "3" && _react2.default.createElement(
                            _tinperBee.Button,
                            { onClick: this.handlerFlow, style: { "marginRight": "10px" }, colors: 'primary' },
                            '\u6D41\u7A0B\u56FE'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { "background": "#eeeff1", "padding": "20px" } },
                    this.props.appType == "1" && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _tinperBee.Row,
                            null,
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { style: {
                                        "height": "40px",
                                        "lineHeight": "20px"
                                    }, md: 12 },
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
                            )
                        ),
                        _react2.default.createElement(
                            _tinperBee.Row,
                            null,
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 12 },
                                _react2.default.createElement('textarea', {
                                    style: {
                                        "height": "75px",
                                        "width": "100%",
                                        "outline": "none",
                                        "resize": "none",
                                        "border": "1px solid #636363",
                                        "padding": "10px",
                                        "marginBottom": "20px"
                                    },
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
                            null,
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 12 },
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
                            )
                        ),
                        _react2.default.createElement(
                            _tinperBee.Row,
                            null,
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 12 },
                                _react2.default.createElement('textarea', {
                                    style: {
                                        "height": "75px",
                                        "width": "100%",
                                        "outline": "none",
                                        "resize": "none",
                                        "border": "1px solid #636363",
                                        "padding": "10px",
                                        "marginBottom": "20px"
                                    },
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
                        onHide: this.close },
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
                            rowClassName: function rowClassName(record, index, indent) {
                                if (_this4.state.selectedRow[index]) {
                                    return 'selected';
                                } else {
                                    return '';
                                }
                            },
                            onRowClick: function onRowClick(record, index, indent) {
                                var selectedRow = new Array(_this4.state.rejectlist.length);
                                selectedRow[index] = true;
                                _this4.setState({
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
                            { colors: 'primary', style: { "marginRight": "10px" }, onClick: this.rejectToActivityOK },
                            ' \u786E\u5B9A '
                        ),
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'primary', onClick: this.close },
                            ' \u5173\u95ED '
                        )
                    )
                ),
                _react2.default.createElement(
                    _tinperBee.Modal,
                    {
                        show: this.state.signAddShow,
                        backdrop: false,
                        onHide: this.close },
                    _react2.default.createElement(
                        _tinperBee.Modal.Header,
                        { closeButton: true },
                        _react2.default.createElement(
                            _tinperBee.Modal.Title,
                            null,
                            ' \u52A0\u7B7E\u4EBA\u5458\u5217\u8868 '
                        )
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Body,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Row,
                            { style: { "paddingBottom": "10px" } },
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 2 },
                                _react2.default.createElement(
                                    'div',
                                    { style: { "lineHeight": "30px" } },
                                    '\u540D\u79F0\uFF1A'
                                )
                            ),
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 5 },
                                _react2.default.createElement(_tinperBee.FormControl, {
                                    value: this.state.name,
                                    onChange: this.handlerSignAddSearchValue
                                })
                            ),
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 2 },
                                _react2.default.createElement(
                                    _tinperBee.Button,
                                    {
                                        style: { "marginLeft": "10px" },
                                        onClick: this.handlerSignAddSearch,
                                        colors: 'primary' },
                                    '\u67E5\u8BE2'
                                )
                            )
                        ),
                        _react2.default.createElement(_tinperBee.Table, {
                            scroll: { y: 200 },
                            rowKey: function rowKey(record) {
                                return record.code;
                            },
                            columns: this.renderColumnsMultiSelect(this.signAddCol),
                            data: this.state.signAddList
                        }),
                        _react2.default.createElement(_tinperBee.Pagination, {
                            boundaryLinks: true,
                            prev: true,
                            next: true,
                            items: this.state.totalPages,
                            activePage: this.state.pageNum,
                            onSelect: this.handlerSignAddPage })
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Footer,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'primary', style: { "marginRight": "10px" }, onClick: this.signAddOK },
                            ' \u786E\u5B9A '
                        ),
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'primary', onClick: this.close },
                            ' \u5173\u95ED '
                        )
                    )
                ),
                _react2.default.createElement(
                    _tinperBee.Modal,
                    {
                        show: this.state.delegateShow,
                        backdrop: false,
                        onHide: this.close },
                    _react2.default.createElement(
                        _tinperBee.Modal.Header,
                        { closeButton: true },
                        _react2.default.createElement(
                            _tinperBee.Modal.Title,
                            null,
                            ' \u4EBA\u5458\u5217\u8868 '
                        )
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Body,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Row,
                            { style: { "paddingBottom": "10px" } },
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 2 },
                                _react2.default.createElement(
                                    'div',
                                    { style: { "lineHeight": "30px" } },
                                    '\u540D\u79F0\uFF1A'
                                )
                            ),
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 5 },
                                _react2.default.createElement(_tinperBee.FormControl, {
                                    value: this.state.name,
                                    onChange: this.handlerSignAddSearchValue
                                })
                            ),
                            _react2.default.createElement(
                                _tinperBee.Col,
                                { md: 2 },
                                _react2.default.createElement(
                                    _tinperBee.Button,
                                    {
                                        style: { "marginLeft": "10px" },
                                        onClick: this.handlerSignAddSearch,
                                        colors: 'primary' },
                                    '\u67E5\u8BE2'
                                )
                            )
                        ),
                        _react2.default.createElement(_tinperBee.Table, {
                            rowClassName: function rowClassName(record, index, indent) {
                                if (_this4.state.selectedRow[index]) {
                                    return 'selected';
                                } else {
                                    return '';
                                }
                            },
                            onRowClick: function onRowClick(record, index, indent) {
                                var selectedRow = new Array(_this4.state.delegateList.length);
                                selectedRow[index] = true;
                                _this4.setState({
                                    userId: record.id,
                                    selectedRow: selectedRow
                                });
                            },
                            rowKey: function rowKey(record) {
                                return record.code;
                            },
                            scroll: { y: 200 },
                            columns: this.delegateCol, data: this.state.delegateList }),
                        _react2.default.createElement(_tinperBee.Pagination, {
                            boundaryLinks: true,
                            prev: true,
                            next: true,
                            items: this.state.totalPages,
                            activePage: this.state.pageNum,
                            onSelect: this.handlerSignAddPage })
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Footer,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'primary', style: { "marginRight": "10px" }, onClick: this.delegatedOK },
                            ' \u786E\u5B9A '
                        ),
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'primary', onClick: this.close },
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
    host: "",
    prefixCls: "bee-table",
    appType: "1",
    multiSelect: {
        type: "checkbox",
        param: "key"
    }
};

exports.default = BpmTaskApproval;