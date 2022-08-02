import request from '@/utils/request'

export function getTestsuitlist(data) {
  return request({
    url: '/testflow/script/testsuite/list',
    method: 'post',
  })
}

export function Testsuite(data) {
  return request({
    url: '/testflow/script/testsuite/run',
    method: 'post',
    data
  })
}


// export function Testreport(data) {
//   return request({
//     url: '/mock/tf/history/report',
//     method: 'post',
//     data
//   })
// }

export function Testreport(data) {
  return request({
    url: '/testflow/script/history/report',
    method: 'post',
    data
  })
}


// export const getTestsuitlist = ()=>request({url:'/mock/tf/testsuite/list',method:'get'});
