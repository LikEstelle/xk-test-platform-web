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
                        creat_time:"创建时间",
                        type:1
                    },
                    {
                        id:2327,
                        name:"zq_open_api",
                        description:"B脚本",
                        creat_time:"创建时间",
                        type:2
                    },
                    {
                        id:2127,
                        name:"zq_open_api",
                        description:"C脚本",
                        creat_time:"创建时间",
                        type:2
                    },
                    {
                        id:24227,
                        name:"zq_open_api",
                        description:"D脚本",
                        creat_time:"创建时间",
                        type:1
                    }, {
                        id:21317,
                        name:"zq_open_api",
                        description:"客资常规场景测试",
                        creat_time:"创建时间",
                        type:2
                    }, {
                        id:2127,
                        name:"zq_open_api",
                        description:"客资常规场景测试",
                        creat_time:"创建时间",
                        type:2
                    },
                    {
                        id:2127,
                        name:"zq_open_api",
                        description:"客资常规场景测试",
                        creat_time:"创建时间",
                        type:1
                    },
                    {
                        id:2127,
                        name:"zq_open_api",
                        description:"A脚本",
                        creat_time:"创建时间",
                        type:1
                    },
                    {
                        id:2327,
                        name:"zq_open_api",
                        description:"B脚本",
                        creat_time:"创建时间",
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
            

    }
  ]