import request from '@/utils/request'


// 接口自动化
export function Testsuite(data) {
  return request({
    url: '/testflow/script/testsuite/run',
    method: 'post',
    data
  })
}

// 接口自动化报告-废弃
export function Testreport(data) {
  return request({
    url: '/testflow/script/history/report',
    method: 'post',
    data
  })
}

// 数据对比
export function ContrastData(data) {
  return request({
    url: '/testflow/tools/comparisons/',
    method: 'post',
    data
  })
}



// 接口用例模块
export function CaseModel(page_size) {
  return request({
    url: `/testflow/TestCase/Module?page_size=${page_size}`,
    method: 'get',
  })
}


// 日志排查接口
export function LogList(pid, phone, start_time, end_time) {
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

// 插件开通
export function BuyPlugin(data) {
  return request({
    url: '/testflow/tools/plugin/',
    method: 'post',
    data
  })
}

// 一键开通
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

// 设备管理id查询
export function SourceManagementID(ID) {
  return request({
    url: `/testflow/tools/SourceManagement/${ID}/`,
    method: 'get',
  })
}

// 设备管理修改
export function PSourceManagementID(id, data) {
  return request({
    url: `/testflow/tools/SourceManagement/${id}/`,
    method: 'patch',
    data
  })
}

// URL页面检测
export function Pagetime(data) {
  return request({
    url: '/testflow/tools/pagetime/',
    method: 'post',
    data
  })
}

// 忘了
export function Scrip(type) {
  return request({
    url: `/testflow/script/Scrip/?type=${type}`,
    method: 'get',
  })
}