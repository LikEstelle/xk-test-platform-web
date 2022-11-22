import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/mock/table/list',
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

// export const getTest = (a)=>request({url:`/v1/test/returnAdd?a=${a}`,method:'get'});



export function getTest(test) {
  return request({
    url: `/api/v1/test/returnAdd?a=${test}`,
    method: 'get',
  })
}
