/*
 * @Author: fan
 * @Date: 2021-07-04 13:38:48
 * @LastEditors: fan
 * @LastEditTime: 2021-07-04 14:44:32
 * @Description: 公司和角色设置
 */
import request from '@/utils/request'

/**
 * @description 获取所有角色列表
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * @description 根据 id 删除角色信息
 */
export function delRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * @description 根据 id 查询公司信息
 */
export function getRoleDetail(id) {
  return request({
    url: `/company/${id}`
  })
}
