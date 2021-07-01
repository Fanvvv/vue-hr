<!--
 * @Author: fan
 * @Date: 2021-06-30 19:48:36
 * @LastEditors: fan
 * @LastEditTime: 2021-07-01 17:42:04
 * @Description: 组织架构页面
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <el-row
          type="flex"
          justify="space-between"
        >
          <el-col>湖南毛塘铺公司</el-col>
          <el-col :span="4">
            <el-row
              type="flex"
              justify="end"
            >
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span>操作<i class="el-icon-arrow-down" /></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree
          :data="departs"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <el-row
            slot-scope="{ data }"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px; width: 100%"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <el-row
                type="flex"
                justify="end"
              >
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <el-dropdown>
                    <span>操作<i class="el-icon-arrow-down" /></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
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
