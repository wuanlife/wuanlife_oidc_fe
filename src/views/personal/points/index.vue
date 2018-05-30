<template>
  <div class="view-container login-container">
    <div class="form-content">
    <span>您当前拥有</span>
    <span>影视积分</span>
    <span><i class="el-icon-date"></i>54</span>
    <span>午安币</span>
    <span><i class="el-icon-date"></i>16</span>
  </div>
  </div>
</template>

<script>

export default {
  name: 'pointsTab',
  data () {
    return {

    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 700px;
  height: 343px;
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
  }
}
</style>
