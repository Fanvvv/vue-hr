<!--
 * @Author: fan
 * @Date: 2021-07-20 12:34:19
 * @LastEditors: fan
 * @LastEditTime: 2021-07-20 12:40:20
 * @Description: 多语言按钮组件
-->
<template>
  <el-dropdown
    trigger="click"
    @command="changeLanguage"
  >
    <svg-icon
      icon-class="language"
      style="color:#fff;font-size:20px"
    />
    <el-dropdown-menu>
      <el-dropdown-item
        command="zh"
        :disabled="'zh'=== $i18n.locale "
      >中文</el-dropdown-item>
      <el-dropdown-item
        command="en"
        :disabled="'en'=== $i18n.locale "
      >English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'LangSelect',
  methods: {
    changeLanguage(type) {
      Cookie.set('language', type) // 将语言写入cookie中
      this.$i18n.locale = type // 设置给本地的i18n插件
      this.$message.success('切换语言成功')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
