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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var BpmTestCheckTable = function (_Component) {
    _inherits(BpmTestCheckTable, _Component);

    function BpmTestCheckTable() {
        var _this2 = this;

        _classCallCheck(this, BpmTestCheckTable);

        var _this = _possibleConstructorReturn(this, (BpmTestCheckTable.__proto__ || (0, _getPrototypeOf2.default)(BpmTestCheckTable)).call(this));

        _this.componentDidMount = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var hisTasklist, hisTasklistData;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            hisTasklist = 'eiap-plus/process/undoTasklist';
                            _context.next = 3;
                            return _axios2.default.post(hisTasklist, { "draw": 1, "length": 10, "order": {}, "search": { "search_EQ_code": "", "undefined": "", "processDefinitionName": "", "billno": "" }, "searchconfirm": {} });

                        case 3:
                            hisTasklistData = _context.sent;

                            if (Array.isArray(hisTasklistData.data.data)) {
                                _this.setState({
                                    data: hisTasklistData.data.data
                                });
                            }

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));

        _this.state = {
            data: [],
            factoryValue: {}
        };
        _this.columns = [{
            title: "Name",
            dataIndex: "name",
            key: "name"
        }, {
            title: "ID",
            dataIndex: "id",
            key: "id"
        }, {
            title: "processDefinitionId",
            dataIndex: "processDefinitionId",
            key: "processDefinitionId"
        }, {
            title: "processInstanceId",
            dataIndex: "processInstanceId",
            key: "processInstanceId"
        }];
        return _this;
    }

    _createClass(BpmTestCheckTable, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(_tinperBee.Table, {
                bordered: true,
                emptyText: function emptyText() {
                    return _react2.default.createElement(
                        'span',
                        null,
                        '\u6682\u65F6\u6CA1\u6709\u6570\u636E'
                    );
                },
                columns: this.columns,
                data: this.state.data,
                title: function title() {
                    return _react2.default.createElement(
                        _tinperBee.Button,
                        { colors: 'primary', onClick: function onClick() {
                                document.location.hash = '#/bdm/bpmapproval?id=' + _this3.state.factoryValue.id + '&processDefinitionId=' + _this3.state.factoryValue.processDefinitionId + '&processInstanceId=' + _this3.state.factoryValue.processInstanceId;
                            } },
                        '\u4EFB\u52A1\u4E2D\u5FC3\u6253\u5F00\u5BA1\u6279'
                    );
                },
                onRowClick: function onRowClick(record, index, indent) {
                    _this3.setState({
                        factoryValue: record
                    });
                }
            });
        }
    }]);

    return BpmTestCheckTable;
}(_react.Component);

exports.default = BpmTestCheckTable;