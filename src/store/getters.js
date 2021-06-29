/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-06-29 17:05:34
 * @Description: state 的快捷访问
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立token映射
  name: state => state.user.userInfo.username // 建立用户名映射
}
export default getters
