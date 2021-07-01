<!--
 * @Author: fan
 * @Date: 2021-07-01 22:02:34
 * @LastEditors: fan
 * @LastEditTime: 2021-07-01 23:37:18
 * @Description: 新增部门弹出层
-->
<template>
  <el-dialog
    title="新增部门"
    :visible="showDialog"
  >
    <!-- 表单 -->
    <el-form
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
        />
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
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
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
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
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
      }
    }
  },
  methods: {
    async checkNameRepeat(rule, value, callback) {
      const { depts } = await getDepartments()
      // depts 拿到的是整个 treeNode 的数据，this.treeNode 是当前点击的节点，筛选出当前点击的节点的子节点
      // console.log(depts.filter(item => item.pid === this.treeNode.id))
      // 在整个子节点中寻找是否有相同的名字，返回一个 boolean 值
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      // 如果找到了这个值，代表该部门已存在
      isRepeat ? callback(new Error(`${value}部门已存在`)) : callback()
    },
    async checkCodeRepeat(rule, value, callback) {
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value && value)
      isRepeat ? callback(new Error(`${value}编号已存在`)) : callback()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
