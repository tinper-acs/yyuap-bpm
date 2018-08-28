'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tinperBee = require('tinper-bee');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BpmCopyContent = require('./BpmCopyContent');

var _BpmCopyContent2 = _interopRequireDefault(_BpmCopyContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    panelOpen: _propTypes2.default.bool,
    reset: _propTypes2.default.func,
    title: _propTypes2.default.string,
    filterRefUrl: _propTypes2.default.string,
    organrefCode: _propTypes2.default.string,
    positonrefCode: _propTypes2.default.string,
    refCode: _propTypes2.default.string,
    onCopyusersChange: _propTypes2.default.func,
    onintersectionChange: _propTypes2.default.func
};

var BpmTaskCopyPanel = function (_Component) {
    _inherits(BpmTaskCopyPanel, _Component);

    function BpmTaskCopyPanel() {
        _classCallCheck(this, BpmTaskCopyPanel);

        var _this = _possibleConstructorReturn(this, (BpmTaskCopyPanel.__proto__ || (0, _getPrototypeOf2.default)(BpmTaskCopyPanel)).call(this));

        _this.open = function () {
            _this.setState({
                panelOpen: !_this.state.panelOpen
            });
        };

        _this.changeCheck = function () {
            _this.setState({ intersection: !_this.state.intersection });
        };

        _this.state = {
            panelOpen: true,
            copyusers: [],
            copyuserShowVal: [],
            intersection: true
        };
        return _this;
    }

    _createClass(BpmTaskCopyPanel, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var self = this;
            var classes = 'copy-panel';
            var header = function header() {
                return _react2.default.createElement(
                    'div',
                    { className: 'clearfix', onClick: _this2.open },
                    _react2.default.createElement(
                        'span',
                        { className: 'copy-panel-title', style: { "float": "left", "color": "#434A54", "fontSize": "14px" } },
                        _this2.props.title
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'copy-panel-icon', style: { "float": "right", "color": "#1E7BE2", "fontSize": "14px" } },
                        _this2.state.panelOpen ? '展开' : '收起',
                        _react2.default.createElement('i', { className: (0, _classnames2.default)({
                                'uf': true,
                                'uf-arrow-down': !_this2.state.panelOpen,
                                'uf-arrow-right': _this2.state.panelOpen
                            }) })
                    )
                );
            };
            return _react2.default.createElement(
                _tinperBee.Panel,
                { className: classes, style: { "borderRadius": "0!important", "border": "none!important", "borderBottom": "1px solid transparent!important" }, header: header(), collapsible: true, expanded: this.state.searchOpen },
                _react2.default.createElement(
                    'div',
                    { className: 'clearfix' },
                    _react2.default.createElement(_BpmCopyContent2.default, _extends({ onCopyusersChange: self.props.onCopyusersChange
                    }, self.props, {
                        onintersectionChange: self.props.onintersectionChange
                    }))
                )
            );
        }
    }]);

    return BpmTaskCopyPanel;
}(_react.Component);

BpmTaskCopyPanel.propTypes = propTypes;
BpmTaskCopyPanel.defaultProps = {
    panelOpen: false,
    selectResult: function selectResult() {},
    reset: function reset() {},
    title: "抄送(选填)",
    filterRefUrl: '/iuap_pap_quickstart/common/filterRef',
    refCode: "newuser",
    organrefCode: "newdept",
    positonrefCode: "newposition",
    roleRef: "newrole",
    userRef: "newuser"
};
exports.default = BpmTaskCopyPanel;