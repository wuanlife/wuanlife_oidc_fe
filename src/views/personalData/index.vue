<template>
  <div class="view-container movie pesonData">
    <div class="personal-data-form" v-loading="dataloding">
    <el-tabs >
      <el-tab-pane label="个人资料" name="user" size="big">个人资料</el-tab-pane>
      <el-tab-pane label="修改密码" name="passwd">修改密码</el-tab-pane>
      <el-tab-pane label="积分兑换" name="points">积分兑换</el-tab-pane>
    </el-tabs>
     </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },

  computed: {
  },

  mounted () {},

  methods: {}
}
</script>
<style lang="scss" scoped>
  .pesonData {
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 135px;
  .personal-data-form {
     background: #ffffff;
      width:745px ;
      height:423px;
      margin: 0 auto;
      justify-content: center;
      box-shadow: 0px 0px 2px 2px #ecedee;
      text-align: center;
      border-radius: 5px;
    .el-tabs{
    size:18px;
      /deep/
      .el-tab-pane{
        width:120px;
      }
    }
  }
}
</style>
