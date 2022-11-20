import request from '@/utils/request'
// 测试工具相关接口

// 工单分析-工单列表
export function getWorkOrderData(page_number,page_size) {
  return request({
    url: `/testflow/tools/WorkOrder/?page_number=${page_number}&page_size=${page_size}`,
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