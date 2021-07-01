<!--
 * @Author: fan
 * @Date: 2021-07-01 17:43:50
 * @LastEditors: fan
 * @LastEditTime: 2021-07-01 18:07:36
 * @Description: 树形操作栏组件
-->
<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="4">
      <el-row
        type="flex"
        justify="end"
      >
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span>操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeTool',
  props: {
    treeNode: {
      require: true, // 为 true 表示使用该组件必须传该值
      type: Object,
      default() {
        return {}
      }
    },
    isRoot: { // 是否为根目录，用于判断有多少个操作功能
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
