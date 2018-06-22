<template>
  <div class="view-container login-container">
    <div class="form-content">
      <div class="pointsshow">
        <span class="normaltext">您当前拥有</span>
        <span class="moviepoints">影视积分</span>
        <span class="movieicon">  <i class="el-icon-date"></i></span>
        <span class="mpointscolor">{{moviepoints}}</span>
        <span class="coin">午安币</span>
        <span class="coinicon"><i class="el-icon-date"></i></span>
        <span class="coincolor"> {{coin}}</span>
      </div>
      <div class="exchange">
        <span class="normaltext">影视积分</span>
        <span class="normaltext">兑换</span>
        <el-input v-model="input" ></el-input>
        <span class="normaltext">午安币</span>
        <span class="normaltext">（1影视积分=4午安币）</span>
      </div>
        <el-button type="primary" >兑换</el-button>
  </div>
  </div>
</template>

<script>
// import { Notification } from 'element-ui'
export default {
  name: 'pointsTab',
  data () {
    return {
      input: '',
      moviepoints: '',
      coins: ''
    }
  },
  methods: {
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 745px;
  height: 343px;
  .form-content {
    /*background: #C0C0C0;*/
    background: #ffffff;
    width: 500px;
    height: 320px;
    margin: 0 auto;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    .pointsshow{
      width: 500px;
      height: 40px;
      padding-top: 40px;
    }
    .normaltext{
      width: 71px;
      height: 14px;
      font-size: 14px;
      color: #333333;
    }
    .moviepoints,.coin{
      width: 64px;
      height: 16px;
      font-size: 16px;
      color: #707070;
      padding-left: 20px;
    }
    .movieicon{
      width: 27px;
      height: 26px;
      color: #008200;
      padding-left: 20px;
    }
    .mpointscolor{
      width: 20px;
      height: 15px;
      font-size: 18px;
      color: #008200;
      padding-left: 20px;
    }
    .coinicon{
      width: 27px;
      height: 26px;
      color: #ffd300;
      padding-left: 20px;
    }
    .coincolor{
      width: 19px;
      height: 15px;
      font-size: 18px;
      color: #ffd300;
      padding-left: 20px;
    }
    .exchange{
      width: 500px;
      height: 40px;
      padding-top: 20px;
    }
    .el-input{
      width: 60px;
      height: 32px;
      padding-left: 20px;
      padding-right: 20px;
      /deep/ input {
        padding-left: 11px;
        font-size: 18px;
        height: 32px;
        color: #ffd300;
        background-color: rgba(171, 171, 171, 0.45);
        border-radius: 4px;
        border: solid 1px rgba(171, 171, 171, 0.45);

        &:focus {
          background-color: #fff;
          color: #000;
          border-radius: 4px;
          border: solid 1px rgba(86, 119, 252, 0.5);
        }

        &::-webkit-input-placeholder {
          font-size: 18px;
          color: #848484;
          margin-top: 17px;
        }

         &:focus::-webkit-input-placeholder {
          color:transparent;
        }
      }
    }
    .el-button{
      margin-top: 40px;
      button{
        padding: 0;
        width:93px;
        height: 32px;
        background-color: #5677fc;
        border-radius: 4px;
        font-size: 14px;
        color: #ffffff;
      }
      button[disabled] {
        background-color:#e9e9e9;
        border-color: #e9e9e9;
      }
    }
  }
}
</style>
