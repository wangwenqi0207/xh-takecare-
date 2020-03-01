// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$axios= axios
import'./rem'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

import { RadioGroup, Radio } from 'vant';
import { setCookie,getCookie,delCookie} from '../src/assets/js/cookie'
Vue.use(RadioGroup);
Vue.use(Radio);

import { Area } from 'vant';
Vue.use(Area);

import { Popup } from 'vant';
Vue.use(Popup);
import { Picker } from 'vant';

Vue.use(Picker);

//引入配置全局变量
import global_ from '../config/global'
Vue.prototype.GLOBAL = global_;


//地区选择
// import VDistpicker from 'v-distpicker'
// Vue.component('v-distpicker', VDistpicker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


router.beforeEach((to,from,next)=>{
  let token = getCookie("token");
  console.log(token.length);
  if(to.path == '/' || to.path == '/bilityform' || to.path == '/login' || token.length>0){
    next();
  }
  else{
    alert('您还没有登录，请先登录');
    next('/');
  }
})
