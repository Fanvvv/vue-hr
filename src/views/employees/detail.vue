<!--
 * @Author: fan
 * @Date: 2021-07-14 16:49:53
 * @LastEditors: fan
 * @LastEditTime: 2021-07-15 22:43:37
 * @Description: 员工的详情页
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form
              ref="userForm"
              :rules="rules"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
              :model="userInfo"
            >
              <el-form-item
                label="用户名"
                style="width:400px"
                prop="username"
              >
                <el-input v-model="userInfo.username" />
              </el-form-item>
              <el-form-item
                label="新密码"
                style="width:400px"
                prop="password2"
              >
                <el-input
                  v-model="userInfo.password2"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="saveUser"
                >保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 打印按钮 -->
            <el-row
              type="flex"
              justify="end"
            >
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 动态组件写法，可以自由切换组件 -->
            <component :is="componentUserInfo" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <!-- 打印按钮 -->
            <el-row
              type="flex"
              justify="end"
            >
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="componentJobInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      componentUserInfo: 'user-info',
      componentJobInfo: 'JobInfo',
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [
          {
            required: true, trigger: 'blur', message: '用户名不能为空'
          }
        ],
        password: [
          {
            required: true, trigger: 'blur', message: '密码不能为空'
          },
          {
            min: 6, max: 9, message: '密码长度应为6-9位', trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUser() {
      try {
        await this.$refs.userForm.validate()
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('修改用户信息成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
