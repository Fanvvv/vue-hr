<!--
 * @Author: fan
 * @Date: 2021-07-01 17:43:50
 * @LastEditors: fan
 * @LastEditTime: 2021-07-01 21:44:26
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
          <el-dropdown @command="operateDepts">
            <span>操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="del"
              >删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
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
  },
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 添加操作
      } else if (type === 'edit') {
        // 编辑操作
      } else {
        // 删除操作
        this.$confirm('确定删除该部门吗？').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          // 删除成功后执行，发射一个事件让父组件监听
          this.$emit('delDepts')
          this.$message.success('删除成功')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
