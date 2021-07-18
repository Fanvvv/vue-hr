/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-07-18 21:17:24
 * @Description: state 的快捷访问
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立token映射
  name: state => state.user.userInfo.username, // 建立用户名映射
  userId: state => state.user.userInfo.userId, // 建立用户id映射
  staffPhoto: state => state.user.userInfo.staffPhoto, // 建立用户头像映射
  routes: state => state.permission.routes // 导出当前的路由
}
export default getters
