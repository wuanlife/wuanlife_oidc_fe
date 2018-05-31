<template>
  <div class="navbar">
    <div class="navbar-header">
      <div class="logo" @click="$router.push({path: '/'})">午安账号</div>
      <nav-user></nav-user>
    </div>
    <!-- <div class="navber-menu">
      <nav-list></nav-list>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavUser from './NavUser'

export default {
  components: {
    'nav-user': NavUser
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 72px;
  max-width: 1260px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .navbar-header{
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: stretch;
    height: 55px;
    .logo{
      cursor: pointer;
      color: #fff;
      font-size: 30px;
      display: flex;
      align-items: center;
    }
  }
  .navber-menu{
    height: 41px;
    display: flex;
  }
}
</style>
