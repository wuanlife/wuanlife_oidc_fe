<template>
    <div>
        <h2>测试</h2>
        <div class="content">
            {{this.coin}}
            下一个
            {{this.moviepoints}}
        </div>
    </div>
</template>

<script>
import { getUserPoints, getPointslist } from 'api/user'
export default {
  name: 'signTab',
  data () {
    return {
      coin: '100',
      moviepoints: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await getUserPoints({id: this.$store.getters.user.uid}).then(res => {
        this.coin = res.points
      })
      await getPointslist({id: this.$store.getters.user.uid}).then(res => {
        this.moviepoints = res.app['0'].points
        this.exchange_rate = res.app['0'].exchange_rate
        this.exchangeid = res.app['0'].id
      })
    }
  }
}
</script>

<style scoped>

</style>
