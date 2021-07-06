<!--
 * @Author: fan
 * @Date: 2021-07-06 19:47:16
 * @LastEditors: fan
 * @LastEditTime: 2021-07-06 20:13:52
 * @Description: 导入组件
-->

<template>
  <upload-excel :on-success="success" />
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import { importEmployees } from '@/api/employees'
export default {
  name: 'Improt',
  components: {
    UploadExcel
  },
  data() {
    return {
      type: this.$route.query.type
    }
  },
  methods: {
    async success({ header, results }) { // 需要返回一个 excelData
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const newArr = results.map(item => {
        // 需要将每一个条数据里面的中文都换成英文
        const userInfo = {}
        Object.keys(item).forEach(key => {
          // key是当前的中文名 找到对应的英文名
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有这样, 才能入库
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })
      await importEmployees(newArr)
      this.$message.success('操作成功')
      this.$router.back() // 回到上一个页面
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
