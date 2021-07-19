<!--
 * @Author: fan
 * @Date: 2021-07-19 15:50:50
 * @LastEditors: fan
 * @LastEditTime: 2021-07-19 15:58:03
 * @Description: echarts 雷达图组件
-->
<template>
  <!-- 雷达图  图表必须给高和宽度-->
  <div
    ref="myDiv"
    class="radar-echart"
  />
</template>

<script>
// 完成加载
// var echarts = require('echarts')
// 按需加载
var echarts = require('echarts/lib/echarts') // 引入echarts主模块
require('echarts/lib/chart/radar') // 引入雷达图
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  // 页面渲染完毕事件
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
    myChart.setOption({
      title: {
        text: '绩效指数雷达图'
      },
      tooltip: {},
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        // 每个区域的最高值
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [{
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [10, 18, 90, 52, 80, 20],
            name: 'egret'
          },
          {
            value: [50, 30, 50, 70, 50, 80],
            name: 'fan'
          }
        ]
      }]
    })
  }
}
</script>

<style lang="scss" scoped>
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>
