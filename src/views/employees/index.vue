<!--
 * @Author: fan
 * @Date: 2021-06-30 19:49:15
 * @LastEditors: fan
 * @LastEditTime: 2021-07-05 20:55:40
 * @Description: 员工页面
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共有11条记录</span>
        <template slot="after">
          <el-button type="success">导入</el-button>
          <el-button type="danger">导出</el-button>
          <el-button type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table border>
          <el-table-column label="序号" />
          <el-table-column
            label="姓名"
            sortable
          />
          <el-table-column
            label="手机号"
            sortable
          />
          <el-table-column
            label="工号"
            sortable
          />
          <el-table-column
            label="聘用形式"
            sortable
          />
          <el-table-column
            label="部门"
            sortable
          />
          <el-table-column
            label="入职时间"
            sortable
          />
          <el-table-column
            label="是否在职"
            sortable
          />
          <el-table-column
            label="状态"
            sortable
          />
          <el-table-column label="操作">
            <template>
              <el-button
                type="text"
                size="small"
              >查看
              </el-button>
              <el-button
                type="text"
                size="small"
              >转正</el-button>
              <el-button
                type="text"
                size="small"
              >调岗</el-button>
              <el-button
                type="text"
                size="small"
              >离职</el-button>
              <el-button
                type="text"
                size="small"
              >角色</el-button>
              <el-button
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
export default {
  components: {
    PageTools
  }
}
</script>

<style lang="scss" scoped>
</style>
