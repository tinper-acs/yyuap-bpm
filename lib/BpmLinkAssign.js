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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

var _index2 = require('pap-refer/lib/pap-common-table/src/index.js');

var _index3 = _interopRequireDefault(_index2);

var _common = require('./common');

var _refOptions = require('./refOptions');

var _refOptions2 = _interopRequireDefault(_refOptions);

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
    scrollY: _propTypes2.default.number,
    onSuccess: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    onStart: _propTypes2.default.func,
    onEnd: _propTypes2.default.func
};

var BpmLinkAssign = function (_Component) {
    _inherits(BpmLinkAssign, _Component);

    function BpmLinkAssign() {
        var _this2 = this;

        _classCallCheck(this, BpmLinkAssign);

        var _this = _possibleConstructorReturn(this, (BpmLinkAssign.__proto__ || (0, _getPrototypeOf2.default)(BpmLinkAssign)).call(this));

        _this.handlerBtn = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var _this$props, checkedArray, onStart, onEnd, onSuccess, onError, _ref2, _ref2$data, success, detailMsg, commitParam, _result, flag, _result2, message;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this$props = _this.props, checkedArray = _this$props.checkedArray, onStart = _this$props.onStart, onEnd = _this$props.onEnd, onSuccess = _this$props.onSuccess, onError = _this$props.onError;

                            if (!(checkedArray.length >= 2)) {
                                _context.next = 4;
                                break;
                            }

                            onError && onError({
                                type: 2,
                                msg: '\u8BF7\u9009\u62E9\u5355\u6761\u6570\u636E\u63D0\u4EA4'
                            });
                            return _context.abrupt('return');

                        case 4:
                            if (!(checkedArray.length > 0)) {
                                _context.next = 29;
                                break;
                            }

                            if (!(checkedArray[0].bpmState >= 1)) {
                                _context.next = 8;
                                break;
                            }

                            onError && onError({
                                type: 1,
                                msg: '\u4E0D\u80FD\u63D0\u4EA4\u6B64\u5355\u636E\uFF0C\u91CD\u590D\u63D0\u4EA4'
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

                            if (!(success == "success")) {
                                _context.next = 26;
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
                            _context.next = 20;
                            return (0, _common.onCommit)(commitParam);

                        case 20:
                            _result = _context.sent;
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

                                    _this.setState({
                                        huanjieShow: true,
                                        huanjieList: _result.data.detailMsg.data.assignedActivities,
                                        obj: checkedArray[0],
                                        assignInfo: {
                                            assignInfoItems: (0, _from2.default)(_result.data.detailMsg.data.assignedActivities, function (x) {
                                                return { activityId: x.id, activityName: x.name, participants: [] };
                                            })
                                        }
                                    });
                                }
                            }
                            _context.next = 27;
                            break;

                        case 26:
                            if (success == "fail_global") {
                                _result2 = result, message = _result2.data.message;

                                onError && onError({
                                    type: 2,
                                    msg: (0, _common.reconvert)(message) || '流程启动失败'
                                });
                            }

                        case 27:
                            _context.next = 30;
                            break;

                        case 29:
                            onError && onError({
                                type: 1,
                                msg: '\u8BF7\u9009\u62E9\u63D0\u4EA4\u7684\u5355\u636E'
                            });

                        case 30:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));

        _this.closeHuanjie = function () {
            _this.setState({
                huanjieShow: false,
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
            var _this$props2, urlAssignSubmit, onSuccess, onError, onStart, onEnd, _this$state, processDefineCode, assignInfo, obj, result;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _this$props2 = _this.props, urlAssignSubmit = _this$props2.urlAssignSubmit, onSuccess = _this$props2.onSuccess, onError = _this$props2.onError, onStart = _this$props2.onStart, onEnd = _this$props2.onEnd;
                            _this$state = _this.state, processDefineCode = _this$state.processDefineCode, assignInfo = _this$state.assignInfo, obj = _this$state.obj;

                            onStart && onStart();
                            _context2.next = 5;
                            return _axios2.default.post(urlAssignSubmit, {
                                processDefineCode: processDefineCode,
                                assignInfo: assignInfo,
                                obj: obj
                            }).catch(function (e) {
                                onError && onError({
                                    type: 2,
                                    msg: '\u540E\u53F0\u670D\u52A1\u8BF7\u6C42\u53D1\u751F\u9519\u8BEF'
                                });
                            });

                        case 5:
                            result = _context2.sent;

                            if (result.data.success == 'success') {
                                onSuccess && onSuccess();
                                _this.setState({
                                    huanjieShow: false,
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
                                    childRefKey: [],
                                    showVal: []
                                });
                            }

                        case 7:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        _this.state = {
            childRefKey: [],
            userIds: [],
            processDefineCode: "",
            assignInfo: {
                assignInfoItems: []
            },
            obj: {},
            huanjieShow: false,
            huanjieList: [{ "id": "approveUserTask3283", "name": "1", "type": "userTask" }, { "id": "approveUserTask3183", "name": "1", "type": "userTask" }, { "id": "approveUserTask3a83", "name": "1", "type": "userTask" }, { "id": "approveUserTask3s83", "name": "1", "type": "userTask" }, { "id": "approveUserTask32d3", "name": "1", "type": "userTask" }, { "id": "approveUserTask3zza83", "name": "1", "type": "userTask" }, { "id": "approveUserTasqzza83", "name": "1", "type": "userTask" }, { "id": "approveUserTask34za83", "name": "1", "type": "userTask" }, { "id": "approveUserTas43zza83", "name": "1", "type": "userTask" }],
            editRowIndex: 0,
            showVal: []
        };
        return _this;
    }

    _createClass(BpmLinkAssign, [{
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
                    var option = {
                        title: '人员选择',
                        backdrop: true,
                        disabled: false,
                        multiple: false,
                        strictMode: true,
                        param: {
                            refCode: 'new_relatedUser'
                        },
                        refModelUrl: {
                            tableBodyUrl: '/wbalone/common-ref/blobRefTreeGrid',
                            refInfo: '/wbalone/common-ref/refInfo' },
                        matchUrl: '/wbalone/common-ref/matchPKRefJSON',
                        filterUrl: '/wbalone/common-ref/filterRefJSON',
                        valueField: "refpk",
                        displayField: "{refname}",
                        onSave: function onSave(sels, showVal) {
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
                                } });
                        } };

                    return _react2.default.createElement(_index3.default, option);
                }
            }];
            return _react2.default.createElement(_tinperBee.Table, {
                loading: false,
                scroll: { y: this.props.scrollY },
                emptyText: function emptyText() {
                    return _react2.default.createElement(
                        'span',
                        null,
                        '\u6682\u65E0\u73AF\u8282'
                    );
                },
                rowKey: function rowKey(record) {
                    return record.id;
                },
                columns: huanjieCol,
                data: this.state.huanjieList
            });
        }
    }]);

    return BpmLinkAssign;
}(_react.Component);

BpmLinkAssign.propTypes = propTypes;
BpmLinkAssign.defaultProps = {
    checkedArray: [],
    nodekey: "003",
    funccode: "react",
    url: "/example/ygdemo_yw_info/submit",
    urlAssignSubmit: "/example/ygdemo_yw_info/assignSubmit",
    className: "",
    filterRefUrl: "/iuap_pap_quickstart/common/filterRef",
    refCode: "newuser",
    scrollY: 270
};
exports.default = BpmLinkAssign;