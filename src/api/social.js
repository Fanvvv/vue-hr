/*
 * @Author: fan
 * @Date: 2021-07-19 16:20:02
 * @LastEditors: fan
 * @LastEditTime: 2021-07-19 16:26:51
 * @Description: 社保页数据接口
 */
import request from '@/utils/request'

/**
 * 查询月份数据报表
 */
export function getArchivingCont(params) {
  return request({
    url: `/social_securitys/historys/${params.month}`,
    params
  })
}

/**
 * 查询社保历史归档列表
 */
export function getArchivingList(data) {
  return request({
    url: `/social_securitys/historys/${data.year}/list`,
    data
  })
}

/**
 * 设置企业社保配置信息
 */
export function newReport(data) {
  return request({
    url: `/social_securitys/historys/${data.yearMonth}/newReport`,
    method: 'put',
    data
  })
}

/**
 * 根据用户id和考勤年月查询用户考勤归档明细
 */
export function getHistorysData(data) {
  return request({
    url: `/social_securitys/historys/archiveDetail/${data.userId}/${data.yearMonth}`,
    data
  })
}
export function getArchivingExport(data) {
  return request({
    url: `/social_securitys/historys/${data.yearMonth}/export`,
    data
  })
}
export function getArchivingFirst(data) {
  return request({
    url: `/social_securitys/historys/${data.yearMonth}/first`,
    data
  })
}

/**
 * 查询企业用户社保列表
 */
export function getSocialList(data) {
  return request({
    url: '/social_securitys/list',
    method: 'post',
    data
  })
}

/**
 * 社保数据归档
 */
export function getArchivingArchive(data) {
  return request({
    url: `/social_securitys/historys/${data.yearMonth}/archive`,
    method: 'post',
    data
  })
}

export function getTips(yearMonth) {
  return request({
    url: `/social_securitys/tips/${yearMonth}`
  })
}

/**
 * 保存或更新用户社保数据
 */
export function saveContent(data) {
  return request({
    url: `/social_securitys/${data.userId}`,
    method: 'put',
    data
  })
}

/**
 * 根据用户id查询用户的社保数据
 */
export function getContent(userId) {
  return request({
    url: `/social_securitys/${userId}`
  })
}

/**
 * 根据城市id查询参保城市的参保项目
 */
export function getPaymentItemList(id) {
  return request({
    url: `/social_securitys/payment_item/${id}`
  })
}

/**
 * 查询企业社保配置信息
 */
export function getSettings() {
  return request({
    url: '/social_securitys/settings'
  })
}

/**
 * 保存企业社保配置信息
 */
export function saveSettings(data) {
  return request({
    url: '/social_securitys/settings',
    data,
    method: 'post'
  })
}

