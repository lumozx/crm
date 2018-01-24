// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/reset.css'
import 'font-awesome/css/font-awesome.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
import './mock/mock.js'



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {  // 判断该路由是否需要登录权限,some会从main开始遍历，返回true便不再执行，因此只要给main加权限就可以
    	var token = sessionStorage.getItem("token");//需要权限，读取token
    	Vue.prototype.$http.post('/api/token',{token:token}).then((r)=>{//验证token是否存在
    		if(r.data.message==true){

    			  next();
    		}else {
    			      sessionStorage.removeItem("token");//若不存在或者伪造，跳转登录页，并删除token
            next({
                path: '/', // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    	})
        
    }else {//不需要权限就不需要权限
        next();
    }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//