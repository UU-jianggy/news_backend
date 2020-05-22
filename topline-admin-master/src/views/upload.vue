<!--  -->
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          新增类型：
          <el-radio v-model="radio" label="1">新闻</el-radio>
          <el-radio v-model="radio" label="2">活动</el-radio>
          <el-radio v-model="radio" label="3">公告</el-radio>
        </div>
      </el-col>
    </el-row>
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item label="时间" prop="time">
        <el-col :span="11">
          <el-date-picker id="time" type="date" placeholder="选择日期" v-model="time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item
        label="标题"
      >
        <el-input v-model="dynamicValidateForm.title"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'条目' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        style="background-color:#ffffff;padding:20px;border:2px solid #545c64;border-radius:10px;"
      >
      <!-- 条目输入框 -->
        <el-input
          v-model="domain.value"
          type="textarea"
          autosize>
        </el-input>
        <!-- 图片上传 -->
        <el-upload
          action="http://localhost:5000/uploadImg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-progress="sendIng"
          :on-error="sendErr"
          :on-success="sendSuccess"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button @click.prevent="removeDomain(domain)">删除词条</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="addDomain">新增条目</el-button>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postData } from '@/api/api'

export default {
  data () {
    return {
      dialogImageUrl: '', // 接口返回的图片地址
      returnImgUrl: [], // 用来存放图片地址
      thisIndex: '', // 记录当前条目的index
      sendText: [], // 存储发送数据的新闻正文
      type: '', // 数据类型
      returnSuccess: '',
      time: '',
      dialogVisible: false,
      dynamicValidateForm: {
        title: '',
        domains: [{
          value: ''
        }]
      },
      radio: '1',
      value: ''
    }
  },
  methods: {
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: ''
      })
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      this.thisIndex = index
      if (index !== -1) {
        this.returnImgUrl.splice(this.thisIndex, 1)
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    handleRemove (file, fileList) {
      this.returnImgUrl.splice(this.thisIndex, 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      console.log(file.url)
      this.dialogVisible = true
    },
    sendIng (event, file) {
      console.log(event)
      console.log(file)
    },
    sendErr (err) {
      console.log(err)
    },
    // 图片路径
    beforeUpload (file) {
      console.log(file)
      console.log(this.dialogImageUrl)
    },
    sendSuccess (response, file, fileList) {
      console.log(response.path)
      this.returnImgUrl.push(response.path)
      console.log(12121)
      console.log(fileList)
    },
    // 表单提交
    async submitForm () {
      console.log(this.time)
      console.log(this.radio)
      if (this.radio === '1') {
        this.type = '新闻'
      } else if (this.radio === '2') {
        this.type = '活动'
      } else if (this.radio === '3') {
        this.type = '公告'
      }
      console.log(this.dynamicValidateForm.title)
      console.log(this.dynamicValidateForm.domains)
      console.log(this.returnImgUrl)
      for (var index in this.dynamicValidateForm.domains) {
        this.sendText.push(this.dynamicValidateForm.domains[index].value)
      }
      console.log(this.sendText)
      var formData = JSON.stringify([this.radio, this.type, this.dynamicValidateForm.title, String(this.sendText), this.time, String(this.returnImgUrl)])
      // 发送数据
      this.$confirm('确认信息无误后，是否提交？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await postData(formData)
        console.log(data)
        this.returnSuccess = '提交失败'
        if (Number(data) === 1) {
          this.returnSuccess = '提交成功'
        }
        this.$message({
          type: 'success',
          message: this.returnSuccess
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
