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

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _tinperBee = require('tinper-bee');

var _common = require('./common');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    checkedArray: _propTypes2.default.array,
    text: _propTypes2.default.string,
    funccode: _propTypes2.default.string,
    nodekey: _propTypes2.default.string,
    url: _propTypes2.default.string,
    urlAssignSubmit: _propTypes2.default.string,
    className: _propTypes2.default.string,
    onSuccess: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    onStart: _propTypes2.default.func
};

var BpmButtonSubmit = function (_Component) {
    _inherits(BpmButtonSubmit, _Component);

    function BpmButtonSubmit() {
        var _this2 = this;

        _classCallCheck(this, BpmButtonSubmit);

        var _this = _possibleConstructorReturn(this, (BpmButtonSubmit.__proto__ || (0, _getPrototypeOf2.default)(BpmButtonSubmit)).call(this));

        _this.handlerBtn = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var _this$props, checkedArray, onStart, onSuccess, onError, submitArray, _ref2, _ref2$data, success, detailMsg, commitParam, _result, flag, _result2, message;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this$props = _this.props, checkedArray = _this$props.checkedArray, onStart = _this$props.onStart, onSuccess = _this$props.onSuccess, onError = _this$props.onError;

                            if (onStart) {
                                onStart();
                            }
                            submitArray = [];

                            if (!(checkedArray.length >= 2)) {
                                _context.next = 6;
                                break;
                            }

                            onError && onError({
                                type: 2,
                                msg: '\u8BF7\u9009\u62E9\u5355\u6761\u6570\u636E\u63D0\u4EA4'
                            });
                            return _context.abrupt('return');

                        case 6:
                            if (!(checkedArray[i].bpmState == null || checkedArray[i].bpmState == 0)) {
                                _context.next = 9;
                                break;
                            }

                            onError && onError({
                                type: 1,
                                msg: '\u4E0D\u80FD\u63D0\u4EA4\u6B64\u5355\u636E\uFF0C\u91CD\u590D\u63D0\u4EA4'
                            });
                            return _context.abrupt('return');

                        case 9:
                            if (!(checkedArray.length > 0)) {
                                _context.next = 30;
                                break;
                            }

                            _context.next = 12;
                            return (0, _common.queryBpmTemplateAllocate)({
                                funccode: _this.props.funccode,
                                nodekey: _this.props.nodekey
                            });

                        case 12:
                            _ref2 = _context.sent;
                            _ref2$data = _ref2.data;
                            success = _ref2$data.success;
                            detailMsg = _ref2$data.detailMsg;

                            if (!(success == "success")) {
                                _context.next = 27;
                                break;
                            }

                            commitParam = {
                                "url": _this.props.url,
                                "processDefineCode": detailMsg.data.res_code,
                                "submitArray": checkedArray
                            };

                            _this.setState({
                                processDefineCode: detailMsg.data.res_code
                            });
                            _context.next = 21;
                            return (0, _common.onCommit)(commitParam);

                        case 21:
                            _result = _context.sent;
                            flag = _result.data.success;

                            if (flag == "success" && typeof _result.data.assignAble == 'undefined') {
                                onSuccess && onSuccess();
                            } else if (flag == "fail_global") {
                                onError && onError({
                                    type: 2,
                                    msg: '\u6D41\u7A0B\u542F\u52A8\u5931\u8D25'
                                });
                            }

                            if (_result.data.assignAble == 'true') {
                                if (_result.data.assignedActivities && _result.data.assignedActivities.length > 0) {
                                    _this.setState({
                                        huanjieShow: true,
                                        huanjieList: _result.data.assignedActivities,
                                        obj: checkedArray[0],
                                        assignInfo: {
                                            assignInfoItems: (0, _from2.default)(_result.data.assignedActivities, function (x) {
                                                return { activityId: x.id, activityName: x.name, participants: [] };
                                            })
                                        }
                                    });
                                }
                            }
                            _context.next = 28;
                            break;

                        case 27:
                            if (success == "fail_global") {
                                _result2 = result, message = _result2.data.message;

                                onError && onError({
                                    type: 2,
                                    msg: '\u6D41\u7A0B\u542F\u52A8\u5931\u8D25'
                                });
                            }

                        case 28:
                            _context.next = 31;
                            break;

                        case 30:
                            onError && onError({
                                type: 1,
                                msg: '\u8BF7\u9009\u62E9\u63D0\u4EA4\u7684\u5355\u636E'
                            });

                        case 31:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));

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

        _this.handlerSignAddSearchValue = function (value) {
            _this.setState({
                name: value
            });
        };

        _this.handlerSignAddSearch = _asyncToGenerator(_regenerator2.default.mark(function _callee2() {
            var result;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _common.sendBpmTaskAJAX)('signAdd', _this.state);

                        case 2:
                            result = _context2.sent;

                            _this.setState({
                                signAddList: result.data.data.content,
                                checkedArray: result.data.data.content,
                                totalPages: result.data.data.totalPages
                            });

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        _this.handlerSignAddPage = function (page) {
            _this.setState({
                pageNum: page
            }, _asyncToGenerator(_regenerator2.default.mark(function _callee3() {
                var result;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return (0, _common.sendBpmTaskAJAX)('signAdd', _this.state);

                            case 2:
                                result = _context3.sent;

                                _this.setState({
                                    signAddList: result.data.data.content,
                                    checkedArray: result.data.data.content,
                                    totalPages: result.data.data.totalPages
                                });

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this2);
            })));
        };

        _this.close = function () {
            _this.setState({
                signAddShow: false,
                selectedRow: [],
                signAddList: [],
                checkedArray: [],
                checkedAll: false,
                name: ""
            });
        };

        _this.closeHuanjie = function () {
            _this.setState({
                huanjieShow: false
            });
        };

        _this.signAddOK = function () {
            var _index = _this.state.editRowIndex;
            var sourseArray = _this.state.assignInfo.assignInfoItems.slice();
            sourseArray[_index]['participants'] = (0, _from2.default)(_this.state.userIds, function (x) {
                return { id: x };
            });
            _this.setState({
                assignInfo: {
                    assignInfoItems: sourseArray
                },
                userIds: [],
                signAddShow: false
            });
        };

        _this.huanjieHandlerOK = _asyncToGenerator(_regenerator2.default.mark(function _callee4() {
            var _this$props2, onSuccess, onError, _this$state, processDefineCode, assignInfo, obj, result;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _this$props2 = _this.props, onSuccess = _this$props2.onSuccess, onError = _this$props2.onError;
                            _this$state = _this.state, processDefineCode = _this$state.processDefineCode, assignInfo = _this$state.assignInfo, obj = _this$state.obj;
                            _context4.next = 4;
                            return _axios2.default.post(_this.props.urlAssignSubmit, {
                                processDefineCode: processDefineCode,
                                assignInfo: assignInfo,
                                obj: obj
                            }).catch(function (e) {
                                onError && onError({
                                    type: 2,
                                    msg: '\u540E\u53F0\u670D\u52A1\u8BF7\u6C42\u53D1\u751F\u9519\u8BEF'
                                });
                            });

                        case 4:
                            result = _context4.sent;

                            if (result.data.success == 'success') {
                                onSuccess && onSuccess();
                                _this.setState({
                                    huanjieShow: false
                                });
                            } else if (result.data.success == 'fail_global') {
                                onError && onError({
                                    type: 2,
                                    msg: '\u63D0\u4EA4\u53D1\u751F\u4E86\u9519\u8BEF'
                                });
                            }

                        case 6:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this2);
        }));

        _this.state = {
            name: "",
            checkedArray: [],
            signAddList: [],
            signAddShow: false,
            pageNum: 1,
            pageSize: 20,
            totalPages: 0,
            userIds: [],
            processDefineCode: "",
            assignInfo: {
                assignInfoItems: []
            },
            obj: {},
            huanjieShow: false,
            editRowIndex: 0

        };

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
        return _this;
    }

    _createClass(BpmButtonSubmit, [{
        key: 'renderColumnsMultiSelect',
        value: function renderColumnsMultiSelect(columns) {
            var _this3 = this;

            var checkedArray = this.state.checkedArray;
            var multiSelect = this.props.multiSelect;

            var select_column = {};
            var indeterminate_bool = false;

            if (multiSelect && multiSelect.type === "checkbox") {
                var _i = checkedArray.length;
                while (_i--) {
                    if (checkedArray[_i].isChecked) {
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
            var text = this.props.text;

            var self = this;
            var huanjieCol = [{
                title: "名称",
                dataIndex: "name",
                key: "name",
                width: "30%"
            }, {
                title: "编码",
                dataIndex: "id",
                key: "id",
                width: "30%"
            }, {
                title: "指派",
                dataIndex: "1",
                key: "1",
                width: "30%",
                render: function render(text, record, index) {
                    return _react2.default.createElement(
                        _tinperBee.Button,
                        { colors: 'primary', size: 'sm', onClick: function onClick() {
                                self.handlerSignAddSearch();
                                self.setState({
                                    editRowIndex: index,
                                    signAddShow: true
                                });
                            } },
                        '\u9009\u62E9'
                    );
                }
            }];
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    _tinperBee.Button,
                    { className: this.props.className, size: 'sm', onClick: this.handlerBtn, colors: 'primary' },
                    text
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
                        show: this.state.huanjieShow,
                        backdrop: false,
                        onHide: this.closeHuanjie },
                    _react2.default.createElement(
                        _tinperBee.Modal.Header,
                        { closeButton: true },
                        _react2.default.createElement(
                            _tinperBee.Modal.Title,
                            null,
                            ' \u73AF\u8282\u6307\u6D3E '
                        )
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Body,
                        null,
                        _react2.default.createElement(_tinperBee.Table, {
                            rowKey: function rowKey(record) {
                                return record.id;
                            },
                            columns: huanjieCol,
                            data: this.state.huanjieList
                        })
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Footer,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'primary', style: { "marginRight": "10px" }, onClick: this.huanjieHandlerOK },
                            ' \u786E\u5B9A '
                        ),
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { colors: 'primary', onClick: this.closeHuanjie },
                            ' \u5173\u95ED '
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
    text: "提交",
    nodekey: "003",
    url: "/example/ygdemo_yw_info/submit",
    urlAssignSubmit: "/example/ygdemo_yw_info/assignSubmit",
    className: "",
    multiSelect: {
        type: "checkbox",
        param: "key"
    }
};
exports.default = BpmButtonSubmit;