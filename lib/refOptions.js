'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _intl = require('./local/intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var option = {
    title: '',
    refType: 2,
    className: '',
    buttonText: { ok: (0, _intl.getlocals)({ id: "js.b9f.src5.0026", defaultMessage: "确定" }),
        cancel: (0, _intl.getlocals)({ id: "js.b9f.src14.0010", defaultMessage: "取消" }) },
    param: {
        refCode: 'bd_common_user',
        tenantId: '',
        sysId: '',
        transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION'
    },
    refModelUrl: {
        TreeUrl: '/newref/rest/iref_ctr/blobRefTree',
        TableBodyUrl: '/newref/rest/iref_ctr/blobRefTreeGrid',
        TableBarUrl: '/newref/rest/iref_ctr/refInfo' },
    filterRefUrl: '/iuap_pap_quickstart/common/filterRef',
    onCancel: function onCancel(p) {
        console.log(p);
    },
    filterKey: [{ title: '用户名称', key: 'peoname' }],
    textOption: {
        modalTitle: '选择品类',
        leftTitle: '品类结构',
        rightTitle: '品类列表',
        leftTransferText: '待选品类',
        rightTransferText: '已选品类',
        leftInfo: [{ text: '流水号', key: 'peoname' }, { text: '品类编码', key: 'institid' }, { text: '品类描述', key: 'refname' }],
        rightInfo: [{ text: '流水号', key: 'id' }, { text: '品类编码', key: 'id' }, { text: '品类描述', key: 'peocode' }]
    }
};

exports.default = (0, _stringify2.default)(option);