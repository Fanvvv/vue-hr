<!--
 * @Author: fan
 * @Date: 2021-06-30 19:49:15
 * @LastEditors: fan
 * @LastEditTime: 2021-07-18 23:29:37
 * @Description: 员工页面
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共有{{ page.total }}条记录</span>
        <template v-slot:after>
          <el-button
            type="success"
            @click="$router.push('/import?type=user')"
          >导入</el-button>
          <el-button
            type="danger"
            @click="exportData"
          >导出</el-button>
          <el-button
            :disabled="!checkPermission('add-employees')"
            type="primary"
            @click="showDialog = true"
          >新增员工</el-button>
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
            align="center"
          />
          <el-table-column
            label="姓名"
            width="180"
            property="username"
            align="center"
            sortable
          />
          <el-table-column
            label="头像"
            width="180"
            align="center"
            sortable
          >
            <template v-slot="{ row }">
              <img
                v-imagerror="defaultImg"
                :src="row.staffPhoto"
                style="border-radius: 50%; width: 140px; height: 140px; padding: 20px"
                alt=""
                @click="showQrCode(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            width="180"
            property="mobile"
            align="center"
            sortable
          />
          <el-table-column
            label="工号"
            width="130"
            property="workNumber"
            align="center"
            sortable
          />
          <el-table-column
            label="聘用形式"
            width="180"
            property="formOfEmployment"
            align="center"
            :formatter="formatEmployment"
            sortable
          />
          <el-table-column
            label="部门"
            width="180"
            property="departmentName"
            align="center"
            sortable
          />
          <el-table-column
            label="入职时间"
            width="130"
            property="timeOfEntry"
            align="center"
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
            align="center"
            :formatter="formatWorkingState"
            sortable
          />
          <el-table-column
            label="状态"
            width="130"
            property="enableState"
            align="center"
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
            <template v-slot="{ row }">
              <el-button
                type="text"
                size="small"
                :disabled="!checkPermission('check-employees')"
                @click="$router.push(`/employees/detail/${row.id}`)"
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
                @click="assignRole(row.id)"
              >角色</el-button>
              <el-button
                type="text"
                size="small"
                :disabled="!checkPermission('del-employees')"
                @click="delEmployees(row.id)"
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
      <add-employees :show-dialog.sync="showDialog" />
      <el-dialog
        :visible.sync="showCanvas"
        title="二维码"
      >
        <el-row
          type="flex"
          justify="center"
        >
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
      <!-- 分配角色弹层 -->
      <assign-role
        ref="assignRole"
        :show-assign-dialog.sync="showAssign"
        :user-id="userId"
      />
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import AddEmployees from './components/add-employees.vue'
import { getEmployeesList, delEmployees } from '@/api/employees'
import EmployeesEnum from '@/api/constant/employees'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue'
export default {
  components: {
    PageTools,
    AddEmployees,
    AssignRole
  },
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      showDialog: false,
      showCanvas: false,
      showAssign: false,
      defaultImg: require('@/assets/common/head.jpg'),
      userId: null
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
    },
    async delEmployees(id) { // 根据 id 删除员工
      try {
        await this.$confirm('确认删除该员工吗？', '删除员工', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        await delEmployees(id)
        await this.getEmployeesList()
        this.$message.success('删除员工成功')
      } catch (err) {
        console.log(err)
      }
    },
    formatJson(headers, rows) { // 格式化数据 将 [{}] 转换成 [[]]
      return rows.map(item => {
        // item是一个对象  { mobile: 185xxxxx, username: 'fans' }
        return Object.keys(headers).map(key => {
          // 对时间格式进行处理
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeesEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
      // return rows.map(item => Object.keys(headers).map(key => item[headers[key]]))
    },
    exportData() { // excel 导出
      // 表头对应关系
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 按需加载 export 中的功能
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeesList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows)
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工信息表',
          autoWidth: true,
          bookType: 'xlsx' // 默认为 xlsx
        })
      })
    },
    showQrCode(url) {
      if (url) {
        this.showCanvas = true
        this.$nextTick(() => { // 如果页面有更新，在页面渲染完成后执行
          QrCode.toCanvas(this.$refs.myCanvas, url) // 将链接转化为二维码
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    },
    async assignRole(id) { // 分配角色
      this.userId = id
      await this.$refs.assignRole.getUserDetailById(id) // 父组件调用子组件的方法
      this.showAssign = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
