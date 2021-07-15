/*
 * @Author: fan
 * @Date: 2021-07-03 14:06:33
 * @LastEditors: fan
 * @LastEditTime: 2021-07-15 10:37:54
 * @Description: 获取员工数据
 */

import request from '@/utils/request'

/**
 * 获取员工简单列表
 */
export function getEmployeesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工综合列表
 */
export function getEmployeesList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工
 */
export function delEmployees(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 新增员工
 */
export function addEmployees(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 * 批量导入员工
 */
export function importEmployees(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data // 这是一个数组
  })
}

/**
 * 保存员工基本信息
 */
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 获取用户详情的基础信息
 */
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/**
 * 更新用户详情的基础信息
 */
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/**
 * 获取用户的岗位信息
 */
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 更新用户的岗位信息
 */
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
