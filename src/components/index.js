/*
 * @Author: fan
 * @Date: 2021-07-05 20:35:44
 * @LastEditors: fan
 * @LastEditTime: 2021-07-15 13:52:30
 * @Description: 组件统一全局注册入口
 */

import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UploadImage from './UploadImage'

export default {
  install(Vue) {
    // 注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImage', UploadImage)
  }
}
