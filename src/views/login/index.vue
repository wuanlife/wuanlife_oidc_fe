<template>
  <div class="view-container login-container">
    <div class="form-content">
      <h2>登录</h2>
      <el-form ref="loginform" :model="form" :rules="rules">
        <div class="mail-input">
          <el-form-item  prop="email">
           <el-input v-model="form.email" placeholder="邮箱" clearable></el-input>
          </el-form-item>
        </div>
        <div class="psw-input">
          <el-form-item  prop="password">
           <el-input type="password" v-model="form.password" placeholder="密码" clearable @keyup.enter.native="onSubmit('loginform')" ></el-input>
          </el-form-item>
        </div>
        <el-form-item class="form-btny">
          <el-button type="primary" :loading="loading" @click="onSubmit('loginform')">登录</el-button>
         <!--
          <el-button type="primary" @click="jumpSignup">去注册</el-button>
          <el-button>取消</el-button>
         -->
        </el-form-item>
      </el-form>
      <div  class="getBack" ><router-link to="/findpsw" class="getBack">忘记密码?</router-link></div>
    </div>
  </div>
</template>

<script>
import { login } from 'api/user'
import { Notification } from 'element-ui'
export default {
  name: 'Login',
  data () {
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码 '))
      } else {
        if (this.form.password !== '') {
        }
        callback()
      }
    }
    return {
      loading: false,
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  mounted () {
    const clientId = this.$route.query.client_id || 'wuan'
    const idToken = this.$cookie.get(`${clientId}-id-token`)
    if (idToken !== null && idToken !== '') {
      this.$router.push({ path: '/personal' })
    }
  },
  methods: {
    onSubmit (formname) {
      /* eslint-disable */
      this.$refs[formname].validate(valid => {
        if(!valid) {
          return false
        }
        const { client_id, return_to } = this.$route.query;
        this.loading = true;
        login({
          email: this.form.email,
          password: this.form.password,
          client_id: client_id || 'wuan'
        }).then(res => {
          this.$cookie.set(`${client_id}-id-token`, res["ID-Token"], 7);
          Notification.success({
            message: "登录成功",
            offset: 60
          });
          const self = this;

          self.$store.commit('SET_USER', {
            ...JSON.parse(atob(res['ID-Token'].split('.')[1]))
          })
          this.$router.push({ path: return_to });
          this.loading = false;
        }).catch(err => {
          Notification.error({
            message: err.data.error,
            offset: 60
          });
          this.loading = false;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  margin: auto;
  //max-width: 518px;
  //min-width: 380px;
  margin-top: 135px;
  .form-content {
    /*background: #C0C0C0;*/
    background: #ffffff;
    width: 400px;
    height: 320px;
    margin: 0 auto;
    justify-content: center;
    box-shadow: 0px 0px 2px 2px #ecedee;
    text-align: center;
    border-radius: 5px;
    h2 {
      color: #5677fc;
      margin-top: 40px;
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
          background-color: white;
          border-radius: 4px;
          border: solid 2px rgba(0, 64, 185, 0.4);
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
    .mail-input {
      width: 220px;
      margin: 0 auto;
    }

    .psw-input {
      width: 220px;
      margin: 0 auto;
      padding-top: 24px;
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
    .getBack {
      display: block;
      text-decoration: none;
      outline: none;
      color: #444444;
      font-size: 10px;
      margin-top: 18px;
    }
  }
}
</style>
