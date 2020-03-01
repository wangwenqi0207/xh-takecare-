<template>
    <div class="homepage">
        <toolbar></toolbar>
        <div class="homePage_header"></div>
        <ul class="homePage_assess">
            <router-link to="/applyfor" class="homePage_apply" tag="li">
                <img src="../../assets/img/apply_evaluate_icon.png" alt="" class="apply_icon">
                <p>
                    <span>申请评估</span>
                    <img src="../../assets/img/arrowR.png" alt="">
                </p>
            </router-link>
            <router-link to="/myasses" class="homePage_apply" tag="li">
                <img src="../../assets/img/my_evaluate_icon.png" alt="" class="apply_icon">
                <p>
                    <span>我的评估</span>
                    <img src="../../assets/img/arrowR.png" alt="">
                </p>
            </router-link>
        </ul>
        <div class="homepage_telphone" @click="cllOut">
            <img :src=src alt="">
            <h3>热线电话</h3>
        </div>
        <div class="homepage_dialog" v-show = isCall>
            <div class="homepage_remind">
                <h3>提示</h3>
                <p>400-365-099</p>
            </div>
            <div class="call_out">
                <a href="#" class="call_off" @click="callOff">取消</a>
                <a href="tel:400365099">呼叫</a>
            </div>
        </div>
        <div class="homepage_mask" v-show = isCall>
                
        </div>
    </div>
</template>


<script>
import toolbar from "../../components/pages/toolbar"
import { setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
export default {
    components:{toolbar},
    name: 'homePage',
    data(){
        return{
            isCall:false,
            src:require("../../assets/img/hotline_icon.png"),
        }
    },
//     created() {
//     console.log('GLOBAL.BASE_URL',this.GLOBAL.BASE_URL)
//   },
    methods:{
        cllOut(){
            this.isCall=true;
        },
        callOff(){
            this.isCall=false;
        }
    },
    mounted(){
        var url=this.GLOBAL.BASE_URL+"customer_contact_login";
        var phoneNumber = window.localStorage.getItem("phone")
        var tokens=getCookie("token");
                    this.$axios({
                      method:'post',
                      url:url,
                      params: {
                        act :"AppLogin",
                        phoneNumber: phoneNumber
                        },
                      withCredentials: true,
                      crossDomain: true,
                      headers: {
                              'Content-Type':'application/x-www-form-urlencoded',
                              'X-Requested-With':'XMLHttpRequest',
                              'token':tokens
                        }
                  }).then(data=>{
                    console.log(data)
                  })
                  .catch(error=>{
                      console.log(error);
                    });
    }
}
</script>

<style scoped>
/* @import "../../assets/css/homePage.css"; */
/* .homepage{
    width: 100%;
    height: 100%;
} */
/* 背景图 */
.homePage_header{
    width: 100%;
    height: 7.5rem;
    background: url("../../assets/img/banner_img.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 1rem;
}

/* 评估 */
.homePage_assess{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

.homePage_assess li{
    width: 40%;
    height: 6rem;
    border: 1.5px solid #dddddd;
}

.homePage_apply{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.homePage_apply .apply_icon{
    width: 35%;
    height: 37%;
    margin-bottom: 13%;
}
.homePage_apply p{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.homePage_apply p span{
    font-size:  0.58rem;
}
.homePage_apply p img{
    height: 0.5rem;
    margin-left: 9.5%;
}

/* 热线电话  定位元素如何居中*/ 
.homepage_telphone{
    position: fixed;
    bottom: 6.5%;
    left:50%;
    margin-left:-45%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 1.8rem;
    border: 1px solid #448ff7;
    border-radius: 10px;
}
.homepage_telphone img{
    margin-right: .3rem;
    width: 1rem;
}
.homepage_telphone h3{
    font-size: .72rem;
}

/* 弹窗 */
.homepage_dialog{
    background: rgba(255, 255, 255, .95);
    position:fixed;
    width: 70%;
    height: 5rem;
    z-index:99;
    border-radius: 18px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin:auto;
    animation: scaleDraw 0.5s ease-in ;
}
@keyframes scaleDraw {  
    0%{
        transform: scale(1.2);  
    }
    100%{
        transform: scale(1);
    }
}
.homepage_remind{
    width: 100%;
    height: 60%;
    border-bottom: 1px solid #dddddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.homepage_remind h3{
    font-size: .75rem;
}
.homepage_remind p{
    font-size: .55rem;
    margin-top: .3rem;
}
.call_out{
    width: 100%;
    height: 40%;
    display: flex;
}
.call_out a{
    font-size:.69rem;
    width: 50%;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #448ff7;
    font-weight: 600;
}
.call_out .call_off {
    border-right: 1px solid #dddddd;
    font-weight: 100;
}

/* 蒙版 */
.homepage_mask{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 90;
    background: #000000;
    opacity: .5;
}
</style>

