<!--
 * @Author: fan
 * @Date: 2021-07-15 13:50:55
 * @LastEditors: fan
 * @LastEditTime: 2021-07-15 20:11:18
 * @Description: 上传图片组件
-->
<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :file-list="fileList"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-dialog
      :visible.sync="showDialog"
      title="图片预览"
    >
      <img
        :src="imgUrl"
        style="width: 100%"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID1oNfiU0GFxPaV9WcR0II1Vh15tQgeLmw',
  SecretKey: 'uXu1qOffOr3ycz4tRhgPr2wZv0pNeeMn'
})
export default {
  name: 'UploadImage',
  data() {
    return {
      showDialog: false,
      showPercent: false, // 进度条
      percent: 0, // 进度条进度
      imgUrl: '',
      fileList: [],
      currentFileUid: null // 用来记录当前图片的uid
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    handlePreview(file) { // 处理图片浏览
      // console.log(file)
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) { // 处理图片移除
      // 两种方法都可以
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      // this.fileList = fileList
    },
    handleChange(file, fileList) { // 处理图片改变，会触发两次
      // console.log(fileList)
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) { // 图片上传前的处理
      const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
      // console.log(file)
      if (!types.some(item => item === file.type)) { // 判断图片类型是否正确
        this.$message.error('图片格式仅支持jpg、jpeg、png、gif！')
        return false
      }
      if (file.size > 5 * 1024 * 1024) { // 判断文件大小是否大于 5M
        this.$message.error('图片大小不能超过5M')
        return false
      }
      // 已经确定当前上传的就是当前的这个file了
      this.currentFileUid = file.uid
      // 显示进度条
      this.showPercent = true
      return true
    },
    upload(params) {
      // console.log(params)
      if (params.file) {
        cos.putObject({
          Bucket: 'hr-1258935921', // 存储桶名称
          Region: 'ap-guangzhou', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的对象
          StorageClass: 'STANDARD', // 上传的模式，默认的标准模式即可
          onProgress: (params) => { // 上传进度监听
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // 上传成功的回调
          // console.log(err || data)
          // 没有错误且状态码为200，表示上传成功
          if (!err && data.statusCode === 200) {
            // 这里出现 bug 需要将上传成功的fileList传回给fileList，才会显示腾讯云的地址
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return {
                  url: 'http://' + data.Location,
                  upload: true // 用该属性标记是否上传成功，后面可以通过这个属性来判断是否上传成功
                }
              }
              return item
            })
            setTimeout(() => { // 以防文件太小不显示进度条，设置一个定时器
              this.showPercent = false // 关闭进度条
              this.percent = 0 // 进度条归0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* 如果fileList已经有内容了，就不需要显示上传按钮了 */
.disabled {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
