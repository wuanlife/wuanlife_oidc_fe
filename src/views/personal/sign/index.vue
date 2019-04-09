<template>
    <div>
        <h2>测试</h2>
        <div class="content">
            {{this.fruitnum}}
            下一个
            <span>{{is_sign}}</span>
            <p>{{range_min}}到{{range_max}}</p>
        </div>
    </div>
</template>

<script>
import { fruitNum, signInfo } from 'api/user'
export default {
  name: 'signTab',
  data () {
    return {
      fruitnum: '100',
      is_sign: '',
      range_min: '',
      range_max: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await fruitNum({id: this.$store.getters.user.uid}).then(res => {
        console.log(res)
      })
      await signInfo({id: this.$store.getters.user.uid}).then(res => {
        console.log(res)
        this.is_sign = res.is_sign
        this.range_min = res.range_min
        this.range_max = res.range_max
      })
    }
  }
}
</script>

<style scoped>

</style>
