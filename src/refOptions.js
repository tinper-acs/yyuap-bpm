let option = {
    title: '复杂表格参照',
    backdrop: true,
    disabled: false,
    multiple: false,
    strictMode: true,
    param:{//url请求参数
        refCode:'new_relatedUser'
    },
    refModelUrl:{
        tableBodyUrl:'/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
        refInfo:'/pap_basedoc/common-ref/refInfo',//表头请求
    },
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
    },{
        dataIndex: "name",
        filterDropdown: "show",
        filterDropdownType: "string",
        filterType: "text",
        filterDropdownIncludeKeys: ['LIKE', 'ULIKE', 'EQ']
    },{
        dataIndex: "level",
        filterDropdown: "show",
        filterDropdownType: "string",
        filterType: "dropdown",
        filterDropdownIncludeKeys: ['LIKE', 'ULIKE', 'EQ']
    }]
};


export default JSON.stringify(option)
