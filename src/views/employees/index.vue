<!--
 * @Author: fan
 * @Date: 2021-06-30 19:49:15
 * @LastEditors: fan
 * @LastEditTime: 2021-07-05 22:43:37
 * @Description: 员工页面
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共有{{ page.total }}条记录</span>
        <template v-slot:after>
          <el-button type="success">导入</el-button>
          <el-button type="danger">导出</el-button>
          <el-button type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <el-card v-loading="loading">
        <el-table
          border
          :data="list"
        >
          <el-table-column
            label="序号"
            type="index"
            width="100"
          />
          <el-table-column
            label="姓名"
            width="180"
            property="username"
            sortable
          />
          <el-table-column
            label="手机号"
            width="180"
            property="mobile"
            sortable
          />
          <el-table-column
            label="工号"
            width="130"
            property="workNumber"
            sortable
          />
          <el-table-column
            label="聘用形式"
            width="180"
            property="formOfEmployment"
            :formatter="formatEmployment"
            sortable
          />
          <el-table-column
            label="部门"
            width="180"
            property="departmentName"
            sortable
          />
          <el-table-column
            label="入职时间"
            width="130"
            property="timeOfEntry"
            sortable
          >
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="是否在职"
            width="130"
            property="inServiceStatus"
            :formatter="formatWorkingState"
            sortable
          />
          <el-table-column
            label="状态"
            width="130"
            property="enableState"
            sortable
          >
            <template v-slot="{ row }">
              <!-- value / v-model 绑定值 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
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
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 100px"
        >
          <el-pagination
            layout="prev, pager, next"
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getEmployeesList } from '@/api/employees'
import EmployeesEnum from '@/api/constant/employees'
export default {
  components: {
    PageTools
  },
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    async getEmployeesList() {
      this.loading = true
      const { rows, total } = await getEmployeesList(this.page)
      this.list = rows
      this.page.total = total
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeesList()
    },
    formatEmployment(row, column, cellValue, index) { // 格式化聘用形式
      // console.log(row, column, cellValue, index)
      // 寻找值所对应的 id
      const result = EmployeesEnum.hireType.find(item => item.id === cellValue)
      // console.log(result)
      return result ? result.value : '未知'
    },
    formatWorkingState(row, column, cellValue, index) { // 格式化在职状态
      const result = EmployeesEnum.workingState.find(item => item.id === cellValue)
      return result ? result.value : '未知'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
