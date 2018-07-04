<template>
  <div id="personal-data" class="personal-data view-container wl-card"  v-loading= "loadingF">
    <section>
      <div class="personal-data-form">
          <div class="form-left" v-loading="loadingI">
              <img v-bind:src="dafaultAvatarUrl" id="avatar" ref="avatar">
              <div class="upload" @click="changeAvatar"><a ref=""><icon-svg icon-class="edit_blue" class="icon"></icon-svg></a></div>
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
              <!--
              <button @click="changeAvatar"><i class="el-icon-edit-outline avatar-icon "></i>修改</button>
              -->
          </div>
          <div class="form-right">
              <div class="form-item">
                  <span>邮箱:</span>
                  <p>{{mail}}</p>
              </div>
              <div class="form-item">
                  <span>昵称:</span>
                  <el-input v-model="name" clearable></el-input>
                  <span v-if="isErrName" style="font-size:6px;color:red;">{{errMsg}}</span>
              </div>
              <div class="form-item">
                  <span>性别:</span>
                  <div class="form-item-sex">
                      <el-radio-group v-model="sex">
                          <el-radio label="male">男</el-radio>
                          <el-radio label="female">女</el-radio>
                          <el-radio label="secrecy">保密</el-radio>
                      </el-radio-group>
                  </div>
              </div>
              <div class="form-item">
                  <span>生日:</span>
                <DatePicker ref="datepicker" class="datepicker"></DatePicker>
              </div>
          </div>
          <div class="btn">
          <el-button type="primary"  @click="setUserData" :loading="loadingB">保存</el-button>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { Notification } from 'element-ui'
