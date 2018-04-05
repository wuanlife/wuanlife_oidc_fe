import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require.ensure([], () => resolve(require('../views/login/index')), 'Login')
const Signup = resolve => require.ensure([], () => resolve(require('../views/signup/index')), 'Signup')

Vue.use(Router)

/**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  **/

export const constantRouterMap = [
  // {
  //   path: '/',
  //   component: Layout,
  //   hidden: true,
  //   redirect: '/timeline',
  //   children: [{
  //     path: '/timeline/:typeId',
  //     component: Movies,
  //     meta: { title: '午安网 - 过你想过的生活' }
  //   }, {
  //     path: '/timeline',
  //     component: Movies,
  //     meta: { title: '午安网 - 过你想过的生活' }
  //   }]
  // },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
