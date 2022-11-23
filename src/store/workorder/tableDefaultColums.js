const tableDefaultColumsSetting = [
    {
        colums_key:'title',
        colums_name:'标题',
        colums_width:'230px',
        is_show: true,
        isfixed: true,
        issortable: false,
        index:0,
    },
    {
        colums_key:'create_time',
        colums_name:'创建时间',
        colums_width:'180px',
        is_show: true,
        isfixed: false,
        issortable: 'custom',
        index: 16,
    },
    {
        colums_key:'is_problem',
        colums_name:'是否是问题',
        colums_width:'100px',
        is_show: true,
        isfixed: false,
        issortable: false,
        index:1,
        options:[
            {
                label: '非问题',
                value: 0,
            },{
                label: '是问题',
                value: 1,
            }
        ]
    },{
        colums_key:'type',
        colums_name:'问题类型',
        colums_width:'100px',
        is_show: true,
        isfixed: false,
        issortable: false,
        index:4,
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
        colums_key:'reason',
        colums_name:'问题原因',
        colums_width:'180px',
        is_show: true,
        isfixed: false,
        issortable: false,
        index: 5,
    },{
        colums_key:'repair_method',
        colums_name:'修复方案',
        colums_width:'180px',
        is_show: true,
        isfixed: false,
        issortable: false,
        index: 6,
    },{
        colums_key:'problem_side',
        colums_name:'问题产生端',
        colums_width:'100px',
        is_show: true,
        isfixed: false,
        issortable: false,
        index:15,
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
        colums_key:'module',
        colums_name:'所属模块',
        colums_width:'100px',
        is_show: true,
        isfixed: false,
        issortable: false,
        index: 2,
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
        colums_key:'repairer',
        colums_name:'工单修复人',
        colums_width:'100px',
        is_show: true,
        isfixed: false,
        issortable: false,
        index: 3,
    },{
        colums_key:'is_solved',
        colums_name:'是否彻底解决',
        colums_width:'120px',
        is_show:false,
        isfixed: false,
        issortable: false,
        index: 11,
        options:[
            {
                value: 0,
                label: '已彻底解决',
            },{
                value: 1,
                label: '排期上线',
            },{
                value: 2,
                label: '未彻底解决',
            },{
                value: 3,
                label: '持续观察',
            },
        ]
    },{
        colums_key:'is_repeat',
        colums_name:'是否重复',
        colums_width:'100px',
        is_show:false, 
        isfixed: false,
        issortable: false,
        index: 10,
        options:[
            {
                value: 0,
                label: '否',
            },{
                value: 1,
                label: '是',
            },
        ]
    },{
        colums_key:'replay',
        colums_name:'复盘跟进项',
        colums_width:'150px',
        is_show:false, 
        isfixed: false,
        issortable: false,
        index: 8,
    },{
        colums_key:'follower',
        colums_name:'跟进人',
        colums_width:'100px',
        is_show:false, 
        isfixed: false,
        issortable: false,
        index: 9,
    },{
        colums_key:'follow_result',
        colums_name:'跟进项完成情况',
        colums_width:'120px',
        is_show:false, 
        isfixed: false,
        issortable: false,
        index: 12,
        options:[
            {
                value: 0,
                label: '已完成',
            },{
                value: 1,
                label: '未完成',
            },{
                value: 2,
                label: '进行中',
            },{
                value: 3,
                label: '延期完成',
            },{
                value: 4,
                label: '已延期',
            }
        ]
    },
    {
        colums_key:'is_convert_demand',
        colums_name:'是否转需求',
        colums_width:'100px',
        is_show:false, 
        isfixed: false,
        issortable: false,
        index: 7,
        options:[
            {
                value: 0,
                label: '否',
            },{
                value: 1,
                label: '是',
            },
        ]
    },{
        colums_key:'demand_confirmer',
        colums_name:'需求确认人',
        colums_width:'100px',
        is_show:false, 
        isfixed: false,
        issortable: false,
        index: 14,
    },{
        colums_key:'is_adopted',
        colums_name:'需求是否采纳',
        colums_width:'120px',
        is_show:false, 
        isfixed: false,
        issortable: false,
        index: 13,
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


export function sortColumns(){
    var len = tableDefaultColumsSetting.length;
    var sortedData = []
    for(var i = 0; i<len; i++){
        for(var j in tableDefaultColumsSetting){
            var item = tableDefaultColumsSetting[j];
            if(item.index == i){
                sortedData.push(item)
            }
        }
    }
    return sortedData
    // console.log('测试测试',tableDefaultColumsSettingData);
}

const tableDefaultColumsSettingData = sortColumns();

export default (tableDefaultColumsSetting, tableDefaultColumsSettingData);