import request from '@/utils/request'

// export function getTestsuitlist(data) {
//   return request({
//     url: '/testflow/script/testsuite/list',
//     method: 'post',
//   })
// }

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

// 日志排查接口
export function LogList(pid,phone,start_time,end_time) {
  return request({
    url: `/testflow/script/LogList/?page_size=100&pid=${pid}&phone=${phone}&start_time=${start_time}&end_time=${end_time}`,
    method: 'get',
  })
}

// 套餐开通接口
export function BuyPack(data) {
  return request({
    url: '/testflow/tools/pack/',
    method: 'post',
    data
  })
}

export function BuyPlugin(data) {
  return request({
    url: '/testflow/tools/plugin/',
    method: 'post',
    data
  })
}

export function BuyRights(data) {
  return request({
    url: '/testflow/tools/rights/',
    method: 'post',
    data
  })
}

// 设备管理接口
export function SourceManagementAll(page_size) {
  return request({
    url: `/testflow/tools/SourceManagement/?page_size=${page_size}`,
    method: 'get',
  })
}


export function SourceManagementID(ID) {
  return request({
    url: `/testflow/tools/SourceManagement/${ID}/`,
    method: 'get',
  })
}

export function PSourceManagementID(id,data) {
  return request({
    url: `/testflow/tools/SourceManagement/${id}/`,
    method: 'patch',
    data
  })
}


export function Pagetime(data) {
  return request({
    url: '/testflow/tools/pagetime/',
    method: 'post',
    data
  })
}


export function Scrip(type) {
  return request({
    url: `/testflow/script/Scrip/?type=${type}`,
    method: 'get',
  })
}