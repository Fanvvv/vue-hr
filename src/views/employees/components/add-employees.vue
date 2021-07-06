<!--
 * @Author: fan
 * @Date: 2021-07-06 16:28:05
 * @LastEditors: fan
 * @LastEditTime: 2021-07-06 18:27:15
 * @Description: 员工弹层组件
-->

<template>
  <el-dialog
    :visible="showDialog"
    title="新增员工"
    @close="handleClose"
  >
    <el-form
      ref="empForm"
      :model="formData"
      :rules="rules"
      label-width="240px"
    >
      <el-form-item
        label="姓名"
        placeholder="请输入姓名"
        prop="username"
      >
        <el-input
          v-model="formData.username"
          style="width: 70%"
        />
      </el-form-item>
      <el-form-item
        label="手机号"
        placeholder="请输入手机号"
        prop="mobile"
      >
        <el-input
          v-model="formData.mobile"
          style="width: 70%;"
        />
      </el-form-item>
      <el-form-item
        label="入职时间"
        prop="timeOfEntry"
      >
        <el-date-picker
          v-model="formData.timeOfEntry"
          type="date"
          placeholder="请选择日期"
          style="width: 70%;"
        />
      </el-form-item>
      <el-form-item
        label="聘用形式"
        prop="formOfEmployment"
      >
        <el-select
          v-model="formData.formOfEmployment"
          placeholder="请选择"
          style="width: 70%;"
        >
          <el-option
            v-for="item in EmployeesEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="工号"
        prop="workNumber"
      >
        <el-input
          v-model="formData.workNumber"
          placeholder="请输入工号"
          style="width: 70%;"
        />
      </el-form-item>
      <el-form-item
        label="部门"
        prop="departmentName"
      >
        <el-input
          v-model="formData.departmentName"
          placeholder="请选择部门"
          style="width: 70%;"
          @focus="getDepartments"
        />
        <!-- 放置一个tree组件 -->
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeList"
          default-expand-all=""
          :props="{ label: 'name' }"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item
        label="转正时间"
        prop="correctionTime"
      >
        <el-date-picker
          v-model="formData.correctionTime"
          type="date"
          placeholder="选择日期"
          style="width: 70%;"
        />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-row
        type="flex"
        justify="center"
      >
        <el-col :span="6">
          <el-button @click="handleClose">取消</el-button>
          <el-button
            type="primary"
            @click="handleSubmit"
          >确认</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { addEmployees } from '@/api/employees'
import { tranListToTreeData } from '@/utils'
import EmployeesEnum from '@/api/constant/employees'
export default {
  name: 'AddEmployees',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeesEnum,
      treeList: [], // 树形数据
      loading: false, // 加载动画
      showTree: false, // 是否显示 el-tree
      formData: { // 表单数据
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: { // 校验规则
        username: [
          { trigger: 'blur', required: true, message: '姓名不能为空' },
          { trigger: 'blur', min: 4, max: 16, message: '姓名长度为4-16' }
        ],
        mobile: [
          { trigger: 'blur', required: true, message: '手机号不能为空' },
          { trigger: 'blur', pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeList = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) { // 点击部门时触发
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async handleSubmit() { // 处理确认
      try {
        await this.$refs.empForm.validate() // 提交时表单验证
        await addEmployees(this.formData) // 新增员工
        this.$parent.getEmployeesList() // 调用父级的 getEmployeesList 方法
        this.$parent.showDialog = false
      } catch (err) {
        console.log(err)
      }
    },
    handleClose() { // 处理取消
      this.$refs.empForm.resetFields()
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
