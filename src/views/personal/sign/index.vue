<template>
    <div class="sign">
        <h2>您当前有午安果 <span>{{this.fruitnum}}</span></h2>
        <div class="content">
            <div v-if="sign_status">
                <a @click="sign" class="before-sign"><icon-svg iconClass="qiandao" class="sign-icon"></icon-svg>签到</a>
            </div>
            <div v-else>
                <a class="after-sign"><icon-svg iconClass="yiqiandao" class="sign-icon"></icon-svg>已签到</a>
            </div>
            <p>每日签到可以获取{{range_min}}~{{range_max}}午安果</p>
        </div>
        <div class="popup" v-if="msg">
            <div class="msg">
                <h6>获得了<span>{{get_value}}</span>午安果</h6>
                <a @click="iknow">我知道了</a>
            </div>
        </div>
    </div>
</template>

<script>
import { fruitNum, signInfo, signOnce } from 'api/user'
export default {
  name: 'signTab',
  data () {
    return {
      fruitnum: '0',
      sign_status: false, // 状态：可以签到
      range_min: '',
      range_max: '',
      get_value: '',
      msg: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      await fruitNum({id: this.$store.getters.user.uid}).then(res => {
        console.log(res)
        this.fruitnum = res.value
      })
      await signInfo({id: this.$store.getters.user.uid}).then(res => {
        console.log(res)
        if (res.is_sign === 1) {
          this.sign_status = false
        } else {
          this.sign_status = true
        }
        this.range_min = res.range_min
        this.range_max = res.range_max
      })
    },
    async sign () {
      await signOnce({id: this.$store.getters.user.uid}).then(res => {
        console.log(res)
        this.init()
        this.get_value = res.value // 获得午安果数量
        this.msg = true // 弹窗提示
      })
    },
    iknow: function () {
      this.msg = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .sign {
      display: block;
      width: 700px;
      height: 343px;
      margin: 0 auto;
      font-famil: 'Microsoft Yahei','微软雅黑';
      h2 {
          position: relative;
          width: 250px;
          height: 40px;
          line-height: 40px;
          margin: 40px auto;
          font-size: 14px;
          color: #333333;
          font-weight: normal;
          text-align: left;
          span {
              position: absolute;
              right: 0;
              display: inline-block;
              width: 150px;
              font-size: 30px;
              color: #facd89;
              text-align: center;
          }
      }
      .content {
          width: 280px;
          height: 180px;
          position: relative;
          padding: 0 0 20px;
          margin: 0 auto;
          text-align: center;
          a {
              display: inline-block;
              width: 100px;
              height: 100px;
              background-color: #6c87f6;
              color: #fff;
              font-size: 12px;
              border-radius: 50%;
              box-sizing: border-box;
              &.before-sign {
                  box-shadow: 0 0 20px 3px #b7c6fe;
                  cursor: pointer;
                  &:hover{
                      box-shadow: 0 0 20px 6px #b7c6fe;
                  }
              }
              &.after-sign {
                  background-color: #bbc9fe;
                  box-shadow: 0 0 5px 3px #f6f6f6;
              }
              .sign-icon {
                  display: block;
                  width: 36px;
                  height: 36px;
                  margin: 24px auto 8px;
              }
          }
          p {
              width: 100%;
              height: 20px;
              position: absolute;
              bottom: 0;
              left: 0;
              font-size: 12px;
              color: #999999;
              text-align: center;
          }
      }
      .popup {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 10;
          width: 100%;
          height: 100%;
          background-color: rgba(218,218,218,.3);
          .msg {
              position: fixed;
              top: 50%;
              left: 50%;
              overflow: hidden;
              width: 360px;
              height: 172px;
              margin: -86px 0 0 -180px;
              background-color: #fff;
              border-radius: 5px;
              h6 {
                  margin: 40px auto 30px;
                  font-size: 15px;
                  color: #666;
                  font-weight: normal;
                  text-align: center;
                  span {
                      display: inline-block;
                      padding: 0 10px;
                      font-size: 25px;
                      color: #facd89;
                  }
              }
              a {
                  display: inline-block;
                  width: 138px;
                  height: 30px;
                  line-height: 30px;
                  background-color: #6c87f6;
                  font-size: 14px;
                  color: #fff;
                  text-align: center;
                  border-radius: 25px;
                  cursor: pointer;
              }
          }
      }
  }
</style>
