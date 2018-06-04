<template>
  <div class="register-container">
    <section>
      <header>密码找回</header>
      <div class="form-content"  v-loading="loading">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="demo-ruleForm" @keyup.enter.native="submitForm('loginForm')">
            <el-form-item  prop="email" class="form-inputy">
              <el-input v-model="loginForm.email" placeholder="输入邮箱"></el-input>
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
import { mapGetters } from 'vuex'
import { findPwd } from 'api/user'

export default {
  name: 'index-visitor',
  data () {
    // element-ui validator
    var validateUser = (rule, value, callback) => {
      var myreg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!myreg.test(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'index-myplanet',
      loading: false,

      // form part
      loginForm: {
        email: ''
      },
      loginRules: {
        email: [
          { validator: validateUser, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
      // console.log(this.loginForm.email+valid);
        if (valid) {
          this.loading = true
          findPwd({email: this.loginForm.email}).then(
            res => {
              this.loading = false
              this.$message({
                message: '验证信息已飞到你的邮箱，快快去查看!!',
                type: 'success',
                duration: 1000
              })
            }).catch(error => {
            this.$message({
              message: error.data.error,
              type: 'error',
              duration: 2000
            })
            this.loading = false
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
.register-container{
  display: flex;
    justify-content: space-between;
    margin: auto;
    width: 400px;
    height: 317px;
    box-shadow: 0px 0px 2px 2px #ecedee;
    margin-top: 135px;
    section {
      margin: 0 auto;
      header {
        margin: 15px 0 20px 0;
        font-size: 18px;
        color: #5677fc;
        margin-top: 40px;
        text-align: center;
      }
      div.form-content {
        width: 100%;
        border-radius:4px;
        padding-top:20px;
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
              background-color: white;
              border-radius: 4px;
              border: solid 1px rgba(86, 119, 252, 0.3);
            }

            &::-webkit-input-placeholder {
              font-size: 12px;
              color: #848484;
              margin-top: 17px;
            }

            &:focus::-webkit-input-placeholder {
              color: transparent;
            }
          }
        }
        .form-btny {
          width: 220px;
          height: 32px;
          padding-top: 24px;
          margin: 0 auto;
          button {
            padding: 0;
            width: 220px;
            height: 32px;
            background-color: #5677fc;
            border-radius: 4px;
            font-size: 15px;
            color: #ffffff;
          }
          button[disabled] {
            background-color: #e9e9e9;
            border-color: #e9e9e9;
          }
        }
      }
    }
}
</style>
