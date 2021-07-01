/*
 * @Author: fan
 * @Date: 2021-07-01 18:15:55
 * @LastEditors: fan
 * @LastEditTime: 2021-07-01 19:02:35
 * @Description: 组织架构页面数据请求的封装
 */
import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
