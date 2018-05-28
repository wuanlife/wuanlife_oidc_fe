<template>
  <div id="personal-data" class="personal-data view-container wl-card">
    <section>
      <h1>个人资料</h1>
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
                 type="primary">点击上传</el-button>
                </el-upload>
              <button @click="changeAvatar"><icon-svg icon-class="modify" class="avatar-icon"></icon-svg>修改</button>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { Notification } from 'element-ui'

// const QINIU_DOMAIN = '//7xlx4u.com1.z0.glb.clouddn.com/' // 图片服务器域名，展示时用

export default {
  name: 'personalData',
  data () {
    return {
      yearNumber: 1970,
      mouthNumber: 1,
      dayNumber: 1,
      dayMax: 31,
      leap: false,
      sex: '',
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
  computed: {
  }
}
</script>

<style lang="scss" scoped>
#personal-data{
    width: 720px;
    margin-top: 119px;
    margin-bottom: 36px;
    background-color: blue;
    border-radius: 4px;
    padding: 42px 111px 68px 121px;
    text-align: center;
    section{
        h1{
            font-size: 20px;
            color: #5677fc;
            margin-bottom: 42px;
        }
        .personal-data-form{
            display: flex;
            justify-content: space-between;
            .form-left{
              background-color: #434343;
                img{
                    display: block;
                    height: 97px;
                    width: 97px;
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
                border-left: solid 2px #c9c9c9;
                padding-left: 26px;
                .form-item{
                    display: flex;
                    min-height: 45px;
                    align-items: center;
                    font-size: 17px;
                    color: #434343;
                    margin-bottom: 37px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    span{
                        margin-right: 32px;
                        font-size: 15px;
                        color: #434343;
                    }
                    &>input{
                        height: 45px;
                        width: 253px;
                        color: #434343;
                        box-shadow: 0px 3px 7px 0px
                    rgba(99, 99, 99, 0.16);
                      border-radius: 4px;
                      border: solid 2px rgba(171, 171, 171, 0.45);
                        padding: 0 16px;
                    }
                    &>input:focus{
                        background-color: rgba(248, 249, 250, 0.4);
                      box-shadow: 0px 3px 7px 0px
                    rgba(86, 119, 252, 0.16);
                      border-radius: 4px;
                      border: solid 2px rgba(0, 64, 185, 0.4);
                    }
                    .form-item-sex{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        width: 253px;
                        input{
                            width: 0;
                            height: 0;
                        }
                        label{
                            width: 65px;
                            height: 44px;
                            line-height: 44px;
                            display: inline-block;
                            cursor: pointer;
                            background-color: rgba(248, 249, 250, 0.45);
                          box-shadow: 0px 3px 7px 0px
                        rgba(99, 99, 99, 0.16);
                          border-radius: 4px;
                          border: solid 2px rgba(171, 171, 171, 0.45);
                            font-size: 17px;
                            color: #434343;
                            font-weight: normal;
                            margin-right: 29px;
                            &:last-child{
                                font-size: 13px;
                                margin-right: 0;
                            }
                        }
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
