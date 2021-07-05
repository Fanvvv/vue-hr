<!--
 * @Author: fan
 * @Date: 2021-07-05 19:10:27
 * @LastEditors: fan
 * @LastEditTime: 2021-07-05 21:47:16
 * @Description: 封装一个页面工具栏组件
-->

<template>
  <el-card class="page-tools">
    <el-row
      type="flex"
      justify="space-between"
      align="center"
    >
      <el-col>
        <div
          v-if="showBefore"
          class="before"
        >
          <!-- 图标 -->
          <i class="el-icon-info" />
          <!-- 定义前面的插槽 -->
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row
          type="flex"
          justify="end"
        >
          <!-- 定义后面的插槽 -->
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
  props: {
    showBefore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-tools {
  margin: 10px 0;
  .before {
    line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>
