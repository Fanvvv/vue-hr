/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-06-29 16:56:35
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

/**
 * @description 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: 'sys/profile',
    method: 'post'
  })
}

export function logout() {
}
