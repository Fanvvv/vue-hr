<!--
 * @Author: fan
 * @Date: 2021-07-19 15:06:38
 * @LastEditors: fan
 * @LastEditTime: 2021-07-19 15:48:27
 * @Description: 工作日历组件
-->
<template>
  <div>
    <el-row
      type="flex"
      justify="end"
    >
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px"
        @change="dateChange"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        >{{ item }}</el-option>
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px;margin-left:10px"
        @change="dateChange"
      >
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        >{{ item }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template
        v-slot:dateCell="{ date, data }"
        class="content"
      >
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span
            v-if="isWeek(date)"
            class="rest"
          >休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      // 去掉年月，保留日，并且去除个位数上的0
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  data() {
    return {
      currentMonth: null, // 当前月份
      currentYear: null, // 当前年份
      currentDate: null,
      yearList: []
    }
  },
  created() {
    this.currentYear = new Date().getFullYear() // 获取当前年份
    this.currentMonth = new Date().getMonth() + 1 // 获取当前月份
    this.yearList = Array.from(Array(11), (value, index) => this.currentYear + index - 5) // 获取当前年份的前五年和后五年组成数组
    this.dateChange()
  },
  methods: {
    dateChange() {
      // 年-月-日
      const day = new Date().getDate()
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-${day}`)
    },
    isWeek(date) {
      // 判断是否是周末
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-day {
  height: auto;
}
::v-deep .el-calendar-table__row td,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
::v-deep .el-calendar-table td.is-today .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
::v-deep .el-calendar__header {
  display: none;
}
</style>
