/*
 * @Author: fan
 * @Date: 2021-07-03 14:06:33
 * @LastEditors: fan
 * @LastEditTime: 2021-07-06 16:58:20
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
