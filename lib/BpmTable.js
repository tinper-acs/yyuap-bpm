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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    processDefinitionId: _propTypes2.default.string,
    processInstanceId: _propTypes2.default.string

};

var BpmTable = function (_Component) {
    _inherits(BpmTable, _Component);

    function BpmTable() {
        var _this2 = this;

        _classCallCheck(this, BpmTable);

        var _this = _possibleConstructorReturn(this, (BpmTable.__proto__ || (0, _getPrototypeOf2.default)(BpmTable)).call(this));

        _this.componentDidMount = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var _this$props, processDefinitionId, processInstanceId, hisTasklistData;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this$props = _this.props, processDefinitionId = _this$props.processDefinitionId, processInstanceId = _this$props.processInstanceId;
                            _context.next = 3;
                            return (0, _common.sendBpmTaskAJAX)('hisTasklist', {
                                processDefinitionId: processDefinitionId,
                                processInstanceId: processInstanceId
                            });

                        case 3:
                            hisTasklistData = _context.sent;

                            _this.setState({
                                data: hisTasklistData.data.data
                            });

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));

        _this.state = {
            data: []
        };
        _this.columns = [{
            title: "环节名称",
            dataIndex: "name",
            key: "name"
        }, {
            title: "任务类型",
            dataIndex: "description",
            key: "description",
            render: function render(text, record, index) {
                return _react2.default.createElement(
                    'div',
                    null,
                    (0, _common.descriptionToText)(text)
                );
            }
        }, {
            title: "审批人",
            dataIndex: "executionId",
            key: "executionId"
        }, {
            title: "开始时间",
            dataIndex: "startTime",
            key: "startTime",
            render: function render(text, record, index) {
                return _react2.default.createElement(
                    'div',
                    null,
                    (0, _common.timestampToDate)(text)
                );
            }
        }, {
            title: "结束时间",
            dataIndex: "endTime",
            key: "endTime",
            render: function render(text, record, index) {
                if (text == null) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        '-'
                    );
                } else {
                    return _react2.default.createElement(
                        'div',
                        null,
                        (0, _common.timestampToDate)(text)
                    );
                }
            }
        }, {
            title: "任务状态",
            dataIndex: "e",
            key: "e",
            render: function render(text, record, index) {
                if (record == null) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        '-'
                    );
                } else {
                    return _react2.default.createElement(
                        'div',
                        null,
                        (0, _common.recordToState)(record)
                    );
                }
            } }, {
            title: "审批意见",
            dataIndex: "deleteReason",
            key: "deleteReason"
        }, {
            title: "超时时间",
            dataIndex: "claimTime",
            key: "claimTime",
            render: function render(text, record, index) {
                if (text == null) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        '-'
                    );
                } else {
                    return _react2.default.createElement(
                        'div',
                        null,
                        (0, _common.timestampToDate)(text)
                    );
                }
            }
        }];
        return _this;
    }

    _createClass(BpmTable, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_tinperBee.Table, {
                bordered: true,
                emptyText: function emptyText() {
                    return _react2.default.createElement(
                        'span',
                        null,
                        '\u6682\u65F6\u6CA1\u6709\u6D41\u7A0B\u5386\u53F2\u6570\u636E'
                    );
                },
                columns: this.columns,
                data: this.state.data
            });
        }
    }]);

    return BpmTable;
}(_react.Component);

BpmTable.propTypes = propTypes;
BpmTable.defaultProps = {
    processDefinitionId: "eiap508870:4:c3bc57e8-631a-11e8-8d04-0686c4000fcf",
    processInstanceId: "d5c3ab59-631a-11e8-8d04-0686c4000fcf"
};
exports.default = BpmTable;