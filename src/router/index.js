import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import login2 from '@/components/login/login2'
import homePage from '@/components/homePage/homePage'
import applyfor from '@/components/apply_for/apply_for'
import userinfo from '@/components/user_info/user_info'
import linkman from '@/components/linkman/linkman'
import successful from '@/components/successful/successful'
import myasses from '@/components/homePage/my_assessment'
import myassesinfo from '@/components/homePage/myassesinfo'
import bilityform from '@/components/bilityform/bilityform'
import bilitysucc from '@/components/bilityform/bilitysucc'
import bilityoptions from '@/components/pages/bilityoptions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{
        title:'登录',
        index:1
    }
    },
    {
      path: '/login',
      name: 'login2',
      component: login2,
      meta:{
        title:'登录2',
        index:1
    }
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage,
      meta:{
        title:'首页',
        index:2
    },
    },
    {
      path: '/applyfor',
      name: 'applyfor',
      component: applyfor,
      meta:{
        title:'我要申请',
        index:3
    },
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo,
      meta:{
        title:'用户信息',
        index:4
    }
    },
    {
      path: '/linkman',
      name: 'linkman',
      component: linkman,
      meta:{
        title:'联系人信息',
        index:5
    }
    },
    {
      path: '/successful',
      name: 'successful',
      component: successful,
      meta:{
        title:'提交成功',
        index:6
    }
    },
    {
      path: '/myasses',
      name: 'myasses',
      component: myasses,
      meta:{
        title:'我的评估1',  
    },   
    },
    {
      path: '/myassesinfo/:orderNo',
      name: 'myassesinfo',
      component: myassesinfo,
      meta:{
        title:'我的评估2', 
        index:7 
    },   
    },
    {
      path: '/bilityform',
      name: 'bilityform',
      component: bilityform,
      meta:{
        title:'失能评估表', 
        index:8
    },  
    },
    {
      path: '/bilitysucc',
      name: 'bilitysucc',
      component: bilitysucc,
      meta:{
        title:'成功提交失能评估表', 
        index:9
    },   
    },
  ]
})
//new一个路由实例
const router = new Router({
  routes: []
})

