<template>
  <div class="nav-user">
    <div class="nav-user-logined" v-if="user.id">
        <el-dropdown trigger="click">
          <span @click="show()">
            淘淘<icon-svg icon-class="triangle1" class="nav-user-triangle"></icon-svg>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    <!-- login bar (if not logined) -->
    <div v-else class="login-container">
      <span><router-link :to="{path: '/authorize?client_id=wuan&redirect_uri=//localhost:9526&response_type=code&state=maye&nonce=random'}">登录</router-link></span>
      <span><router-link :to="{path: '/signup'}">注册</router-link></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavUser',
  data () {
    return {
      isShow: false

    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
  },
  updated () {
  },
  methods: {
    logout () {
      this.$store.dispatch('Logout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    goPath (path) {
      this.$router.push({path: path})
    },
    visibleChange () {
      this.isShowDrop = !this.isShowDrop
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container{
  font-size: 18px;
  margin-left: 30px;
  color: #ffffff;
  span {
    padding: 0 14px;
  }
}
.nav-user{
  display: flex;
  align-items: center;
  .login-container {
  color: #ffffff;
  font-size:18px;
  text-decoration: none;
  span {
    padding: 0 14px;
    &:hover{
      font-weight: bold;
    }
  }
}
 /*
    .nav-user-logined{
    display: flex;
    justify-content: flex-start;
    height: 40px;
    .nav-user-find{
      background-color: rgba(255, 255, 255, 0.2);
      text-align: center;
      border-radius: 4px;
      color: #fff;
      font-size: 18px;
      width: 90px;
      line-height: 40px;
      cursor: pointer;
    }
    >div{
      position: relative;
      text-align: center;
      width: 100px;
      span{
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        border-radius: 4px;
        display: block;
        line-height: 40px;
      }
      .logout{
        position: absolute;
        top: 40px;
        width: 100%;
        font-size: 14px;
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }*/
}
</style>
