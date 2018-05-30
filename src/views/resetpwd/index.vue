<template>
<div class="register-container">
  <section>
    <header>密码找回</header>
    <div class="form-content" v-loading="loading">
      <el-form  :model="loginForm" :rules="loginRules" ref="loginForm" class="demo-ruleForm" @keyup.enter.native="submitForm('loginForm')">
        <el-form-item  prop="password" class="form-inputy">
          <el-input type="password" v-model="loginForm.password" placeholder="输入新密码"></el-input>
        </el-form-item>
        <el-form-item  prop="confirmpassword" class="form-inputy">
          <el-input type="password" v-model="loginForm.confirmpassword" auto-complete="off" placeholder="确认新密码"></el-input>
        </el-form-item>
        <el-form-item  class="form-btny">
          <el-button type="primary" :loading="loading" @click="submitForm('loginForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import {
  resetpassword
} from 'api/auth'

export default {
  name: 'index-visitor',
  data () {
    // element-ui validator
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('请填写6-20位密码'))
      } else {
        callback()
      }
    }
    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('请填写6-20位密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('请确认新密码一致！'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'index-myplanet',
      loading: false,

      // form part
      loginForm: {
        password: '',
        confirmpassword: '',
        token: ''
      },
      loginRules: {
        password: [{
          validator: validatePassword,
          trigger: 'blur'
        }],
        confirmpassword: [{
          validator: validatePassword2,
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        this.loginForm.token = this.$route.query.token
        if (valid) {
          this.loading = true
          // resetpassword(this.loginForm);
          return new Promise((resolve, reject) => {
            resetpassword(this.loginForm).then(
              res => {
                this.$message({
                  message: '重置密码成功!!',
                  type: 'success',
                  duration: 2000
                })
                this.$router.push({
                  path: '/login'
                })
                this.loading = false
              }).catch(error => {
              this.$message({
                message: error.data.error,
                type: 'error',
                duration: 2000
              })
              this.loading = false
              reject(error)
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.register-container {
  display: flex;
  justify-content: space-between;
  width:400px;
  height:317px;
  margin: 135px auto;
    section {
      background: #ffffff;
      width:220px;
      height:317px;
      justify-content: center;
      box-shadow: 0px 0px 2px 2px #ecedee;
      text-align: center;
      border-radius: 5px;
      flex: 1;
        header {
          color:#5677fc;
          margin-top:40px;
          font-size: 18px;
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
            border: solid 1px rgba(209, 209, 209, 0.3);

            &:focus {
              background-color: rgba(248, 249, 250, 0.4);
              border-radius: 4px;
              border: solid 1px rgba(86, 119, 252, 0.3);
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
        div.form-content {
            width: 100%;
            padding-top: 37px;
            background: #ffffff;
            border-radius: 4px;
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
