<!--
 * @Author: fan
 * @Date: 2021-06-30 19:49:33
 * @LastEditors: fan
 * @LastEditTime: 2021-07-18 15:39:09
 * @Description: 权限管理页面
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template v-slot:after>
          <el-button
            type="primary"
            size="small"
            @click="addPermission(1, 0)"
          >添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table
        border
        :data="list"
        row-key="id"
      >
        <el-table-column
          label="名称"
          prop="name"
        />
        <el-table-column
          align="center"
          label="标识"
          prop="code"
        />
        <el-table-column
          align="center"
          label="描述"
          prop="description"
        />
        <el-table-column
          align="center"
          label="操作"
        >
          <template v-slot="{ row }">
            <el-button
              v-if="row.type === 1"
              type="primary"
              @click="addPermission(2, row.id)"
            >添加</el-button>
            <el-button
              type="success"
              @click="editPermission(row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              @click="delPermission(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog
        :title="`${showText}权限点`"
        :visible="showDialog"
        @close="handleCancel"
      >
        <!-- 表单 -->
        <el-form
          ref="perForm"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item
            label="权限名称"
            prop="name"
          >
            <el-input
              v-model="formData.name"
              style="width:90%"
            />
          </el-form-item>
          <el-form-item
            label="权限标识"
            prop="code"
          >
            <el-input
              v-model="formData.code"
              style="width:90%"
            />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input
              v-model="formData.description"
              style="width:90%"
            />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row
          slot="footer"
          type="flex"
          justify="center"
        >
          <el-col :span="6">
            <el-button
              size="small"
              @click="handleCancel"
            >取消</el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleSubmit"
            >确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getPermission, updatePermission, addPermission, getPermissionDetail, delPermission } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    PageTools
  },
  data() {
    return {
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    async getPermission() {
      this.list = tranListToTreeData(await getPermission(), '0')
    },
    handleSubmit() {
      this.$refs.perForm.validate().then(() => {
        if (this.formData.id) { // 根据是否有 id 来判断是新增还是编辑
          return updatePermission(this.formData)
        }
        return addPermission(this.formData)
      }).then(() => {
        this.$message.success('操作成功')
        this.getPermission()
        this.showDialog = false
      })
    },
    handleCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields()
      this.showDialog = false
    },
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除该权限吗？', '删除权限', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        await delPermission(id)
        await this.getPermission()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    addPermission(type, pid) {
      this.formData.pid = pid
      this.formData.type = type
      this.showDialog = true
    },
    async editPermission(id) {
      // 根据获取id获取详情
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
