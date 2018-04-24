<template>
  <div v-if="!authorizing">
    正在发起授权...
  </div>
  <div v-else>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{'授权' + authTarget}}</span>
      </div>
      <div class="authorization">

      </div>
      <div class="operations">
        <el-button type="primary" @click="authorize">授权</el-button>
        <el-button>取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import { verify, getAccess } from 'api/auth'
export default {
  name: 'Authorize',
  data () {
    return {
      authorizing: false,
      authTarget: '',
    }
  },
  async mounted () {
    const { client_id, redirect_uri, response_type, state, nonce } = this.$route.query
    this.authTarget = client_id

    const idToken = this.$cookie.get(`${client_id}-id-token`) || ''
    const accessToken = this.$cookie.get(`${client_id}-access-token`)

    if (idToken === '') {
      this.$router.push({path: 'login', query: {return_to: this.$route.fullPath, client_id: client_id}})
      return
    } else {
      const idTokenValid = await verify({idToken: idToken})
      if(!idTokenValid.success) {
        this.$router.push({path: 'login', query: {return_to: this.$route.fullPath, client_id: client_id}})
        return
      }
    }
    if (this.$cookie.get(client_id)) {
      // 检验Access-Token是否过期，如果过期则清空进入授权阶段
      await verify({accessToken: accessToken}).then(res => {
        // 没过期直接跳转
        window.location = `${redirect_uri}?access_token=${accessToken}&id_token=${idToken}`
      })
      // 如果没过期直接返回ID-token和Access-Token

    }
    // 进入授权阶段
    this.authorizing = true;
    if(client_id === 'wuan') {
      this.authorize()
    }
  },
  methods: {
    authorize() {
      const { client_id, redirect_uri, response_type, state, nonce } = this.$route.query
      const idToken = this.$cookie.get(`${client_id}-id-token`)
      getAccess({scope: 'public_profile'}).then(res => {
        this.$cookie.set(`${client_id}-access-token`, res['Access-Token'])
        window.location = `${redirect_uri}?access_token=${res['Access-Token']}&id_token=${idToken}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
