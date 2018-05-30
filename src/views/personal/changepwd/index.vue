<template>
  <div class="register-container view-container">
    <section>
      <div class="form-content wl-card" v-loading="loading">
        <el-form :model="changepswForm" :rules="changepswRules" ref="changepswForm" class="demo-ruleForm" @keyup.enter.native="submitForm('changepswForm')">
          <div class="oldpsw-input">
            <el-form-item prop="oldPassword" class="form-inputy">
              <el-input type="password" v-model="changepswForm.oldPassword" placeholder="原密码">
                <icon-svg icon-class="mima" class="mima-icon" slot="prefix"></icon-svg>
              </el-input>
            </el-form-item>
          </div>
          <div class="psw-input">
            <el-form-item prop="password" class="form-inputy">
              <el-input type="password" v-model="changepswForm.password" placeholder="输入密码">
                <icon-svg icon-class="mima" class="mima-icon" slot="prefix"></icon-svg>
              </el-input>
            </el-form-item>
          </div>
          <div class="cofpsw-input">
            <el-form-item prop="confirmPassword" class="form-inputy">
              <el-input type="password" v-model="changepswForm.confirmPassword" auto-complete="off" placeholder="请再输入一遍">
                <icon-svg icon-class="mima" class="mima-icon" slot="prefix"></icon-svg>
              </el-input>
            </el-form-item>
          </div>
          <el-form-item class="form-btny">
            <el-button type="primary" :loading="loading" @click="submitForm('changepswForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Notification } from 'element-ui'
import { changePassword } from 'api/user'

export default {
  name: 'changepwdTab',
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
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('请填写6-20位密码'))
      } else if (value !== this.changepswForm.password) {
        callback(new Error('请确认新密码一致！'))
      } else {
        callback()
      }
    }
    return {
      loading: false,

      // form part
      changepswForm: {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      changepswRules: {
        oldPassword: [{ validator: validatePassword, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            await changePassword({
              old_psd: this.changepswForm.oldPassword,
              new_psd: this.changepswForm.password
            })
            Notification.info({
              message: '密码修改成功, 3秒后跳转到首页',
              offset: 60
            })
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 3000)
            this.loading = false
          } catch (e) {
            Notification.error({
              message: e.data.error,
              offset: 60
            })
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.form-content {
  width: 100%;
  background: #ffffff;
  /*background: #C0C0C0;*/
  width: 745px;
  height: 343px;
  margin: 0 auto;
  justify-content: center;

  .el-form-item {
    margin-bottom: 0px;

    /deep/ .el-form-item__error {
      padding-top: 6px;
      height: 16px;
      font-size: 8px;
      color: #e60012;
    }
  }

  .el-input {
    width: 200px;

    /deep/ input {
      padding-left: 11px;
      font-size: 15px;
      height: 32px;
      color: #434343;
      background-color: rgba(248, 249, 250, 0.4);
      box-shadow: -3px 0px 7px 0px rgba(99, 99, 99, 0.16);
      border-radius: 4px;
      border: solid 2px rgba(171, 171, 171, 0.4);

      &:focus {
        background-color: rgba(248, 249, 250, 0.4);
        box-shadow: 0px 3px 7px 0px rgba(86, 119, 252, 0.16);
        border-radius: 4px;
        border: solid 2px rgba(0, 64, 185, 0.4);
      }

      &::-webkit-input-placeholder {
        font-size: 12px;
        color: #434343;
        margin-top: 18px;
      }
    }
  }

  .oldpsw-input {
    width: 200px;
    margin: 0 auto;
    padding-top: 32px;

    .svg-icon {
      width: 25px;
      height: 21px;
      color: #5677fc;
      margin: 15px 0 15px -44px;
    }
  }

  .psw-input {
    width: 200px;
    margin: 0 auto;
    padding-top: 30px;
    .svg-icon {
      width: 25px;
      height: 21px;
      color: #5677fc;
      margin: 15px 0 15px -44px;
    }
  }

  .cofpsw-input {
    width: 200px;
    margin: 0 auto;
    padding-top: 30px;
    .svg-icon {
      width: 25px;
      height: 21px;
      color: #5677fc;
      margin: 15px 0 15px -44px;
    }
  }

  .form-btny {
    text-align: center;
    width: 93px;
    height: 32px;
    padding-top: 40px;
    margin: 0 auto;
    button {
      padding: 0;
      width: 93px;
      height: 32px;
      background-color: #5677fc;
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