import DatePicker from 'components/DatePicker'
import { getToken } from 'api/qiniu'
import { getUser, putUser } from 'api/user'
const QINIU_DOMAIN = '//7xlx4u.com1.z0.glb.clouddn.com/' // 图片服务器域名，展示时用
export default {
  name: 'personalData',
  data () {
    return {
      sex: '',
      mail: '',
      name: '',
      dafaultAvatarUrl: 'http://7xlx4u.com1.z0.glb.clouddn.com/o_1aqt96pink2kvkhj13111r15tr7.jpg?imageView2/1/w/97/h/97',
      UPLOAD_ADDRESS: location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me',
      uploadData: {},
      loadingF: true,
      loadingI: false,
      loadingB: false,
      errMsg: '',
      default: {}
    }
  },
  components: {
    DatePicker
  },
  computed: {
    isErrName: function () {
      function getLength (str) {
        let charLength = 0
        for (let i = 0; i < str.length; i++) {
          let sonChar = str.charAt(i)
          let china = /^[\u4e00-\u9fa5]*$/
          china.test(sonChar) ? charLength += 2 : charLength += 1
        }
        return charLength
      }
      let name = this.name
      let myregName = /^[0-9a-zA-Z\u4E00-\u9FA5_]*$/
      if (name === '') {
        return true
      } else if (!myregName.test(name)) {
        return true
      } else if (getLength(name) > 14 || getLength(name) < 1) {
        return true
      } else {
        return false
      }
    },
    birthday: {
      get: function () {
        const daynum = this.$refs.datepicker.day
        const monthnum = this.$refs.datepicker.month
        const yearnum = this.$refs.datepicker.year
        let day = daynum < 10 ? '0' + daynum : daynum
        let month = monthnum < 10 ? '0' + monthnum : monthnum
        return `${yearnum}-${month}-${day}`
      },
      set: function (val) {
        const time = new Date(val)
        this.$refs.datepicker.year = time.getFullYear()
        this.$refs.datepicker.month = time.getMonth() + 1
        this.$refs.datepicker.day = time.getDate()
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      if (this.$store.getters.profile.mail !== '') {
        this.mail = this.$store.getters.profile.mail
        this.sex = this.$store.getters.profile.sex
        this.name = this.$store.getters.profile.name
        this.dafaultAvatarUrl = this.$store.getters.profile.avatar_url
        this.birthday = this.$store.getters.profile.birthday
        this.default = this.$store.getters.profile
        this.loadingF = false
      } else {
        await getUser({id: this.$store.getters.user.uid}).then(res => {
          this.mail = res.mail
          this.sex = res.sex
          this.name = res.name
          if (res.avatar_url !== 'www.fake.jpg') {
            this.dafaultAvatarUrl = res.avatar_url
          }
          this.birthday = res.birthday
          this.default = res
          var profile = {
            mail: this.mail,
            sex: this.sex,
            name: this.name,
            dafaultAvatarUrl: this.dafaultAvatarUrl,
            birthday: this.birthday
          }
          this.$store.commit('SET_PROFILE', profile)
        }).catch(err => {
          Notification.error({
            message: err.data.error,
            offset: 60
          })
        })
        this.loadingF = false
        this.errMsg = '昵称格式错误'
      }
    },
    changeAvatar () {
      const self = this
      if (this.loadingI) {
        return
      }
      this.loadingI = true
      setTimeout(function () {
        self.loadingI = false
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
          token: res['upload-token']
        }
      })
    },
    upScuccess: function (e, file, fileList) {
      const url = QINIU_DOMAIN + e.key
      this.$refs.avatar.setAttribute('src', url)
      this.dafaultAvatarUrl = url
      this.loadingI = false
    },
    upError: function (e, file, fileList) {
      this.loadingI = false
    },
    async setUserData () {
      this.loadingB = true
      var changeUser = {}
      if (!this.isErrName && this.default.name !== this.name) {
        changeUser.name = this.name
        this.default.name = this.name
      }
      if (this.default.sex !== this.sex) {
        changeUser.sex = this.sex
        this.default.sex = this.sex
      }
      if (this.default.birthday !== this.birthday) {
        changeUser.birthday = this.birthday
        this.default.birthday = this.birthday
      }
      if (this.default.avatar_url !== this.$refs.avatar.getAttribute('src')) {
        changeUser.avatar_url = this.$refs.avatar.getAttribute('src')
        this.default.avatar_url = this.$refs.avatar.getAttribute('src')
      }
      console.log(this.default)
      console.log(changeUser)
      if (changeUser.name === undefined && changeUser.sex === undefined && changeUser.birthday === undefined && changeUser.avatar_url === undefined) {
        this.loadingB = false
        Notification.warning({
          message: '请改变个人资料中某一项后，再提交！',
          offset: 60
        })
        return
      }
      await putUser({id: this.$store.getters.user.uid, data: changeUser}).then(res => {
        Notification.success({
          message: '修改个人资料成功！',
          offset: 60
        })
        var profile = {
          mail: this.mail,
          sex: this.sex,
          name: this.name,
          dafaultAvatarUrl: this.dafaultAvatarUrl,
          birthday: this.birthday
        }
        this.$store.commit('SET_PROFILE', profile)
        if (changeUser.name) {
          const self = this
          const data = this.$store.getters.user
          data.uname = changeUser.name
          self.$store.commit('SET_USER', data)
        }
      }).catch(err => {
        Notification.error({
          message: err.data.error,
          offset: 60
        })
      })
      this.loadingB = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#personal-data{
    width: 465px;
    margin: 0 auto;
    border-radius: 4px;
    padding: 0px 111px 68px 45px;
    text-align: center;
    height:356px;
    section{
        .personal-data-form{
            display: flex;
            justify-content: space-between;
            .form-left{
              padding-top:40px;
              margin-right: 36px;
                .el-icon-edit-outline::before{
                  height:45px;
                  width:45px;
                }
                .upload{
                    display: block;
                    height: 98px;
                    width: 98px;
                    border-radius: 100%;
                    background-color:transparent;
                    position: absolute;
                    top:41px;
                    left:46px;
                    .icon{
                        margin:40% 40%;
                        color:transparent;
                    }
                }
                .upload:hover{
                    background-color:rgba(255,255,255,0.3);
                    .icon{
                        color:black;
                        width:25px;
                        height:25px;
                    }
                }
                img{
                    display: block;
                    height: 98px;
                    width: 98px;
                    border: #e3e3e3 1px solid;
                    border-radius: 100%;
                    background-color: rgb(165, 164, 164);
                    margin-bottom: 7px;
                }
                button{
                    border: 0;
                    font-size: 11px;
                    color: #5677fc;
                    background-color: transparent;
                    cursor: pointer;
                }
            }
            .form-right{
                border-left: solid 1px #c9c9c9;
                margin-top: 40px;
                padding-left: 27px;
                padding-top:-20px;
                height:165px;
                .form-item{
                    max-height:1.5em;
                    display: flex;
                    align-items: center;
                    color: #707070;
                    margin-bottom: 27px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    p{
                        padding-left:12px;
                    }
                    span{
                        margin-right:25px;
                        font-size: 14px;
                        font-weight: bold;
                        color: #707070;
                        min-width:34px;
                    }
                    .el-input {
                        width: 250px;
                        /deep/ input {
                        height: 32px;
                        padding-left: 12px;
                        font-size: 12px;
                        background-color: #f1f1f1;
                        border-radius: 3px;
                        &:focus {
                          background-color: white;
                          border-radius: 4px;
                          border: solid 1px rgba(0, 64, 185, 0.4);
                        }
                    }
                }
                .form-item-sex{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        width: 253px;
                        margin-left:12px;
                        .label-active{
                            background-color: rgba(248, 249, 250, 0.4);
                          box-shadow: 0px 3px 7px 0px
                        rgba(86, 119, 252, 0.16);
                          border: solid 2px rgba(0, 64, 185, 0.4);
                        }
                    }
            }
        }
        .btn{
            position: absolute;
            top:255px;
            left:210px;
            width: 94px;
            height:32px;
            button{
            padding: 0;
            width: 94px;
            height:32px;
            border-radius: 4px;
            font-size: 15px;
            color: #ffffff;
            }
        }
    }
  }
}
</style>
