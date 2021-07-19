/*
 * @Author: fan
 * @Date: 2021-07-19 16:28:33
 * @LastEditors: fan
 * @LastEditTime: 2021-07-19 16:30:31
 * @Description: 公共接口
 */
import request from '@/utils/request'

/**
 * 图片下载
 */
export function imgDownload(data) {
  debugger
  return request({
    url: `/system/upfile/${data.id}`
  })
}

/**
 * 图片上传
 */
export function imgUpload(data) {
  return request({
    url: '/system/upfile',
    data,
    type: 'post'
  })
}

/**
 * 获取城市列表
 */
export function getCityList() {
  return request({
    url: '/sys/city'
  })
}
