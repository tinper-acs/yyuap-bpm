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

var _reactIntl = require('react-intl');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _common = require('./common');

var _intl = require('./local/intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    checkedArray: _propTypes2.default.array,
    url: _propTypes2.default.string,
    data: _propTypes2.default.array,
    className: _propTypes2.default.string,
    onSuccess: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    onStart: _propTypes2.default.func,
    onEnd: _propTypes2.default.func,
    params: _propTypes2.default.object
};

var BpmButtonRecall = function (_Component) {
    _inherits(BpmButtonRecall, _Component);

    function BpmButtonRecall() {
        var _this2 = this;

        _classCallCheck(this, BpmButtonRecall);

        var _this = _possibleConstructorReturn(this, (BpmButtonRecall.__proto__ || (0, _getPrototypeOf2.default)(BpmButtonRecall)).call(this));

        _this.handlerBtn = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var _this$props, checkedArray, onStart, onEnd, onSuccess, onError, params, recallArray, _ref2, _ref2$data, msg, flag, _ref3, _ref3$data, success, detailMsg;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this$props = _this.props, checkedArray = _this$props.checkedArray, onStart = _this$props.onStart, onEnd = _this$props.onEnd, onSuccess = _this$props.onSuccess, onError = _this$props.onError, params = _this$props.params;
                            recallArray = [];

                            if (!(params && params.pk_gd)) {
                                _context.next = 13;
                                break;
                            }

                            onStart && onStart();
                            _context.next = 6;
                            return (0, _common.onRecall)(_this.props.url, params);

                        case 6:
                            _ref2 = _context.sent;
                            _ref2$data = _ref2.data;
                            msg = _ref2$data.msg;
                            flag = _ref2$data.flag;

                            if (flag) {
                                onSuccess && onSuccess();
                            } else {
                                onError && onError({
                                    type: 2,
                                    msg: msg
                                });
                            }

                            _context.next = 31;
                            break;

                        case 13:
                            if (!(checkedArray.length >= 2)) {
                                _context.next = 16;
                                break;
                            }

                            onError && onError({
                                type: 2,
                                msg: (0, _intl.getlocals)({ id: "js.b9f.src13.0001", defaultMessage: "请选择单条数据收回" })
                            });
                            return _context.abrupt('return');

                        case 16:
                            if (!(checkedArray.length > 0)) {
                                _context.next = 20;
                                break;
                            }

                            if (checkedArray[0] && checkedArray[0].bpmState != 0 && checkedArray[0].bpmState != null) {
                                recallArray.push({ id: checkedArray[0].id });
                            } else {
                                onError && onError({
                                    type: 1,
                                    msg: (0, _intl.getlocals)({ id: "js.b9f.src13.0002", defaultMessage: "流程没有启动无法撤回" })
                                });
                            }

                            _context.next = 22;
                            break;

                        case 20:
                            onError && onError({
                                type: 1,
                                msg: (0, _intl.getlocals)({ id: "js.b9f.src13.0001", defaultMessage: "请选择单条数据收回" })
                            });
                            return _context.abrupt('return');

                        case 22:
                            if (!(recallArray.length > 0)) {
                                _context.next = 31;
                                break;
                            }

                            onStart && onStart();
                            _context.next = 26;
                            return (0, _common.onRecall)(_this.props.url, recallArray);

                        case 26:
                            _ref3 = _context.sent;
                            _ref3$data = _ref3.data;
                            success = _ref3$data.success;
                            detailMsg = _ref3$data.detailMsg;

                            if (detailMsg.data['success'] && detailMsg.data.success == 'success') {
                                onSuccess && onSuccess();
                            } else {
                                onError && onError({
                                    type: 2,
                                    msg: detailMsg.data.message
                                });
                            }

                        case 31:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        return _this;
    }

    _createClass(BpmButtonRecall, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                { onClick: this.handlerBtn },
                this.props.children
            );
        }
    }]);

    return BpmButtonRecall;
}(_react.Component);

BpmButtonRecall.propTypes = propTypes;
BpmButtonRecall.defaultProps = {
    checkedArray: [],
    url: "/example/ygdemo_yw_info/unsubmit",
    data: [],
    className: ""
};
exports.default = BpmButtonRecall;