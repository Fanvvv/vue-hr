<!--
 * @Author: fan
 * @Date: 2021-07-20 11:12:03
 * @LastEditors: fan
 * @LastEditTime: 2021-07-20 11:22:47
 * @Description: 全屏组件按钮
-->
<template>
  <div>
    <svg-icon
      icon-class="fullscreen"
      style="color:#fff; width: 20px; height: 20px"
      @click="changeScreen"
    />
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import ScreenFull from 'screenfull'
export default {
  name: 'ScreenFull',
  components: {
    SvgIcon
  },
  methods: {
    changeScreen() {
      // document.documentElement.requestFullscreen() // 原生全屏的方法
      // document.exitFullscreen() // 原生退出全屏的方法
      if (!ScreenFull.isEnabled) { // 判断浏览器是否能支持放大缩小
        this.$message.warning('该浏览器不支持全屏')
        return
      }
      ScreenFull.toggle()
    }
  }
}
</script>

