let option = {
    title: '',
    refType: 2,//1:树形 2.单表 3.树卡型 4.多选 5.default
    className: '',
    param: {//url请求参数
        refCode: 'bd_common_user',
        tenantId: '',
        sysId: '',
        transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
    },
    refModelUrl: {
        TreeUrl: '/newref/rest/iref_ctr/blobRefTree', //树请求
        TableBodyUrl: '/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求//ref/rest/iref_ctr/blobRefTreeGrid
        TableBarUrl: '/newref/rest/iref_ctr/refInfo',//表头请求ref/rest/iref_ctr/refInfo
    },
    filterRefUrl: '/iuap_pap_quickstart/common/filterRef',//get
    // keyList:['123'],//选中的key

    // checkedArray: [],
    onCancel: function (p) {
        console.log(p)
    },
    filterKey: [ { title: '用户名称', key: 'peoname' }],
    textOption: {
        modalTitle: '选择品类',
        leftTitle: '品类结构',
        rightTitle: '品类列表',
        leftTransferText: '待选品类',
        rightTransferText: '已选品类',
        leftInfo: [{ text: '流水号', key: 'peoname' }, { text: '品类编码', key: 'institid' }, { text: '品类描述', key: 'refname' }],
        rightInfo: [{ text: '流水号', key: 'id' }, { text: '品类编码', key: 'id' }, { text: '品类描述', key: 'peocode' }],
    }
}


export default JSON.stringify(option)
