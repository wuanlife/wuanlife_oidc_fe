<template>
  <div class="nav-user">
    <div class="nav-user-logined">
      <div>
        <el-dropdown trigger="click">
          <span @click="show()">
            淘淘<icon-svg icon-class="triangle1" class="nav-user-triangle"></icon-svg>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavUser',
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    show () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nav-user{
  display: flex;
  align-items: center;
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
  }
}
</style>
