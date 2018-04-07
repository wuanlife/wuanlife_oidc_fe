<template>
  <div class="view-container movie">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button type="primary" @click="jumpSignup">去注册</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from 'api/user'
export default {
  name: 'Login',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.password !== '') {
        }
        callback()
      }
    }
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    onSubmit () {
      /* eslint-disable */
      const { client_id, return_to } = this.$route.query
      login({
        email: this.form.email, 
        password: this.form.password, 
        client_id: client_id
      }).then(res => {
        this.$cookie.set(`${client_id}-id-token`, res['ID-Token'])
        this.$router.push({path: return_to})
      })
    },
    jumpSignup () {
      const { client_id, return_to } = this.$route.query
      this.$router.push({path: 'signup', query: {return_to: return_to, client_id: client_id}})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
