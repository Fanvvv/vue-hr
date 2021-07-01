<!--
 * @Author: fan
 * @Date: 2021-07-01 22:02:34
 * @LastEditors: fan
 * @LastEditTime: 2021-07-01 22:19:10
 * @Description: 新增部门弹出层
-->
<template>
  <el-dialog
    title="新增部门"
    :visible="showDialog"
  >
    <!-- 表单 -->
    <el-form label-width="160px">
      <el-form-item label="部门名称">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编号">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          style="width: 80%"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input
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
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
