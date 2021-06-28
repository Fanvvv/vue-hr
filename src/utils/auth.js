/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-06-29 00:05:38
 * @Description: 提供了获取token,设置token,删除token的方法
 */
import Cookies from 'js-cookie'

const TokenKey = 'hr-ihrm-token' // 设定一个独一无二的 key

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
