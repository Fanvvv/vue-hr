<!--
 * @Author: fan
 * @Date: 2021-07-14 22:27:03
 * @LastEditors: fan
 * @LastEditTime: 2021-07-15 19:57:15
 * @Description: 个人详情组件
-->
<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form label-width="220px">
      <!-- 工号 入职时间 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input
              v-model="userInfo.workNumber"
              placeholder="请输入工号"
              class="inputW"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入职时间">
            <el-date-picker
              v-model="userInfo.timeOfEntry"
              placeholder="请选择时间"
              type="date"
              class="inputW"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 姓名 部门 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input
              v-model="userInfo.username"
              placeholder="请输入姓名"
              class="inputW"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门">
            <el-input
              v-model="userInfo.departmentName"
              placeholder="请输入部门"
              class="inputW"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!--手机 聘用形式  -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="手机号">
            <el-input
              v-model="userInfo.mobile"
              placeholder="请输入手机号"
              class="inputW"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="聘用形式">
            <el-select
              v-model="userInfo.formOfEmployment"
              placeholder="请选择"
              class="inputW"
            >
              <el-option
                v-for="item in EmployeeEnum.hireType"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 员工照片 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="员工头像">
            <!-- 放置上传图片 -->
            <upload-image ref="userPhoto" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存个人信息 -->
      <el-row
        class="inline-info"
        type="flex"
        justify="center"
      >
        <el-col :span="12">
          <el-button
            type="primary"
            @click="saveUser"
          >保存更新</el-button>
          <el-button @click="$router.back()">返回</el-button>

        </el-col>
      </el-row>
    </el-form>
    <!-- 基础信息 -->
    <el-form label-width="220px">
      <div class="block">
        <div class="title">基础信息</div>
        <el-form-item label="最高学历">
          <el-select
            v-model="formData.theHighestDegreeOfEducation"
            placeholder="请选择"
            class="inputW2"
          >
            <el-option
              v-for="item in EmployeeEnum.highestDegree"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 个人头像 -->
        <!-- 员工照片 -->
        <el-form-item label="员工照片">
          <!-- 放置上传图片 -->
          <upload-image ref="userPic" />
        </el-form-item>
        <el-form-item label="国家/地区">
          <el-select
            v-model="formData.nationalArea"
            placeholder="请选择"
            class="inputW2"
          >
            <el-option
              v-for="item in EmployeeEnum.isOverseas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="护照号">
          <el-input
            v-model="formData.passportNo"
            placeholder="正规护照格式"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="formData.idNumber"
            placeholder="正规身份证格式"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input
            v-model="formData.nativePlace"
            placeholder="籍贯地址"
            class="inputW5"
          />
        </el-form-item>
        <el-form-item label="民族">
          <el-input
            v-model="formData.nation"
            placeholder="请输入民族"
            class="inputW2"
          />
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select
            v-model="formData.maritalStatus"
            placeholder="请选择"
            class="inputW2"
          >
            <el-option
              v-for="item in EmployeeEnum.maritaStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-input
            v-model="formData.birthday"
            placeholder="示例 0323"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input
            v-model="formData.age"
            placeholder="请输入年龄"
            type="number"
            class="inputW2"
          />
        </el-form-item>
        <el-form-item label="星座">
          <el-select
            v-model="formData.constellation"
            placeholder="请选择"
            class="inputW2"
          >
            <el-option
              v-for="item in EmployeeEnum.constellation"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="血型">
          <el-select
            v-model="formData.bloodType"
            placeholder="请选择"
            class="inputW2"
          >
            <el-option
              v-for="item in EmployeeEnum.bloodType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="户籍所在地">
          <el-input
            v-model="formData.domicile"
            placeholder="请输入户籍所在地"
            class="inputW5"
          />
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input
            v-model="formData.politicalOutlook"
            placeholder="请输入政治面貌"
            class="inputW2"
          />
        </el-form-item>
        <el-form-item label="入党时间">
          <el-date-picker
            v-model="formData.timeToJoinTheParty"
            type="date"
            placeholder="选择日期"
            class="inputW"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="存档机构">
          <el-input
            v-model="formData.archivingOrganization"
            placeholder="请输入"
            class="inputW5"
          />
        </el-form-item>
        <el-form-item label="子女状态">
          <el-input
            v-model="formData.stateOfChildren"
            placeholder="请输入"
            class="inputW5"
          />
        </el-form-item>
        <el-form-item label="子女有无商业险">
          <el-radio-group v-model="formData.doChildrenHaveCommercialInsurance">
            <el-radio label="1">有</el-radio>
            <el-radio label="2">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有无违法违纪状态">
          <el-input
            v-model="formData.isThereAnyViolationOfLawOrDiscipline"
            placeholder="请输入"
            class="inputW5"
          />
        </el-form-item>
        <el-form-item label="有无重大病史">
          <el-input
            v-model="formData.areThereAnyMajorMedicalHistories"
            placeholder="请输入"
            class="inputW5"
          />
        </el-form-item>
      </div>
      <!-- 通讯信息 -->
      <div class="block">
        <div class="title">通讯信息</div>
        <el-form-item label="QQ">
          <el-input
            v-model="formData.qq"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="微信">
          <el-input
            v-model="formData.wechat"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="现居住地">
          <el-input
            v-model="formData.placeOfResidence"
            placeholder="请输入"
            class="inputW5"
          />
        </el-form-item>
        <el-form-item label="通讯地址">
          <el-input
            v-model="formData.postalAddress"
            placeholder="请输入"
            class="inputW5"
          />
        </el-form-item>
        <el-form-item label="联系手机">
          <el-input
            v-model="formData.contactTheMobilePhone"
            placeholder="11位字符"
            maxlength="11"
            class="inputW"
            @change.native="handlePhone(2)"
          />
        </el-form-item>
        <el-form-item label="个人邮箱">
          <el-input
            v-model="formData.personalMailbox"
            placeholder="请输入"
            type="mail"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input
            v-model="formData.emergencyContact"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="紧急联系电话">
          <el-input
            v-model="formData.emergencyContactNumber"
            placeholder="11位字符"
            class="inputW"
          />
        </el-form-item>
      </div>
      <!-- 账号信息 -->
      <div class="block">
        <div class="title">账号信息</div>
        <el-form-item label="社保电脑号">
          <el-input
            v-model="formData.socialSecurityComputerNumber"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="公积金账号">
          <el-input
            v-model="formData.providentFundAccount"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input
            v-model="formData.bankCardNumber"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="开户行">
          <el-input
            v-model="formData.openingBank"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
      </div>
      <!-- 教育信息 -->
      <div class="block">
        <div class="title">教育信息</div>
        <el-form-item label="学历类型">
          <el-select
            v-model="formData.educationalType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in EmployeeEnum.educationType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="毕业学校">
          <el-input
            v-model="formData.graduateSchool"
            placeholder="请输入"
            class="inputW2"
          />
        </el-form-item>
        <el-form-item label="入学时间">
          <el-date-picker
            v-model="formData.enrolmentTime"
            type="data"
            placeholder="请输入时间"
            class="inputW"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="毕业时间">
          <el-date-picker
            v-model="formData.graduationTime"
            type="data"
            placeholder="请输入时间"
            class="inputW"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="专业">
          <el-input
            v-model="formData.major"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
      </div>
      <!-- 从业信息 -->
      <div class="block">
        <div class="title">从业信息</div>
        <el-form-item label="上家公司">
          <el-input
            v-model="formData.homeCompany"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="职称">
          <el-input
            v-model="formData.title"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="有无竞业限制">
          <el-input
            v-model="formData.isThereAnyCompetitionRestriction"
            placeholder="请输入"
            style="width:80%"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="formData.remarks"
            type="textarea"
            placeholder="请输入备注"
            style="width:80%"
          />
        </el-form-item>
        <!-- 保存员工信息 -->
        <el-row
          class="inline-info"
          type="flex"
          justify="center"
        >
          <el-col :span="12">
            <el-button
              type="primary"
              @click="savePersonal"
            >保存更新</el-button>
            <el-button @click="$router.back()">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import UploadImage from '@/components/UploadImage'
