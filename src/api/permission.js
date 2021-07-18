/*
 * @Author: fan
 * @Date: 2021-07-18 14:29:23
 * @LastEditors: fan
 * @LastEditTime: 2021-07-18 14:37:20
 * @Description: 权限设置接口
 */
import request from '@/utils/request'

/**
 * 获取所有权限
 */
export function getPermission() {
  return request({
    url: '/sys/permission'
  })
}

/**
 * 获取权限点详情
 */
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}

/**
 * 添加权限点
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

/**
 * 更新权限
 */
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除权限
 */
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
