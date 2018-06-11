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

var _BpmFlowChart = require('./BpmFlowChart');

var _BpmFlowChart2 = _interopRequireDefault(_BpmFlowChart);

var _BpmTable = require('./BpmTable');

var _BpmTable2 = _interopRequireDefault(_BpmTable);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    id: _propTypes2.default.string,
    processDefinitionId: _propTypes2.default.string,
    processInstanceId: _propTypes2.default.string

};

var BpmWrap = function (_Component) {
    _inherits(BpmWrap, _Component);

    function BpmWrap() {
        var _this2 = this;

        _classCallCheck(this, BpmWrap);

        var _this = _possibleConstructorReturn(this, (BpmWrap.__proto__ || (0, _getPrototypeOf2.default)(BpmWrap)).call(this));

        _this.componentWillMount = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var pID, _pID$data, processDefinitionId, processInstanceId;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (_this.props.processDefinitionId) {
                                _context.next = 8;
                                break;
                            }

                            _context.next = 3;
                            return (0, _common.billidToIds)(_this.props.id);

                        case 3:
                            pID = _context.sent;
                            _pID$data = pID.data, processDefinitionId = _pID$data.processDefinitionId, processInstanceId = _pID$data.processInstanceId;

                            _this.setState({
                                processDefinitionId: processDefinitionId,
                                processInstanceId: processInstanceId
                            });
                            _context.next = 9;
                            break;

                        case 8:
                            _this.setState({
                                processDefinitionId: _this.props.processDefinitionId,
                                processInstanceId: _this.props.processInstanceId
                            });

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));

        _this.state = {
            processDefinitionId: "",
            processInstanceId: ""
        };
        return _this;
    }

    _createClass(BpmWrap, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _tinperBee.Row,
                    null,
                    _react2.default.createElement(
                        _tinperBee.Col,
                        { md: 12 },
                        this.state.processDefinitionId && _react2.default.createElement(_BpmFlowChart2.default, {
                            processDefinitionId: this.state.processDefinitionId,
                            processInstanceId: this.state.processInstanceId
                        })
                    )
                ),
                _react2.default.createElement(
                    _tinperBee.Row,
                    null,
                    _react2.default.createElement(
                        _tinperBee.Col,
                        { md: 12 },
                        this.state.processDefinitionId && _react2.default.createElement(_BpmTable2.default, {
                            processDefinitionId: this.state.processDefinitionId,
                            processInstanceId: this.state.processInstanceId
                        })
                    )
                )
            );
        }
    }]);

    return BpmWrap;
}(_react.Component);

BpmWrap.propTypes = propTypes;
BpmWrap.defaultProps = {
    id: ""
};
exports.default = BpmWrap;