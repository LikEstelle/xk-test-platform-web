const Mock = require('mockjs')


module.exports = [
    {
        url: '/mock/tf/testsuite/list',
        type: 'get',
        response: _ => {
            return{
                code: 200,
                data:[
                    {
                        id:2127,
                        name:"zq_open_api",
                        description:"A脚本",
                        create_time:"创建时间",
                        type:1
                    },
                    {
                        id:2327,
                        name:"zq_open_api",
                        description:"B脚本",
                        create_time:"创建时间",
                        type:2
                    },
                    {
                        id:2127,
                        name:"zq_open_api",
                        description:"C脚本",
                        create_time:"创建时间",
                        type:2
                    },
                    {
                        id:24227,
                        name:"zq_open_api",
                        description:"D脚本",
                        create_time:"创建时间",
                        type:1
                    }, {
                        id:21317,
                        name:"zq_open_api",
                        description:"客资常规场景测试",
                        create_time:"创建时间",
                        type:2
                    }, {
                        id:2127,
                        name:"zq_open_api",
                        description:"客资常规场景测试",
                        create_time:"创建时间",
                        type:2
                    },
                    {
                        id:2127,
                        name:"zq_open_api",
                        description:"客资常规场景测试",
                        create_time:"创建时间",
                        type:1
                    },
                    {
                        id:2127,
                        name:"zq_open_api",
                        description:"A脚本",
                        create_time:"创建时间",
                        type:1
                    },
                    {
                        id:2327,
                        name:"zq_open_api",
                        description:"B脚本",
                        create_time:"创建时间",
                        type:2
                    },
                    
                    
                ]
            }
        }
    },
    {
        url: '/mock/tf/testsuite/run',
        type: 'post',
        response: _ => {
            return{
                code:200,
                msg:"success",
                data:{}
            }
        }
    },
    {
        url: '/mock/tf/history/report',
        type: 'post',
        response: _ => {
            return{
                code:200,
                data:[{
                    id:1,
                    systemname:"系统拼接的名字",
                    freename:"这个是我的报告",
                    url:"www.bibi.com",
                    createtime:"2017-05-10 23:52:19"
                },{
                    id:2,
                    systemname:"系统拼接的名字2",
                    freename:"这个是我的报告2",
                    url:"www.bibi.com",
                    createtime:"2017-05-10 23:52:19"
                }]
            }
        }
    }
  ]