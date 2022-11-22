const filters = [
    {
        id:0,
        filter_name:'所属模块',
        filter_key:'module',
        visible:true,
        isFixedDisplay:true,
        options: [
            {
              value: "营销",
              label: "营销",
            },
            {
              value: "寻客宝",
              label: "寻客宝",
            },
            {
              value: "客资",
              label: "客资",
            },
            {
              value: "公版通助",
              label: "公版通助",
            },
            {
              value: "专版通助",
              label: "专版通助",
            },
            {
                value: "公版AICC",
                label: "公版AICC",
            },
            {
                value: "专版AICC",
                label: "专版AICC",
            },
            {
                value: "文本客服",
                label: "文本客服",
            },
            {
                value: "基础架构",
                label: "基础架构",
            },
            {
                value: "权益",
                label: "权益",
            },
            {
                value: "权限",
                label: "权限",
            },
            {
                value: "数据中台",
                label: "数据中台",
            },
            {
                value: "算法",
                label: "算法",
            },
            {
                value: "SmartSales",
                label: "SmartSales",
            },
            {
                value: "新云端",
                label: "新云端",
            },
            {
                value: "运营后台",
                label: "运营后台",
            },
            {
                value: "OEM",
                label: "OEM",
            },
          ],
    },{
        id: 1,
        filter_name: '是否是问题',
        filter_key:'is_problem',
        visible: true,
        isFixedDisplay:true,
        options:[
            {
                value: "是问题",
                label: "是问题",
            },{
                value: "非问题",
                label: "非问题",
            }
        ]
    },{
        id: 2,
        filter_name: '问题类型',
        filter_key:'type',
        visible: true,
        isFixedDisplay:true,
        options:[
            {
                value:'技术BUG',
                label:'技术BUG',
            },
            {
                value: '第三方问题',
                label: '第三方问题',
            },
            {
                value: '性能问题',
                label: '性能问题',
            },
            {
                value:'兼容问题',
                label:'兼容问题',
            },
            {
                value:'数据问题',
                label:'数据问题',
            },
            {
                value:'需求问题',
                label:'需求问题',
            },
            {
                value:'配置问题',
                label:'配置问题',
            },
            {
                value:'咨询工单',
                label:'咨询工单',
            },
            {
                value:'协助工单',
                label:'协助工单',
            }
        ]
    },{
        id:3,
        filter_name: '问题产生端',
        filter_key:'problem_side',
        visible: false,
        isFixedDisplay:false,
        options:[
            {
                value: '安卓',
                label: '安卓',
            },
            {
                value: 'IOS',
                label: 'IOS',
            },
            {
                value: 'H5',
                label: 'H5',
            },
            {
                value: '小程序',
                label: '小程序',
            },
            {
                value: '企微',
                label: '企微',
            },
            {
                value: '服务端',
                label: '服务端',
            },
            {
                value: 'PC',
                label: 'PC',
            },
            {
                value: '客户端',
                label: '客户端',
            }
        ]
    },{
        id:4,
        filter_name: '是否重复',
        filter_key:'is_repeat',
        visible: false,
        isFixedDisplay:false,
        options:[
            {
                value: 1,
                label: '是',
            },{
                value: 0,
                label: '否',
            }
        ]
    },{
        id:5,
        filter_name: '复盘跟进项',
        filter_key:'replay',
        visible: false,
        isFixedDisplay:false,
        options:[
            {
                value: 0,
                label: '空',
            },{
                value: 1,
                label: '非空',
            }
        ]
    },{
        id:6,
        filter_name: '是否转需求',
        filter_key:'is_convert_demand',
        visible: false,
        isFixedDisplay:false,
        options:[
            {
                value: 1,
                label: '是',
            },{
                value: 0,
                label: '否',
            }
        ]
    },{
        id:7,
        filter_name: '需求是否采纳',
        filter_key:'is_adopted',
        visible: false,
        isFixedDisplay:false,
        options:[
            {
                value: 0,
                label: '需求采纳',
            },{
                value: 1,
                label: '需求打回',
            },{
                value: 2,
                label: '需求排期中',
            },{
                value: 3,
                label: '需求已上线',
            },
        ]
    }
]

export default filters;