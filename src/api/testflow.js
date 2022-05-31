import request from '@/utils/request'

export function getTestsuitlist() {
  return request({
    url: '/mock/tf/testsuite/list',
    method: 'get',
  })
}

export function Testsuite(data) {
  return request({
    url: '/mock/tf/testsuite/run',
    method: 'post',
    data
  })
}


export function Testreport(data) {
  return request({
    url: '/mock/tf/history/report',
    method: 'post',
    data
  })
}


// export const getTestsuitlist = ()=>request({url:'/mock/tf/testsuite/list',method:'get'});
