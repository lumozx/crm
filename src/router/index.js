import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Mainobject from '@/components/mainobject'
import S_goods from '@/components/goods'
import A_goods from '@/components/a_goods'
import Repassword from '@/components/repassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      // name: 'mainobject',有默认路由，父路由不需要name
      component: Mainobject,
      meta: {
		    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children:[
      {
      	path: '',
      	name: 's_goods',
      	component: S_goods,
      },
      {
        path: 'a_goods',
      	name: 'a_goods',
      	component: A_goods,

      },
      {
        path: 'repassword',
      	name: 'repassword',
      	component: Repassword,
      }]
    },
  ]
})
