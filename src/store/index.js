import Vue from 'vue'
import Vuex from 'vuex'
import { setCookie,getCookie,delCookie} from '../assets/js/cookie'
Vue.use(Vuex)

 
//定义仓库数据
const state = {
    user:window.localStorage.getItem("userName"),
    card:window.localStorage.getItem("idCard"),
    usertoken:getCookie("token")
}
 
//判断仓库数值
const getters = {
      
}
//定义仓库方法
const mutations = {
    
}
 
//固定格式，需要导出的公共数据
export default new Vuex.Store({
    state,getters,mutations
})