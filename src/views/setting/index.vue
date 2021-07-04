<!--
 * @Author: fan
 * @Date: 2021-06-30 19:50:17
 * @LastEditors: fan
 * @LastEditTime: 2021-07-04 14:06:55
 * @Description: 公司设置页面
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色设置">
            <el-row style="height: 100px; padding-top: 40px">
              <el-button
                icon="el-icon-plus"
                type="primary"
                size="small"
              >新增角色</el-button>
            </el-row>
            <el-table
              border
              :data="list"
            >
              <el-table-column
                type="index"
                label="序号"
                width="200"
                align="center"
              />
              <el-table-column
                label="角色名"
                sortable
                width="300"
                align="center"
                prop="name"
              />
              <el-table-column
                label="描述"
                align="center"
                prop="description"
              />
              <el-table-column
                label="操作"
                align="center"
                width="400"
              >
                <el-button
                  type="success"
                  size="small"
                >分配权限</el-button>
                <el-button
                  type="primary"
                  size="small"
                >编辑</el-button>
                <el-button
                  type="danger"
                  size="small"
                >删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="公司设置">公司设置</el-tab-pane>
        </el-tabs>
        <el-row
          style="height: 80px; padding-top: 30px"
          type="flex"
          justify="center"
        >
          <el-pagination
            layout="prev,pager,next"
            :total="page.total"
            :current-page="page.page"
            :page-size="page.pagesize"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 3,
        total: 0
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      // console.log(total, rows)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
