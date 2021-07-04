/*
 * @Author: fan
 * @Date: 2021-07-04 13:38:48
 * @LastEditors: fan
 * @LastEditTime: 2021-07-04 13:45:31
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
