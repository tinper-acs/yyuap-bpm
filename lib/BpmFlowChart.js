'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    processDefinitionId: _propTypes2.default.string,
    processInstanceId: _propTypes2.default.string,
    width: _propTypes2.default.string,
    height: _propTypes2.default.string,
    host: _propTypes2.default.string
};

var BpmFlowChart = function (_Component) {
    _inherits(BpmFlowChart, _Component);

    function BpmFlowChart() {
        _classCallCheck(this, BpmFlowChart);

        return _possibleConstructorReturn(this, (BpmFlowChart.__proto__ || (0, _getPrototypeOf2.default)(BpmFlowChart)).apply(this, arguments));
    }

    _createClass(BpmFlowChart, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                processDefinitionId = _props.processDefinitionId,
                processInstanceId = _props.processInstanceId,
                width = _props.width,
                height = _props.height,
                host = _props.host;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('iframe', {
                    style: { width: width, height: height, "minHeight": "300px" },
                    src: host + '/eiap-plus/vendor/diagram-viewer/index.html?processDefinitionId=' + processDefinitionId + '&processInstanceId=' + processInstanceId,
                    frameBorder: '0'
                })
            );
        }
    }]);

    return BpmFlowChart;
}(_react.Component);

BpmFlowChart.propTypes = propTypes;
BpmFlowChart.defaultProps = {
    width: "99%",
    height: "300px",
    processDefinitionId: "eiap508870:4:c3bc57e8-631a-11e8-8d04-0686c4000fcf",
    processInstanceId: "d5c3ab59-631a-11e8-8d04-0686c4000fcf",
    host: ""
};

exports.default = BpmFlowChart;