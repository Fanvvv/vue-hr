/*
 * @Author: fan
 * @Date: 2021-07-01 18:15:55
 * @LastEditors: fan
 * @LastEditTime: 2021-07-01 20:02:02
 * @Description: 组织架构页面数据请求的封装
 */
import request from '@/utils/request'

/**
 * @description 获取组织架构页面的信息
 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/**
 * @description 删除某个部门
 */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
