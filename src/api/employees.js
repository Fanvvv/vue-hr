/*
 * @Author: fan
 * @Date: 2021-07-03 14:06:33
 * @LastEditors: fan
 * @LastEditTime: 2021-07-05 21:23:43
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
