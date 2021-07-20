/*
 * @Author: fan
 * @Date: 2021-07-20 11:35:43
 * @LastEditors: fan
 * @LastEditTime: 2021-07-20 12:46:42
 * @Description: 使用语言包
 */
import Vue from 'vue' // 引入Vue
import VueI18n from 'vue-i18n' // 引入国际化的包
import Cookie from 'js-cookie' // 引入cookie包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包
import customZH from './zh'
import customEN from './en'
Vue.use(VueI18n) // 全局注册国际化包
export default new VueI18n({
  locale: Cookie.get('language') || 'zh', // 从cookie中获取语言类型 获取不到就是中文
  messages: {
    en: {
      ...elementEN, // 将饿了么的英文语言包引入
      ...customEN // 引入自定义英文语言包
    },
    zh: {
      ...elementZH, // 将饿了么的中文语言包引入
      ...customZH // 引入自定义中文语言包
    }
  }
})
