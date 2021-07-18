<!--
 * @Author: fan
 * @Date: 2021-07-18 13:13:53
 * @LastEditors: fan
 * @LastEditTime: 2021-07-18 14:13:29
 * @Description: 分配角色窗体
-->
<template>
  <el-dialog
    :visible="showAssignDialog"
    title="分配角色"
    @close="handleCancel"
  >
    <el-checkbox-group v-model="roleIds">
      <el-checkbox
        v-for="item in list"
        :key="item.id"
        :label="item.id"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
      <el-col :span="6">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: 'AssignRole',
  props: {
    showAssignDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [], // 当前所有角色的id
      roleIds: [] // 当前所拥有的角色id
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 }) // 角色一般不会有很多个，所以我们只取20个
      this.list = rows
    },
    async getUserDetailById(id) { // 通过用户获取角色id
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    async handleSubmit() { // 确认按钮
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      // 关闭弹层
      this.$emit('update:showAssignDialog', false)
      this.$message.success('分配角色成功')
    },
    handleCancel() { // 取消按钮
      this.roleIds = []
      this.$emit('update:showAssignDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
