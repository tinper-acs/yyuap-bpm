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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tinperBee = require('tinper-bee');

var _BpmTaskApproval = require('./BpmTaskApproval');

var _BpmTaskApproval2 = _interopRequireDefault(_BpmTaskApproval);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    id: _propTypes2.default.string,
    processDefinitionId: _propTypes2.default.string,
    processInstanceId: _propTypes2.default.string,
    onBpmFlowClick: _propTypes2.default.func,
    appType: _propTypes2.default.string,
    onStart: _propTypes2.default.func
};

var BpmTaskApprovalWrap = function (_Component) {
    _inherits(BpmTaskApprovalWrap, _Component);

    function BpmTaskApprovalWrap() {
        var _this2 = this;

        _classCallCheck(this, BpmTaskApprovalWrap);

        var _this = _possibleConstructorReturn(this, (BpmTaskApprovalWrap.__proto__ || (0, _getPrototypeOf2.default)(BpmTaskApprovalWrap)).call(this));

        _this.componentWillMount = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var pID, _pID$data, processDefinitionId, processInstanceId, taskId;

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

                                _this.setState({
                                    id: taskId,
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

        _this.state = {
            isShowFlowBtn: false,
            id: "",
            taskId: "",
            processDefinitionId: "",
            processInstanceId: ""
        };
        return _this;
    }

    _createClass(BpmTaskApprovalWrap, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'clearfix' },
                this.state.processDefinitionId && _react2.default.createElement(
                    _tinperBee.Row,
                    null,
                    _react2.default.createElement(
                        _tinperBee.Col,
                        { md: 12 },
                        _react2.default.createElement(_BpmTaskApproval2.default, {
                            id: this.state.id,
                            onBpmFlowClick: this.props.onBpmFlowClick,
                            processDefinitionId: this.state.processDefinitionId,
                            processInstanceId: this.state.processInstanceId,
                            appType: this.props.appType,
                            onStart: this.props.onStart
                        })
                    )
                ),
                this.state.isShowFlowBtn && _react2.default.createElement(
                    _tinperBee.Row,
                    null,
                    _react2.default.createElement(
                        _tinperBee.Col,
                        { md: 12 },
                        _react2.default.createElement(
                            _tinperBee.Col,
                            { mdOffset: 10, md: 2 },
                            _react2.default.createElement(
                                _tinperBee.Button,
                                { onClick: this.props.onBpmFlowClick, style: { "marginRight": "10px" }, colors: 'primary' },
                                '\u6D41\u7A0B\u56FE'
                            )
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
    appType: "1"
};
exports.default = BpmTaskApprovalWrap;