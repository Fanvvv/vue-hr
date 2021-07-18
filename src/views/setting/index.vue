<!--
 * @Author: fan
 * @Date: 2021-06-30 19:50:17
 * @LastEditors: fan
 * @LastEditTime: 2021-07-18 23:42:59
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
                :disabled="!checkPermission('add-role')"
                @click="show = true"
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
                    :disabled="!checkPermission('assign-perm')"
                    @click="assignPerm(row.id)"
                  >分配权限</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    :disabled="!checkPermission('edit-role')"
                    @click="editRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    :disabled="!checkPermission('del-role')"
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
        :title="showTitle"
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
      <el-dialog
        :visible="showPerm"
        title="分配权限"
        @close="handlePermClose"
      >
        <el-tree
          ref="permTree"
          :data="permData"
          :props="defaultProps"
          :show-checkbox="true"
          :check-strictly="true"
          :default-expand-all="true"
          :default-checked-keys="selectCheck"
          node-key="id"
        />
        <el-row
          slot="footer"
          type="flex"
          justify="center"
        >
          <el-col :span="6">
            <el-button @click="handlePermClose">取消</el-button>
            <el-button
              type="primary"
              @click="handlePermSubmit"
            >确认</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList, delRole, getRoleDetail, updateRole, addRole, assignPerm } from '@/api/setting'
import { tranListToTreeData } from '@/utils'
import { getPermission } from '@/api/permission'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 10,
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
      rules: { name: [{ required: true, message: '角色名不能为空', tirgger: 'blur' }] },
      showPerm: false,
      defaultProps: {
        label: 'name'
      },
      permData: [], // 专门用来接收权限数据 树形数据
      selectCheck: [], // 定义一个数组来接收 已经选中的节点
      roleId: null // 用来记录分配角色的id
    }
  },
  computed: {
    showTitle() {
      return this.editData.id ? '编辑角色' : '新增角色'
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
          await addRole(this.editData)
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
      // 为了去除 id ，重新赋值
      this.editData = {
        name: '',
        description: ''
      }
      // 移除校验
      this.$refs.editForm.resetFields()
      this.showDialog = false
    },
    async assignPerm(id) {
      this.permData = tranListToTreeData(await getPermission(), '0')
      this.roleId = id
      const { permIds } = await getRoleDetail(id) // permIds是当前角色所拥有的权限点数据
      this.selectCheck = permIds // 将当前角色所拥有的权限id赋值
      this.showPerm = true
    },
    handlePermClose() {
      this.selectCheck = [] // 重置数据
      this.showPerm = false
    },
    async handlePermSubmit() {
      // 调用el-tree的 getCheckedKeys 方法
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.showPerm = false
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
