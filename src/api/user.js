/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-06-28 22:24:54
 * @Description: api用户模块的封装
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
}

export function logout() {
}
