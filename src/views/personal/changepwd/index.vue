<template>
  <div class="register-container view-container">
    <section>
      <div class="form-content wl-card" v-loading="loading">
        <el-form label-width="100px" :model="changepswForm" :rules="changepswRules" ref="changepswForm" class="demo-ruleForm" @keyup.enter.native="submitForm('changepswForm')">
         <div class="oldpsw-input">
            <el-form-item label="原密码：" prop="oldPassword" class="form-inputy">
              <el-input  type="password" v-model="changepswForm.oldPassword" placeholder="原密码">
                <icon-svg icon-class="mima" class="mima-icon" slot="prefix"></icon-svg>
              </el-input>
            </el-form-item>
        </div>
          <div class="psw-input">
            <el-form-item label="新密码：" prop="password" class="form-inputy">
              <el-input type="password" v-model="changepswForm.password" placeholder="输入密码">
                <icon-svg icon-class="mima" class="mima-icon" slot="prefix"></icon-svg>
              </el-input>
            </el-form-item>
          </div>
          <div class="cofpsw-input">
            <el-form-item label="确认密码：" prop="confirmPassword" class="form-inputy">
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
.register-container{
  display: flex;
    justify-content: space-between;
    margin: auto;
    width: 700px;
    height: 343px;
    section {
      flex: 1;
      header {
        margin: 15px 0 20px 0;
        font-family:PingFangHK-Medium;
        font-size:18px;
        color:#5677fc;
      }
      div.form-content {
        width: 100%;
        background:#ffffff;
        border-radius:4px;
        width:300px;
        height:343px;
        padding-top:40px;
        margin: 0 auto;
        }
      }
    }
</style>
