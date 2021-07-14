/*
 * @Author: fan
 * @Date: 2021-07-03 14:06:33
 * @LastEditors: fan
 * @LastEditTime: 2021-07-14 21:41:17
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
