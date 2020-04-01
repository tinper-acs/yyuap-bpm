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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactIntl = require('react-intl');

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _intl = require('./local/intl');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

var _refWithInput = require('yyuap-ref/dist2/refWithInput');

var _refWithInput2 = _interopRequireDefault(_refWithInput);

var _refOptions = require('./refOptions');

var _refOptions2 = _interopRequireDefault(_refOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    className: _propTypes2.default.string,
    filterRefUrl: _propTypes2.default.string,
    organrefCode: _propTypes2.default.string,
    positonrefCode: _propTypes2.default.string,
    roleRef: _propTypes2.default.string,
    userRef: _propTypes2.default.string,
    onCopyusersChange: _propTypes2.default.func,
    onintersectionChange: _propTypes2.default.func
};

var BpmCopyContent = function (_Component) {
    _inherits(BpmCopyContent, _Component);

    function BpmCopyContent() {
        _classCallCheck(this, BpmCopyContent);

        var _this = _possibleConstructorReturn(this, (BpmCopyContent.__proto__ || (0, _getPrototypeOf2.default)(BpmCopyContent)).call(this));

        _this.changeCheck = function () {
            var onintersectionChange = _this.props.onintersectionChange;

            _this.setState({ intersection: !_this.state.intersection }, function () {
                onintersectionChange && onintersectionChange(_this.state.intersection);
            });
        };

        _this.state = {
            copyusers: [],
            copyuserShowVal: [],
            copycheckedArray: [],
            intersection: true };
        return _this;
    }

    _createClass(BpmCopyContent, [{
        key: 'render',
        value: function render() {
            var self = this;
            var labelStyle = {
                "height": "30px",
                "lineHeight": "30px",
                "width": "10%",
                "padding": "15px",
                "display": "inline"
            };
            var refcon = {
                "display": "inline-block",
                "width": "36%"
            };
            var organRef = {
                title: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src7.0001', defaultMessage: '\u6284\u9001\u90E8\u95E8\u9009\u62E9' }),
                backdrop: false,
                hasPage: true,
                multiple: true,
                refType: 1,
                isRadio: false,
                className: '',
                emptyBtn: true,
                param: {
                    refCode: self.props.organrefCode,
                    tenantId: '',
                    sysId: '',
                    transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                    locale: _reactCookie2.default.load('u_locale')
                },

                checkedArray: self.state.copycheckedArray[0] || [],
                onCancel: function onCancel(p) {
                    console.log(p);
                },

                onSave: function onSave(sels, showVal) {

                    var temp = sels.map(function (v) {
                        return v.id;
                    });

                    var copyuserShowVal = self.state.copyuserShowVal.slice();
                    copyuserShowVal[0] = showVal;

                    var copyusers = self.state.copyusers.slice();
                    copyusers[0] = (0, _from2.default)(temp, function (x) {
                        return { id: x, type: 'DEPTS' };
                    });
                    var arr = self.state.copycheckedArray;
                    arr[0] = sels;
                    var onCopyusersChange = self.props.onCopyusersChange;

                    onCopyusersChange && onCopyusersChange(copyusers);

                    self.setState({
                        copyusers: copyusers,
                        copyuserShowVal: copyuserShowVal,
                        copycheckedArray: arr
                    });
                },
                showVal: self.state.copyuserShowVal[0],
                showKey: 'refname',
                verification: false
            };
            var positonRef = {
                title: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src7.0002', defaultMessage: '\u6284\u9001\u5C97\u4F4D\u9009\u62E9' }),
                backdrop: false,
                hasPage: true,
                multiple: true,
                refType: 2,
                isRadio: false,
                emptyBtn: true,
                className: '',
                param: {
                    refCode: self.props.positonrefCode,
                    tenantId: '',
                    sysId: '',
                    transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                    locale: _reactCookie2.default.load('u_locale')
                },

                checkedArray: self.state.copycheckedArray[1] || [],
                onCancel: function onCancel(p) {
                    console.log(p);
                },

                onSave: function onSave(sels, showVal) {

                    var temp = sels.map(function (v) {
                        return v.id;
                    });

                    var copyuserShowVal = self.state.copyuserShowVal.slice();
                    copyuserShowVal[1] = showVal;

                    var copyusers = self.state.copyusers.slice();
                    copyusers[1] = (0, _from2.default)(temp, function (x) {
                        return { id: x, type: 'POSTS' };
                    });
                    var arr = self.state.copycheckedArray;
                    arr[1] = sels;
                    var onCopyusersChange = self.props.onCopyusersChange;

                    onCopyusersChange && onCopyusersChange(copyusers);
                    self.setState({
                        copyusers: copyusers,
                        copyuserShowVal: copyuserShowVal,
                        copycheckedArray: arr
                    });
                },
                showVal: self.state.copyuserShowVal[1],
                showKey: 'refname',
                verification: false
            };
            var roleRef = {
                title: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src7.0003', defaultMessage: '\u6284\u9001\u89D2\u8272\u9009\u62E9' }),
                backdrop: false,
                hasPage: true,
                refType: 2,
                isRadio: false,
                emptyBtn: true,
                className: '',
                param: {
                    refCode: self.props.roleRef,
                    tenantId: '',
                    sysId: '',
                    transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                    locale: _reactCookie2.default.load('u_locale')
                },

                checkedArray: self.state.copycheckedArray[2] || [],
                onCancel: function onCancel(p) {
                    console.log(p);
                },

                onSave: function onSave(sels, showVal) {

                    var temp = sels.map(function (v) {
                        return v.id;
                    });

                    var copyuserShowVal = self.state.copyuserShowVal.slice();
                    copyuserShowVal[2] = showVal;

                    var copyusers = self.state.copyusers.slice();
                    copyusers[2] = (0, _from2.default)(temp, function (x) {
                        return { id: x, type: 'USERGROUP' };
                    });
                    var arr = self.state.copycheckedArray;
                    arr[2] = sels;
                    var onCopyusersChange = self.props.onCopyusersChange;

                    onCopyusersChange && onCopyusersChange(copyusers);
                    self.setState({
                        copyusers: copyusers,
                        copyuserShowVal: copyuserShowVal,
                        copycheckedArray: arr
                    });
                },
                showVal: self.state.copyuserShowVal[2],
                showKey: 'refname',
                verification: false
            };
            var userRef = {
                title: _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src7.0004', defaultMessage: '\u6284\u9001\u7528\u6237\u9009\u62E9' }),
                backdrop: false,
                hasPage: true,
                emptyBtn: true,
                refType: 2,
                isRadio: false,
                className: '',
                param: {
                    refCode: self.props.refCode,
                    tenantId: '',
                    sysId: '',
                    transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                    locale: _reactCookie2.default.load('u_locale')
                },

                checkedArray: self.state.copycheckedArray[3] || [],
                onCancel: function onCancel(p) {
                    console.log(p);
                },

                onSave: function onSave(sels, showVal) {
                    var temp = sels.map(function (v) {
                        return v.id;
                    });

                    var copyuserShowVal = self.state.copyuserShowVal.slice();
                    copyuserShowVal[3] = showVal;

                    var copyusers = self.state.copyusers.slice();
                    copyusers[3] = (0, _from2.default)(temp, function (x) {
                        return { id: x, type: 'USER' };
                    });
                    var arr = self.state.copycheckedArray;
                    arr[3] = sels;
                    var onCopyusersChange = self.props.onCopyusersChange;

                    onCopyusersChange && onCopyusersChange(copyusers);
                    self.setState({
                        copyusers: copyusers,
                        copyuserShowVal: copyuserShowVal,
                        copycheckedArray: arr
                    });
                },
                showVal: self.state.copyuserShowVal[3],
                showKey: 'refname',
                verification: false
            };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _tinperBee.Row,
                    null,
                    _react2.default.createElement(
                        _tinperBee.Label,
                        { style: labelStyle, className: 'refLabel' },
                        _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src7.0005', defaultMessage: '\u6309\u90E8\u95E8:' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: refcon },
                        _react2.default.createElement(_refWithInput2.default, { disabled: false, option: (0, _assign2.default)(JSON.parse(_refOptions2.default), organRef) })
                    ),
                    _react2.default.createElement(
                        _tinperBee.Label,
                        { style: labelStyle, className: 'refLabel' },
                        _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src7.0006', defaultMessage: '\u6309\u5C97\u4F4D:' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: refcon },
                        _react2.default.createElement(_refWithInput2.default, { disabled: false, option: (0, _assign2.default)(JSON.parse(_refOptions2.default), positonRef) })
                    )
                ),
                _react2.default.createElement(
                    _tinperBee.Row,
                    { style: { 'marginTop': '15px', 'marginBottom': '15px' } },
                    _react2.default.createElement(
                        _tinperBee.Label,
                        { style: labelStyle, className: 'refLabel' },
                        _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src7.0007', defaultMessage: '\u6309\u89D2\u8272:' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: refcon },
                        _react2.default.createElement(_refWithInput2.default, { disabled: false, option: (0, _assign2.default)(JSON.parse(_refOptions2.default), roleRef) })
                    ),
                    _react2.default.createElement(
                        _tinperBee.Label,
                        { style: labelStyle, className: 'refLabel' },
                        _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src7.0008', defaultMessage: '\u6309\u7528\u6237:' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: refcon },
                        _react2.default.createElement(_refWithInput2.default, { disabled: false, option: (0, _assign2.default)(JSON.parse(_refOptions2.default), userRef) })
                    )
                ),
                _react2.default.createElement(
                    _tinperBee.Checkbox,
                    { style: { "margin": 0 }, checked: this.state.intersection, onChange: this.changeCheck },
                    _react2.default.createElement(_intl.FormattedMessage, { id: 'js.b9f.src7.0009', defaultMessage: '\u662F\u5426\u4EA4\u96C6' })
                )
            );
        }
    }]);

    return BpmCopyContent;
}(_react.Component);

BpmCopyContent.propTypes = propTypes;
BpmCopyContent.defaultProps = {
    className: "",
    filterRefUrl: "/iuap_pap_quickstart/common/filterRef",
    organrefCode: "newdept",
    positonrefCode: "newposition",
    roleRef: "newRoleRef",
    userRef: "relatedUser"
};
exports.default = BpmCopyContent;