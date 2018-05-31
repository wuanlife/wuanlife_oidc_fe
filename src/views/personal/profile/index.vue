<template>
  <div id="personal-data" class="personal-data view-container wl-card">
    <section>
      <div class="personal-data-form" v-loading="loading1">
          <div class="form-left" v-loading="loading">
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
                 type="primary">点击上传</el-button>
                </el-upload>
          </div>
          <div class="form-right">
              <div class="form-item">
                  <span>邮箱:</span>
                  <p>123@qq.com</p>
              </div>
              <div class="form-item">
                  <span>昵称:</span>
                  <el-input v-model="name" clearable></el-input>
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
                <DatePicker ref="datepicker" class="datepicker"></DatePicker>
              </div>
          </div>
          <div class="btn">
          <el-button type="primary" :loading="loading2">保存</el-button>
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
export default {
  name: 'personalData',
  data () {
    return {
      sex: 'secrecy',
      mail: '',
      name: '123',
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
    changeAvatar: function () {
      const self = this
      if (this.loading) {
        return
      }
      this.loading = true
      setTimeout(function () {
        self.loading = false
      }, 1000)
      document.getElementById('img-input').click()
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
                        color:gray;
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
            button{
            padding: 0;
            width: 94px;
            height:32px;
            background-color: #5677fc;
            border-radius: 4px;
            font-size: 15px;
            color: #ffffff;
            }
        }
    }
  }
}
</style>
