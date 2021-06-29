/*
 * @Author: fan
 * @Date: 2021-06-29 17:38:10
 * @LastEditors: fan
 * @LastEditTime: 2021-06-29 17:45:29
 * @Description: 负责管理所用自定义指令
 */

// 该指令用于图片链接失效时，设置默认图片
export const imagerror = {
  /**
   * @description 指令对象，会在当前的 dom 元素插入之前执行
   * @param {String} 表示当前指令作用的 dom 对象
   * @param {Object} 指令中的变量的解释
   */
  inserted(dom, options) {
    dom.src = dom.src || options.value // 初始化的时候 如果有值 则赋值 如果没值 则需要进行默认值赋值
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    dom.onerror = () => {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      dom.src = options.value // 这里不要写死
    }
  }
}
