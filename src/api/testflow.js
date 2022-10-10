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

export function ContrastData(data) {
  return request({
    url: '/testflow/tools/comparisons/',
    method: 'post',
    data
  })
}

export function Test(data) {
  return request({
    url: '/testflow/tools/comparisons/',
    method: 'post',
    data
  })
}


// export function CaseModel(data) {
//   return request({
//     url: '/testflow/TestCase/Module?page_size=100',
//     method: 'get',
//     data
//   })
// }



export function CaseModel(page_size) {
  return request({
    url: `/testflow/TestCase/Module?page_size=${page_size}`,
    method: 'get',
  })
}

// export function CaseModel(page_size) {
//   return request({
//     url: `/testflow/TestCase/Module?page_size=${page_size}`,
//     method: 'get',
//   })
// }


export function LogList(pid,phone,start_time,end_time) {
  return request({
    url: `/testflow/script/LogList/?pid=${pid}&phone=${phone}&StartTime=${start_time}&EndTime=${end_time}`,
    method: 'get',
  })
}


// export function LogList() {
//   return request({
//     url: `/testflow/script/LogList/`,
//     method: 'get',
//   })
// }
// export const getTestsuitlist = ()=>request({url:'/mock/tf/testsuite/list',method:'get'});
