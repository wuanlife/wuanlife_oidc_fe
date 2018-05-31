<template>
  <div id="personal-data" class="personal-data view-container wl-card">
    <section>
      <div class="personal-data-form" v-loading="loading1">
          <div class="form-left" v-loading="loading">
              <img v-bind:src="dafaultAvatarUrl" id="avatar" ref="avatar">
              <el-upload
                :action="UPLOAD_ADDRESS"
                :before-upload='beforeUpload'
                :data="uploadData"
                :on-success='upScuccess'
                :on-error="upError"
                ref="upload"
                style="display:none">
                <el-button id="img-input"
                  size="small"
                  type="primary">点击上传
                </el-button>
              </el-upload>
              <button @click="changeAvatar"><i class="el-icon-edit-outline avatar-icon "></i>修改</button>
          </div>
          <div class="form-right">
              <div class="form-item">
                  <span>邮箱:</span>
                  <p>123@qq.com</p>
              </div>
              <div class="form-item">
                  <span>昵称:</span>
                  <input type="text" v-model="name">
              </div>
              <div class="form-item">
                  <span>性别:</span>
                  <div class="form-item-sex">
                      <el-radio  v-model="sex" label="male">男</el-radio>
                      <el-radio  v-model="sex" label="female">女</el-radio>
                      <el-radio  v-model="sex" label="secrecy">保密</el-radio>
                  </div>
              </div>
              <div class="form-item">
                  <span>生日:</span>
                <DatePicker ref="datepicker"></DatePicker>
              </div>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { Notification } from 'element-ui'

// const QINIU_DOMAIN = '//7xlx4u.com1.z0.glb.clouddn.com/' // 图片服务器域名，展示时用
import DatePicker from 'components/DatePicker'
import { getToken } from 'api/qiniu'
const QINIU_DOMAIN = '//7xlx4u.com1.z0.glb.clouddn.com/' // 图片服务器域名，展示时用
export default {
  name: 'personalData',
  data () {
    return {
      sex: 'female',
      mail: '',
      name: '',
      dafaultAvatarUrl: 'http://7xlx4u.com1.z0.glb.clouddn.com/o_1aqt96pink2kvkhj13111r15tr7.jpg?imageView2/1/w/97/h/97',
      UPLOAD_ADDRESS: location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me',
      uploadData: {},
      loading: false,
      loading1: false,
      loading2: false,
      default: {}
    }
  },
  components: {
    DatePicker
  },
  computed: {
    year () {
      return this.$refs.datepicker.year
    },
    month () {
      return this.$refs.datepicker.month
    },
    day () {
      return this.$refs.datepicker.day
    }
  },
  methods: {
    changeAvatar () {
      const self = this
      if (this.loading) {
        return
      }
      this.loading = true
      setTimeout(function () {
        self.loading = false
      }, 10000)
      document.getElementById('img-input').click()
    },
    beforeUpload: function (file) {
      return this.qnUpload(file)
    },
    qnUpload: function (file) {
      const suffix = file.name.split('.')
      const ext = suffix.splice(suffix.length - 1, 1)[0]
      // TODO: 图片格式/大小限制
      return getToken().then(res => {
        this.uploadData = {
          key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
          token: res.uploadToken
        }
      })
    },
    upScuccess: function (e, file, fileList) {
      const url = QINIU_DOMAIN + e.key
      this.$refs.avatar.setAttribute('src', url)
      this.loading = false
    },
    upError: function (e, file, fileList) {
      this.loading = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#personal-data{
    width: 465px;
    margin: 0 auto;
    border-radius: 4px;
    padding: 0px 111px 68px 121px;
    text-align: center;
    section{
        .personal-data-form{
            display: flex;
            justify-content: space-between;
            .form-left{
              padding-top:45px;
              margin-right: 30px;
                .el-icon-edit-outline::before{
                  height:45px;
                  width:45px;
                }
                img{
                    display: block;
                    height: 100px;
                    width: 100px;
                    border-radius: 100%;
                    background-color: rgb(165, 164, 164);
                    box-shadow: 0px 4px 5px 0px rgba(181, 181, 181, 0.75);
                    margin-bottom: 7px;
                }
                button{
                    border: 0;
                    font-size: 11px;
                    color: #5677fc;
                    background-color: transparent;
                    cursor: pointer;
                    .avatar-icon{
                        margin-right: 6 px;
                    }
                }
            }
            .form-right{
                border-left: solid 1px #c9c9c9;
                margin-top: 45px;
                padding-left: 26px;
                .form-item{
                    min-height: 35px;
                    display: flex;
                    align-items: center;
                    color: #707070;
                    margin-bottom: 20px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    span{
                        padding-right:18px;
                        font-size: 14px;
                        font-weight: bold;
                        color: #707070;
                    }
                    &>input{
                        height: 28px;
                        width: 250px;
                        background-color: #f1f1f1;
                        border-radius: 3px;
                        padding-left:4px;
                    }
                    &>input:focus{
                        background-color: rgba(248, 249, 250, 0.4);
                        border-radius: 4px;
                         border: solid 1px rgba(0, 64, 185, 0.4);
                    }
                    .form-item-sex{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        width: 253px;
                        .label-active{
                            background-color: rgba(248, 249, 250, 0.4);
                          box-shadow: 0px 3px 7px 0px
                        rgba(86, 119, 252, 0.16);
                          border: solid 2px rgba(0, 64, 185, 0.4);
                        }
                    }
                    .form-item-date{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .date-picker{
                            margin-left: 8px;
                            z-index: 0;
                            &:first-child{
                                margin-left: 0;
                            }
                        }
                    }
                }
            }
        }
        .save{
            width: 150px;
            margin-top: 66px;
        }
    }
}
</style>
