import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Layout from '../views/layout/Layout'

// const Index = resolve => require.ensure([], () => resolve(require('../views/login/index')), 'Index')
const Login = resolve => require.ensure([], () => resolve(require('../views/login/index')), 'Login')
const Signup = resolve => require.ensure([], () => resolve(require('../views/signup/index')), 'Signup')
const Authorize = resolve => require.ensure([], () => resolve(require('../views/authorize/index')), 'Authorize')
const FindPsw = resolve => require.ensure([], () => resolve(require('../views/findpsw/index')), 'FindPsw') // 找回密码
const Resetpwd = resolve => require.ensure([], () => resolve(require('../views/resetpwd/index')), 'Resetpwd') // 重置密码
const Personal = resolve => require.ensure([], () => resolve(require('../views/personal/index')), 'Personal')

Vue.use(Router)

/**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  **/

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/personal/profile'
    // children: [{
    //   path: '/',
    //   component: Index,
    //   meta: { title: '午安网 - 过你想过的生活' }
    // }]
  },
  {
    path: '/login',
    component: Layout,
    children: [{
      path: '/Login',
      component: Login,
      meta: { title: '午安网 - 过你想过的生活' }
    }]
  },
  {
    path: '/signup',
    component: Layout,
    children: [{
      path: '/Signup',
      component: Signup,
      meta: { title: '午安网 - 过你想过的生活' }
    }]
  },
  {
    path: '/authorize',
    component: Authorize
  },
  {
    path: '/resetpwd',
    name: 'Resetpwd',
    component: Layout,
    redirect: '/resetpwd/index',
    children: [{
      path: '',
      component: Resetpwd
    }]
  },
  {
    path: '/personal',
    name: 'personal',
    component: Layout,
    redirect: '/personal/profile',
    children: [{
      name: 'personalTab',
      path: ':tab',
      component: Personal,
      meta: {
        title: '个人资料',
        requireAuth: true
      }
    }]
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/findpsw',
    name: 'findpsw',
    component: Layout,
    redirect: '/findpsw/index',
    hidden: true,
    children: [{ path: 'index', component: FindPsw }]
  }
  /*
  {
    path: '/changepsw',
    name: 'changepsw',
    component: Layout,
    redirect: '/changepsw/index',
    hidden: true,
    children: [{
      path: 'index',
      component: Changepsw,
      meta: {
        title: '修改密码 - 午安网 - 过你想过的生活',
        requireAuth: true
      }
    }]
  }
*/
]

const router = new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.user.uname) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {return_to: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