import EmployeeEnum from '@/api/constant/employees'
import { getUserDetailById } from '@/api/user'
import { getPersonalDetail, saveUserDetailById, updatePersonal } from '@/api/employees'
export default {
  components: {
    UploadImage
  },
  data() {
    return {
      userId: this.$route.params.id,
      EmployeeEnum, // 员工枚举数据
      userInfo: {},
      formData: {
        userId: '',
        username: '', // 用户名
        sex: '', // 性别
        mobile: '', // 手机
        companyId: '', // 公司id
        departmentName: '', // 部门名称
        //  onTheJobStatus: '', // 在职状态 no
        dateOfBirth: '', // 出生日期
        timeOfEntry: '', // 入职时间
        theHighestDegreeOfEducation: '', // 最高学历
        nationalArea: '', // 国家
        passportNo: '', // 护照号
        idNumber: '', // 身份证号
        idCardPhotoPositive: '', // 身份证照正
        idCardPhotoBack: '', // 身份证照正
        nativePlace: '', // 籍贯
        nation: '', // 民族
        englishName: '', // 英文名字
        maritalStatus: '', // 婚姻状况
        staffPhoto: '', // 员工照片
        birthday: '', // 生日
        zodiac: '', // 属相
        age: '', // 年龄
        constellation: '', // 星座
        bloodType: '', // 血型
        domicile: '', // 户籍所在地
        politicalOutlook: '', // 政治面貌
        timeToJoinTheParty: '', // 入党时间
        archivingOrganization: '', // 存档机构
        stateOfChildren: '', // 子女状态
        doChildrenHaveCommercialInsurance: '1', // 保险状态
        isThereAnyViolationOfLawOrDiscipline: '', // 违法违纪状态
        areThereAnyMajorMedicalHistories: '', // 重大病史
        qq: '', // QQ
        wechat: '', // 微信
        residenceCardCity: '', // 居住证城市
        dateOfResidencePermit: '', // 居住证办理日期
        residencePermitDeadline: '', // 居住证截止日期
        placeOfResidence: '', // 现居住地
        postalAddress: '', // 通讯地址
        contactTheMobilePhone: '', // 联系手机
        personalMailbox: '', // 个人邮箱
        emergencyContact: '', // 紧急联系人
        emergencyContactNumber: '', // 紧急联系电话
        socialSecurityComputerNumber: '', // 社保电脑号
        providentFundAccount: '', // 公积金账号
        bankCardNumber: '', // 银行卡号
        openingBank: '', // 开户行
        educationalType: '', // 学历类型
        graduateSchool: '', // 毕业学校
        enrolmentTime: '', // 入学时间
        graduationTime: '', // 毕业时间
        major: '', // 专业
        graduationCertificate: '', // 毕业证书
        certificateOfAcademicDegree: '', // 学位证书
        homeCompany: '', // 上家公司
        title: '', // 职称
        resume: '', // 简历
        isThereAnyCompetitionRestriction: '', // 有无竞业限制
        proofOfDepartureOfFormerCompany: '', // 前公司离职证明
        remarks: '' // 备注
      }
    }
  },
  created() {
    this.getUserDetailById()
    this.getPersonalDetail()
  },
  methods: {
    async getUserDetailById() { // 获取用户基本信息，进行回显
      this.userInfo = await getUserDetailById(this.userId)
      // 处理用户头像回显
      if (this.userInfo.staffPhoto) {
        // 需要给赋值的地址一个标记 upload: true
        this.$refs.userPhoto.fileList = [{ url: this.userInfo.staffPhoto, upload: true }]
      }
    },
    async getPersonalDetail() { // 获取用户基础信息，进行回显
      this.formData = await getPersonalDetail(this.userId)
      // 处理用户照片回显
      if (this.formData.staffPhoto) {
        this.$refs.userPic.fileList = [{ url: this.formData.staffPhoto, upload: true }]
      }
    },
    async saveUser() { // 保存用户基本信息
      // 读取上传的头像
      const fileList = this.$refs.userPhoto.fileList
      // 没有找到 upload，说明图片还没上传完成
      if (fileList.some(item => !item.upload)) {
        this.$message.warning('您当前头像还没有上传完成')
        return
      }
      // 将数据合并 发给服务端
      await saveUserDetailById({ ...this.userInfo, staffPhoto: fileList && fileList.length ? fileList[0].url : '' })
      this.$message.success('保存用户基本信息成功')
    },
    async savePersonal() { // 保存用户基础信息
      // 读取上传的照片
      const fileList = this.$refs.userPic.fileList
      if (fileList.some(item => !item.upload)) {
        this.$message.warning('您当前照片还没有上传完成')
        return
      }
      await updatePersonal({ ...this.formData, staffPhoto: fileList && fileList.length ? fileList[0].url : '' })
      this.$message.success('保存用户基础信息成功')
    }
  }
}
</script>
