import axios from 'axios';

const AfterEnd_DomainName = 'http://qcp-api.k8sv2.qa.internal.hsmob.com/api';

const host = 'http://172.19.17.110:8000/api'

//线索构造工具-获取录入方式and推广渠道接口
const getClueChannel = (headers,params)=>{
    return axios.post(`${host}/tool/get_clue_channel`,params,{headers}).then(res=>res.data);
};

// 线索构造工具-执行构造线索任务
const postClueConstruct=(headers,params)=>{
    return axios.post(`${host}/tool/clue_constrcut`,params,{headers}).then(res=>res.data);
};


export default{
    AfterEnd_DomainName,
    getClueChannel,
    postClueConstruct
}