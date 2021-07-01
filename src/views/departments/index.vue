<!--
 * @Author: fan
 * @Date: 2021-06-30 19:48:36
 * @LastEditors: fan
 * @LastEditTime: 2021-07-01 22:39:48
 * @Description: 组织架构页面
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tool
          :tree-node="company"
          :is-root="true"
          @addDept="addDept"
        />
        <el-tree
          :data="departs"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <tree-tool
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDept="addDept"
          />
        </el-tree>
      </el-card>
      <add-dept :show-dialog="showDialog" />
    </div>
  </div>
</template>

<script>
import TreeTool from './components/tree-tool.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTool,
    AddDept
  },
  data() {
    return {
      showDialog: false,
      company: {
        name: '湖南毛塘铺公司',
        manager: '负责人'
      },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      node: null // 用来记录新增部门的当前节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      // console.log(result)
      this.departs = tranListToTreeData(result.depts, '')
    },
    addDept(node) {
      this.showDialog = true // 显示 dialog
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
