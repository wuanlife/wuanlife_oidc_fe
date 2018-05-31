<template>
  <div>
  <div class="date-picker year" @click="open(1)" :class="{ 'date-picker-clicked': isClickY }">
      <span>{{ year }}<i class="el-icon-caret-bottom"></i></span>
      <ul v-if="isClickY">
          <li v-for="n in (MaxYear - 1970)" :key="n" @click="picker(n,1)">{{ (1970 + n - 1)}}</li>
      </ul>
  </div>
  <span>年</span>
  <div class="date-picker month" @click="open(2)" :class="{ 'date-picker-clicked': isClickM }">
      <span>{{ month }}<i class="el-icon-caret-bottom"></i></span>
      <ul v-if="isClickM">
          <li v-for="n in Maxmonth" :key="n" @click="picker(n,2)">{{ n }}</li>
      </ul>
  </div>
  <span>月</span>
  <div class="date-picker day" @click="open(3)" :class="{ 'date-picker-clicked': isClickD }">
      <span>{{ day }}<i class="el-icon-caret-bottom"></i></span>
      <ul v-if="isClickD">
          <li v-for="n in (MaxDay)" :key="n" @click="picker(n,3)">{{ n }}</li>
      </ul>
  </div>
      <span>日</span>
  </div>
</template>

<script>
const num = new Date().getFullYear()
export default {
  data () {
    return {
      MaxYear: num,
      Maxmonth: 12,
      year: 2018,
      month: 1,
      day: 1,
      isClickY: false,
      isClickM: false,
      isClickD: false
    }
  },
  computed: {
    MaxDay: function () {
      const isLeap = (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0
      if (isLeap) {
        if (this.month === 1 || this.month === 3 || this.month === 5 || this.month === 7 || this.month === 8 || this.month === 10 || this.month === 12) {
          return 31
        } else if (this.month === 2) {
          return 29
        } else {
          return 30
        }
      } else {
        if (this.month === 1 || this.month === 3 || this.month === 5 || this.month === 7 || this.month === 8 || this.month === 10 || this.month === 12) {
          return 31
        } else if (this.month === 2) {
          return 28
        } else {
          return 30
        }
      }
    }
  },
  methods: {
    picker: function (value, num) {
      switch (num) {
        case 1:
          this.year = 1970 + value - 1
          break
        case 2:
          this.month = value
          break
        case 3:
          this.day = value
          break
      }
    },
    open: function (value) {
      switch (value) {
        case 1:
          this.isClickY = !this.isClickY
          break
        case 2:
          this.isClickM = !this.isClickM
          break
        case 3:
          this.isClickD = !this.isClickD
          break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.date-picker{
    min-width:34px;
    height:15px;
    text-align: center;
    background-color: #f1f1f1;
    border-radius: 4px;
    padding: 6px;
    border:transparent 1px solid;
    cursor: pointer;
    position: relative;
    display: inline-block;
    span{
        font-size: 14px;
        color: #757575;
    }
    ul{
      position: relative;
      height: 110px;
      width: 100%;
      border-radius: 4px;
      border: solid 1px #99b3e3;
      font-size: 16px;
      color: rgba(0,0,0,0.5);
      padding: 10px 0 10px 0;
      overflow-y: scroll;
      position: absolute;
      top: 18px;
      left: -1px;
      z-index: 999;
      background-color:rgba(255,255,255,0.5);
      li{
          margin-bottom: 5px;
          padding: 5px 0 5px 0x;
          &:hover{
               color: black;
           }
        }
    }
    ul::-webkit-scrollbar{
      width:5px;
    }
    ul::-webkit-scrollbar-thumb{
      width:3px;
      height:20px;
      background-color: #aabbfd
    }
}
.year{
  min-width:45px;
}
.date-picker-clicked{
    background-color: white;
    border: solid 1px #aabbfd;
    span{
      color:#5677fc;
    }
}
.avatar-icon{
    margin-left: 5px;
    color: #5677fc;
}
</style>
