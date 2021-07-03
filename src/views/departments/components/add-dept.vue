<!--
 * @Author: fan
 * @Date: 2021-07-01 22:02:34
 * @LastEditors: fan
 * @LastEditTime: 2021-07-03 17:23:01
 * @Description: 新增部门弹出层
-->
<template>
  <el-dialog
    :title="showTitle"
    :visible="showDialog"
    @close="closeDialog"
  >
    <!-- 表单 -->
    <el-form
      ref="deptForm"
      :model="formData"
      :rules="rules"
      label-width="160px"
    >
      <el-form-item
        label="部门名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-15个字符"
        />
      </el-form-item>
      <el-form-item
        label="部门编号"
        prop="code"
      >
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-15个字符"
        />
      </el-form-item>
      <el-form-item
        label="部门负责人"
        prop="manager"
      >
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeesSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :value="item.username"
            :label="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="部门介绍"
        prop="introduce"
      >
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="4"
        />
      </el-form-item>
    </el-form>
    <!-- 确认和取消 -->
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
      <el-col :span="6">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartment, getDepartDetail, updateDepartment } from '@/api/departments'
import { getEmployeesSimple } from '@/api/employees'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formData: { // 表单数据
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: { // 校验规则
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '长度应为1-15个字符', trigger: 'blur' },
          { trigger: 'blur', validator: this.checkNameRepeat }
        ],
        code: [
          { required: true, message: '部门编号不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '长度应为1-15个字符', trigger: 'blur' },
          { trigger: 'blur', validator: this.checkCodeRepeat }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '长度应为1-300个字符', trigger: 'blur' }
        ]
      },
      peoples: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async checkNameRepeat(rule, value, callback) {
      const { depts } = await getDepartments()
      // depts 拿到的是整个 treeNode 的数据，this.treeNode 是当前点击的节点，筛选出当前点击的节点的子节点
      // console.log(depts.filter(item => item.pid === this.treeNode.id))
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式
        // 编辑模式下，校验的时候需要排除自身的数据
        // 首先找到同级的部门，this.formData.id 就是当前的 id
        isRepeat = depts.filter(item => item.pid === this.formData.pid && item.id !== this.formData.id).some(item => item.name === value)
      } else {
        // 新增模式
        // 在整个子节点中寻找是否有相同的名字，返回一个 boolean 值
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 如果找到了这个值，代表该部门已存在
      isRepeat ? callback(new Error(`${value}部门已存在`)) : callback()
    },
    async checkCodeRepeat(rule, value, callback) {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式
        isRepeat = depts.filter(item => item.id !== this.formData.id).some(item => item.code === value && value)
      } else {
        // 新增模式
        isRepeat = depts.some(item => item.code === value && value)
      }
      isRepeat ? callback(new Error(`${value}编号已存在`)) : callback()
    },
    async getEmployeesSimple() {
      const result = await getEmployeesSimple()
      // console.log(result)
      this.peoples = result
    },
    async getDepartDetail(id) {
      const result = await getDepartDetail(id)
      // console.log(result)
      this.formData = result
    },
    handleSubmit() {
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          // 表示可以提交了
          // 通过 formData 中是否有 id，区分是新增还是编辑模式
          if (this.formData.id) {
            // 编辑模式
            await updateDepartment(this.formData)
          } else {
            // 新增模式
            // 调用增加部门的接口，需要传入一个 pid ，表示层级关系
            await addDepartment({ ...this.formData, pid: this.treeNode.id })
          }
          // 添加数据到页面并展示
          this.$emit('addDept')
          // 关闭 dialog，使用update，需要在父组件的中使用 sync 修饰符，将值直接传给showDialog
          this.$emit('update:showDialog', false)
        }
      })
    },
    closeDialog() {
      // 清空表单记录和校验规则，可以使用elment中表单的resetFields方法
      this.$refs.deptForm.resetFields()
      // 关闭 dialog
      this.$emit('update:showDialog', false)
      // 因为 resetFields 方法只能表单上的数据，编辑中不需要使用 id，所以我们要重置以下 formData
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
