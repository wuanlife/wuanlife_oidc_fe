<template>
  <div class="nav-user">
    <div class="nav-user-logined" v-if="user && user.uid">
        <el-dropdown trigger="click">
          <span class="text">
            {{user.uname}}<icon-svg icon-class="triangle" class="nav-user-triangle"></icon-svg>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    <!-- login bar (if not logined) -->
    <div v-else class="login-container">
      <span><router-link class="text" :to="{path: `/login?client_id=wuan`}">登录</router-link></span>
      <span><router-link class="text" :to="{path: `/signup`}">注册</router-link></span>
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
  created () {
    if (document.cookie.indexOf('wuan-id-token') === -1) {
      window.localStorage.clear()
    }
  },
  updated () {
  },
  methods: {
    handleLogout () {
      this.$cookie.delete('wuan-id-token')
      this.$cookie.delete('wuan-access-token')
      this.$store.commit('CLEAR_USER')
      location.reload() // 为了重新实例化vue-router对象 避免bug
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
.nav-user{
  display: flex;
  align-items: center;
  font-size: 18px;
  .nav-user-logined{
    .text{
      font-size:18px;
      color:#ffffff;
    }
    .nav-user-triangle{
      width:10px;
      height:10px;
      position: relative;
      top:-4px;
      left:3px;
    }
  }
  .login-container {
  font-size: 18px;
  margin-left: 30px;
  color: #ffffff;
  span {
    padding: 0 14px;
    .text{
      color:#ffffff;
      text-decoration: none;
    }
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
