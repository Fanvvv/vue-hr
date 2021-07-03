/*
 * @Author: fan
 * @Date: 2021-07-01 18:15:55
 * @LastEditors: fan
 * @LastEditTime: 2021-07-03 16:34:10
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

/**
 * @description 添加部门操作
 */
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 * @description 获取部门详情
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
