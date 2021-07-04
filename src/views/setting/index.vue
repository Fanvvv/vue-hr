<!--
 * @Author: fan
 * @Date: 2021-06-30 19:50:17
 * @LastEditors: fan
 * @LastEditTime: 2021-07-04 15:47:23
 * @Description: 公司设置页面
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane
            label="角色设置"
            class="font-size"
          >
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
                <!-- 使用作用域插槽 -->
                <template slot-scope="{ row }">
                  <el-button
                    type="success"
                    size="small"
                  >分配权限</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click="editRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="delRole(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
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
          </el-tab-pane>
          <!-- 公司设置 -->
          <el-tab-pane label="公司设置">
            <el-form
              label-width="200px"
              style="margin-top: 50px"
              :model="formData"
            >
              <el-form-item label="公司名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.roleAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input
                  v-model="formData.rolePhone"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.eMail"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.description"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog
        :visible="showDialog"
        title="编辑角色"
        @close="handleClose"
      >
        <el-form
          ref="editForm"
          :model="editData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item
            label="角色名"
            prop="name"
          >
            <el-input v-model="editData.name" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="editData.description" />
          </el-form-item>
        </el-form>
        <!-- 表单底部按钮 -->
        <el-row
          type="flex"
          justify="center"
        >
          <el-col :span="4">
            <el-button @click="handleClose">取消</el-button>
            <el-button @click="handleSubmit">确认</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList, delRole, getRoleDetail, updateRole } from '@/api/setting'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 3,
        total: 0
      },
      formData: {
        name: '湖南某某某公司',
        roleAddress: '湖南省长沙市岳麓区',
        rolePhone: '18570561570',
        eMail: 'codeegret@163.com',
        description: 'very good!!!'
      },
      showDialog: false,
      editData: {},
      rules: { name: [{ required: true, message: '角色名不能为空', tirgger: 'blur' }] }
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
    },
    async delRole(id) {
      // 不使用 promise 需要进行错误捕获
      try {
        await this.$confirm('确认删除该角色吗？', '删除角色', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }) // 提示框
        await delRole(id) // 根据 id 删除角色
        this.getRoleList() // 重新获取角色列表
        this.$message.success('删除角色成功') // 提示信息
      } catch (err) {
        console.log(err)
      }
    },
    async editRole(id) {
      // 数据回写
      this.editData = await getRoleDetail(id)
      this.showDialog = true // 显示弹窗
    },
    async handleSubmit() {
      try {
        // 表单校验
        await this.$refs.editForm.validate()
        // 根据id区分是编辑和新增模式
        if (this.editData.id) {
          // 编辑模式
          await updateRole(this.editData)
        } else {
          // 新增模式
        }
      } catch (err) {
        console.log(err)
      }
      // 重新拉取数据
      this.getRoleList()
      this.$message.success('编辑成功')
      this.showDialog = false
    },
    handleClose() {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tabs ::v-deep .el-tabs__item {
  width: 150px;
  text-align: center;
  font-size: 18px;
}
</style>
