<template>
  <div class="view-container movie signup-container">
    <div class="form-content">
      <h2>注册</h2>
      <el-form ref="signupForm"  :model="form" :rules="rules">
        <div class="email-input">
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </div>
        <div class="username-input">
          <el-form-item  prop="username">
            <el-input v-model="form.username" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </div>
        <div class="psw-input">
          <el-form-item  prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="onSubmit('signupForm')"></el-input>
          </el-form-item>
        </div>
       <!--
         <el-form-item  prop="passwordRepeat">
          <el-input type="password" v-model="form.passwordRepeat"></el-input>
        </el-form-item>
        -->
        <el-form-item class="form-btny">
          <el-button type="primary" :loading='loading' :disabled="noPass" @click="onSubmit('signupForm')" >注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { signup } from 'api/user'
import { Notification } from 'element-ui'
import { mapGetters } from 'vuex'
export default {
  name: 'Signup',
  data () {
    // 获取字符串长度，中文长度为2
    function getLength (str) {
      let charLength = 0
      for (let i = 0; i < str.length; i++) {
        let sonChar = str.charAt(i)
        let china = /^[\u4e00-\u9fa5]*$/
        china.test(sonChar) ? charLength += 2 : charLength += 1
      }
      return charLength
    }
    const validateUsername = (rule, value, callback) => {
      var myregName = /^[0-9a-zA-Z\u4E00-\u9FA5_]*$/
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!myregName.test(value)) {
        callback(new Error('只允许中文、数字、字母和下划线！'))
      } else if (getLength(value) > 14 || getLength(value) < 1) {
        callback(new Error('只允许1-7个汉字或者1-14个字符'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      signform: 'signupForm',
      loading: false,
      noPass: false,
      form: {
        email: '',
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' },
          { min: 6, max: 20, message: '请填写6-20位密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    onSubmit (formname) {
      /* eslint-disable */
      this.$refs[formname].validate(valid =>{
      if(valid){
      const self = this
      const { client_id, return_to } = this.$route.query
      this.loading = true

      signup({
        name: this.form.username,
        email: this.form.email,
        password: this.form.password,
        client_id: client_id || 'wuan'
      }).then(res => {
        this.$cookie.set(`${client_id}-id-token`, res['ID-Token'], 7)
        Notification.success({
          message: '注册成功',
          offset: 60
        })
        this.$router.push({path: return_to || '/'})
      }).catch(err => {
         Notification.error({
         message: err.data.error,
         offset: 60
        })
        this.loading = false
      })
     } else {
       return false
     }
    }
   )
  }
 }
}
</script>

<style lang="scss" scoped>
  .signup-container{
  display: flex;
  justify-content: space-between;
  margin-top: 135px;

  .form-content{
     background: #ffffff;
     width:400px;
     height:381px;
     margin: 0 auto;
      justify-content: center;
      box-shadow: 0px 0px 2px 2px #ecedee;
      text-align: center;
      border-radius: 5px;

      h2{
        color:#5677fc;
        margin-top:40px;
      }

       .el-form-item {
        margin-bottom: 0px;

        /deep/ .el-form-item__error {
          padding-top: 5px;
          padding-left: 15px;
          height: 15px;
          font-size: 12px;
          color: #e60012;
        }
      }
      .el-input {
        width: 220px;

        /deep/ input {
          padding-left: 11px;
          font-size: 12px;
          height: 32px;
          color: #434343;
          background-color: #f1f1f1;
          border-radius: 4px;
          //border: solid 2px rgba(171, 171, 171, 0.45);

          &:focus {
            background-color: rgba(248, 249, 250, 0.4);
            border-radius: 4px;
            border: solid 2px rgba(0, 64, 185, 0.4);
          }

          &::-webkit-input-placeholder {
            font-size: 12px;
            color: #848484;
            margin-top: 17px;
          }

           &:focus::-webkit-input-placeholder {
            color:transparent;
          }
        }
      }
      .email-input {
        width: 220px;
        margin: 0 auto;
      }
      .username-input{
        width:220px;
        margin: 0 auto;
        padding-top:24px;
      }  
      .psw-input {
        width: 220px;
        margin: 0 auto;
        padding-top:24px;
      }
      .form-btny {
        width: 220px;
        height: 32px;
        padding-top: 24px;
        margin:0 auto;
        button {
          padding: 0;
          width:220px;
          height: 32px;
          background-color: #5677fc;
          border-radius: 4px;
          font-size: 15px;
          color: #ffffff;
        }
        button[disabled] {
          background-color:#e9e9e9;
          border-color: #e9e9e9;
        }
      }
  }
}
</style>
