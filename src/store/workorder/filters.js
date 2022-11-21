const filters = [
    {
        id:0,
        filter_name:'所属模块',
        visible:true,
        isFixedDisplay:true,
        options: [
            {
              value: 1,
              label: "营销",
            },
            {
              value: 2,
              label: "寻客宝",
            },
            {
              value:3,
              label: "客资",
            },
            {
              value: 4,
              label: "公版通助",
            },
            {
              value: 5,
              label: "专版通助",
            },
            {
                value: 6,
                label: "公版AICC",
            },
            {
                value: 7,
                label: "专版AICC",
            },
            {
                value: 8,
                label: "文本客服",
            },
            {
                value: 9,
                label: "基础架构",
            },
            {
                value: 10,
                label: "权益",
            },
            {
                value: 11,
                label: "权限",
            },
            {
                value: 12,
                label: "数据中台",
            },
            {
                value: 13,
                label: "算法",
            },
            {
                value: 14,
                label: "SmartSales",
            },
            {
                value: 15,
                label: "新云端",
            },
            {
                value: 16,
                label: "运营后台",
            },
            {
                value: 17,
                label: "OEM",
            },
          ],
    },{
        id: 1,
        filter_name: '是否是问题',
        visible: true,
        isFixedDisplay:true,
        options:[
            {
                value: 1,
                label: '是问题',
            },{
                value: 0,
                label: '非问题',
            }
        ]
    },{
        id: 2,
        filter_name: '问题类型',
        visible: true,
        isFixedDisplay:true,
        options:[
            {
                value:1,
                label:'技术BUG',
            },
            {
                value:2,
                label:'第三方问题',
            },
            {
                value:3,
                label:'性能问题',
            },
            {
                value:4,
                label:'兼容问题',
            },
            {
                value:5,
                label:'数据问题',
            },
            {
                value:6,
                label:'需求问题',
            },
            {
                value:7,
                label:'配置问题',
            },
            {
                value:8,
                label:'咨询工单',
            },
            {
                value:9,
                label:'协助工单',
            }
        ]
    },{
        id:3,
        filter_name: '问题产生端',
        visible: true,
        isFixedDisplay:true,
        options:[
            {
                value: 1,
                label: '安卓',
            },
            {
                value: 2,
                label: 'IOS',
            },
            {
                value: 3,
                label: 'H5',
            },
            {
                value: 4,
                label: '小程序',
            },
            {
                value: 5,
                label: '企微',
            },
            {
                value: 6,
                label: '服务端',
            },
            {
                value: 7,
                label: 'PC',
            },
            {
                value: 8,
                label: '客户端',
            }
        ]
    },{
        id:4,
        filter_name: '是否重复',
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