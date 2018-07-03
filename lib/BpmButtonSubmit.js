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
    data: _propTypes2.default.array,
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
            var _this$props, checkedArray, data, onStart, submitArray, i, _ref2, _ref2$data, success, detailMsg, commitParam, _result, flag, _result2, message;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this$props = _this.props, checkedArray = _this$props.checkedArray, data = _this$props.data, onStart = _this$props.onStart;

                            if (onStart) {
                                onStart();
                            }
                            submitArray = [];

                            for (i = 0; i < checkedArray.length; i++) {
                                if (checkedArray[i]) {
                                    if (data[i]["status"] == 0) {
                                        submitArray.push({ "id": data[i]["id"] });
                                    } else {
                                        _tinperBee.Message.create({ content: '\u5355\u636E' + data[i]["code"] + '\u4E0D\u80FD\u91CD\u590D\u63D0\u4EA4', color: 'danger', position: 'top' });
                                        if (_this.props.onError) {
                                            _this.props.onError();
                                        }
                                    }
                                }
                            }

                            if (!(submitArray.length > 0)) {
                                _context.next = 23;
                                break;
                            }

                            _context.next = 7;
                            return (0, _common.queryBpmTemplateAllocate)({
                                funccode: _this.props.funccode,
                                nodekey: _this.props.nodekey
                            });

                        case 7:
                            _ref2 = _context.sent;
                            _ref2$data = _ref2.data;
                            success = _ref2$data.success;
                            detailMsg = _ref2$data.detailMsg;

                            if (!(success == "success")) {
                                _context.next = 20;
                                break;
                            }

                            commitParam = {
                                "url": _this.props.url,
                                "processDefineCode": detailMsg["data"]["res_code"],
                                "submitArray": submitArray
                            };
                            _context.next = 15;
                            return (0, _common.onCommit)(commitParam);

                        case 15:
                            _result = _context.sent;
                            flag = _result["data"]["success"];

                            if (flag == "success") {
                                if (_this.props.onSuccess) {
                                    _this.props.onSuccess();
                                }
                            }
                            _context.next = 21;
                            break;

                        case 20:
                            if (success == "fail_global") {
                                _result2 = result, message = _result2.data.message;

                                _tinperBee.Message.create({ content: message, color: 'danger', position: 'top' });
                                if (_this.props.onError) {
                                    _this.props.onError();
                                }
                            }

                        case 21:
                            _context.next = 25;
                            break;

                        case 23:
                            _tinperBee.Message.create({ content: '\u8BF7\u9009\u62E9\u63D0\u4EA4\u7684\u5355\u636E', color: 'info', position: 'top' });
                            _this.props.onError && _this.props.onError();

                        case 25:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        return _this;
    }

    _createClass(BpmButtonSubmit, [{
        key: 'render',
        value: function render() {
            var text = this.props.text;

            return _react2.default.createElement(
                _tinperBee.Button,
                { className: this.props.className, size: 'sm', onClick: this.handlerBtn, colors: 'primary' },
                text
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
    data: [],
    className: ""
};
exports.default = BpmButtonSubmit;