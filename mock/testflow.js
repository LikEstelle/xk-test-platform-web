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
                data:{
                    list:[
                        {
                            id:1,
                            system_name:"系统拼接的名字",
                            free_name:"这个是我的报告",
                            url:"https://www.bilibili.com/",
                            create_time:"2017-05-10 23:50:19",
                            tag: "success",
                        },{
                            id:2,
                            system_name:"系统拼接的名字2",
                            free_name:"这个是我的报告2",
                            url:"https://www.baidu.com",
                            create_time:"2017-05-10 23:52:19",
                            tag: "success",
                        },{
                            id:3,
                            system_name:"系统拼接的名字2",
                            free_name:"这个是我的报告2",
                            url:"https://www.baidu.com",
                            create_time:"2017-05-09 23:52:19",
                            tag: "fail",
                        },{
                            id:4,
                            system_name:"系统拼接的名字2",
                            free_name:"这个是我的报告2",
                            url:"https://www.baidu.com",
                            create_time:"2017-05-08 23:52:19",
                            tag: "success",
                        },{
                            id:5,
                            system_name:"系统拼接的名字2",
                            free_name:"这个是我的报告2",
                            url:"https://www.baidu.com",
                            create_time:"2017-04-10 23:52:19",
                            tag: "fail",
                        }
                    ],
                    total:90,
                }
            }
        }
    }
  ]