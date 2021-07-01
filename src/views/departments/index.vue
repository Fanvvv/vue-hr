<!--
 * @Author: fan
 * @Date: 2021-06-30 19:48:36
 * @LastEditors: fan
 * @LastEditTime: 2021-07-01 21:29:11
 * @Description: 组织架构页面
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tool
          :tree-node="company"
          :is-root="true"
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
          />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTool from './components/tree-tool.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTool
  },
  data() {
    return {
      company: {
        name: '湖南毛塘铺公司',
        manager: '负责人'
      },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
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
