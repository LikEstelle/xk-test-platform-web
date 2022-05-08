import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}


// export function getTest(params) {
//   return request({
//     url: `/xiaoke-tool-platform/api/v1/test/returnAdd?a=${params}`,
//     method: 'get',
//     params
//   })
// }

export const getTest = (a)=>request({url:`/xiaoke-tool-platform/api/v1/test/returnAdd?a=${a}`,method:'get'});
