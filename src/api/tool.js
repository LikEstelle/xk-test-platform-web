import request from '@/utils/request'
// 测试工具相关接口

// 工单分析-工单列表
export function getWorkOrderData(params) {
  var param = ""
  for(var item in params){
    console.log(item,params[item]);
    // 为空的参数不传
    if(params[item]!=="" && params[item]!==null){
      // 遍历拼接到链接上传参
      var parami = item + "=" + params[item] + "&"
      param = param + parami
    }
  }
  param = param.substr(0, param.length - 1);
  return request({
    url: `/testflow/tools/WorkOrder/?${param}`,
    method: 'get'
  })
}

export function editWorkOrderData(id,data){
  return request({
    url: `/testflow/tools/WorkOrder/${id}/`,
    method:'patch',
    data
  })
}