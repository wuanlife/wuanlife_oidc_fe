<template>
  <div class="view-container movie pesonData">
    <div class="personal-data-form" v-loading="dataloding">
    <el-tabs v-model="$route.params.tab" @tab-click="handleTabClick">
      <!-- 这里可以考虑直接可配制化 -->
      <el-tab-pane name="profile">
        <span slot="label" class="tabspan"><icon-svg iconClass="renyuanjieshao" class="tabicon"></icon-svg>个人资料</span>
        <profile-tab></profile-tab>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="changepwd">
        <span slot="label" class="tabspan tabspan1"><icon-svg iconClass="mima" class="tabicon"></icon-svg>修改密码</span>
        <changepwd-tab></changepwd-tab>
      </el-tab-pane>
      <!--
      <el-tab-pane label="积分兑换" name="points">
        <span slot="label" class="tabspan tabspan2"><icon-svg iconClass="jifen1" class="tabicon"></icon-svg>积分兑换</span>
        <points-tab></points-tab>
      </el-tab-pane>
      -->
      <el-tab-pane label="签到" name="points">
        <span slot="label" class="tabspan tabspan2"><icon-svg iconClass="jifen1" class="tabicon"></icon-svg>午安果</span>
        <sign-tab></sign-tab>
      </el-tab-pane>
    </el-tabs>
     </div>
  </div>
</template>
<script>
import ChangepwdTab from './changepwd'
// import PointsTab from './points'
import SignTab from './sign'
import ProfileTab from './profile'

export default {
  data () {
    return {
      activeName: this.$route.params.tab
    }
  },
  components: {
    'changepwd-tab': ChangepwdTab,
    // 'points-tab': PointsTab,
    'sign-tab': SignTab,
    'profile-tab': ProfileTab
  },

  computed: {
  },

  mounted () {},

  methods: {
    handleTabClick (tab, event) {
      console.log(tab, event)
      // window.location.replace(`/personal/)
      this.$router.push({name: 'personalTab', params: {tab: tab.name}})
    }
  }
}
</script>
<style lang="scss" scoped>
  .pesonData {
  display: flex;
  justify-content: space-between;
  margin:  auto;
  margin-top: 135px;
  .personal-data-form {
     background: #fff;
      width:745px ;
      height:423px;
      margin: 0 auto;
      justify-content: center;
      box-shadow: 0px 0px 2px 2px #ecedee;
      text-align: center;
      border-radius: 5px;
      /deep/
    /*
    .el-tabs__nav{
      width:690px;
      display: flex;
      justify-content: space-between;
    }*/
    .el-tabs__item{
      width:230px;
    }
    .el-tabs{
    width: 695px;
    margin: 0 auto;
    padding-top: 13px;
    padding-bottom: 13px;
    .tabspan{
      font-size:18px;
      padding:5px
    }
    .tabicon{
      width:22px;
      height:22px;
      margin-right:15px;
    }
    .el-icon-date{
      width:120px;
      font-size: 18px;
    }
      /deep/
      .el-tab-pane{
        width:120px;
        height:356px;
      }
    }
  }
}
</style>
