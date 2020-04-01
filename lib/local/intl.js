'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormattedMessage = exports.getlocals = undefined;

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

var _en = require('react-intl/locale-data/en');

var _en2 = _interopRequireDefault(_en);

var _zh = require('react-intl/locale-data/zh');

var _zh2 = _interopRequireDefault(_zh);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _iuap_zh_CN = require('./iuap_zh_CN');

var _iuap_zh_CN2 = _interopRequireDefault(_iuap_zh_CN);

var _iuap_en_US = require('./iuap_en_US');

var _iuap_en_US2 = _interopRequireDefault(_iuap_en_US);

var _iuap_zh_TW = require('./iuap_zh_TW');

var _iuap_zh_TW2 = _interopRequireDefault(_iuap_zh_TW);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var local = _reactCookie2.default.load('u_locale');

function chooseLocale(local) {

    switch (local) {
        case 'en_US':
            return _iuap_en_US2.default;
            break;
        case 'zh_CN':
            return _iuap_zh_CN2.default;
            break;
        case 'zh_TW':
            return _iuap_zh_TW2.default;
            break;
        default:
            return _iuap_zh_CN2.default;
            break;
    }
}
var getlocals = exports.getlocals = function getlocals() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var obj = chooseLocale(local);
    if (obj[option.id]) {
        return obj[option.id];
    } else {
        return option.defaultMessage || "";
    }
};

var FormattedMessage = exports.FormattedMessage = function (_Component) {
    _inherits(FormattedMessage, _Component);

    function FormattedMessage() {
        _classCallCheck(this, FormattedMessage);

        return _possibleConstructorReturn(this, (FormattedMessage.__proto__ || (0, _getPrototypeOf2.default)(FormattedMessage)).apply(this, arguments));
    }

    _createClass(FormattedMessage, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                defaultMessage = _props.defaultMessage;

            return _react2.default.createElement(
                'span',
                null,
                chooseLocale(local)[id] || defaultMessage
            );
        }
    }]);

    return FormattedMessage;
}(_react.Component);