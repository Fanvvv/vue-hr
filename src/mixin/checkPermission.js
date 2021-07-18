/*
 * @Author: fan
 * @Date: 2021-07-18 22:36:39
 * @LastEditors: fan
 * @LastEditTime: 2021-07-18 23:34:48
 * @Description: 使用混入 mixin 给全局添加一个检测权限的方法
 */
import store from '@/store'

export default {
  methods: {
    checkPermission(key) {
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      // 没进入判断，说明没有权限
      return false
    }
  }
}
