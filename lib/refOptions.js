'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var option = {
    title: '复杂表格参照',
    backdrop: true,
    disabled: false,
    multiple: false,
    strictMode: true,
    param: {
        refCode: 'new_relatedUser'
    },
    refModelUrl: {
        tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',
        refInfo: '/pap_basedoc/common-ref/refInfo' },
    matchUrl: '/pap_basedoc/common-ref/matchPKRefJSON',
    filterUrl: '/pap_basedoc/common-ref/filterRefJSON',
    valueField: "refpk",
    displayField: "{refname}",
    fliterColumn: [{
        dataIndex: "code",
        filterDropdown: "show",
        filterDropdownType: "string",
        filterType: "text",
        filterDropdownIncludeKeys: ['LIKE', 'ULIKE', 'EQ']
    }, {
        dataIndex: "name",
        filterDropdown: "show",
        filterDropdownType: "string",
        filterType: "text",
        filterDropdownIncludeKeys: ['LIKE', 'ULIKE', 'EQ']
    }, {
        dataIndex: "level",
        filterDropdown: "show",
        filterDropdownType: "string",
        filterType: "dropdown",
        filterDropdownIncludeKeys: ['LIKE', 'ULIKE', 'EQ']
    }]
};

exports.default = (0, _stringify2.default)(option);