<template>
<div>
    <div class="login">
    <h1 class="login_title">请使用手机号登录</h1>
    <form >
      <div class="login_input">
          <input class="phone_number" type="text" :placeholder=getnumber v-model=phoneNumber />
      </div>
       <div class="login_input login_input2">
          <input class="check_code" type="text" placeholder="请输入验证码" v-model=checkCode />
          <input class="get_code" type="button" v-bind:class="{ code_active: isActive}" v-model=get_code @click="get_login" :disabled="disabled"/>
      </div>
      <div class="login_next" @click="loginNext">
        <input type="button" value="下一步" />
      </div>
    </form>
    </div>
</div>
</template>


<script>
import {mapState,mapGetters,mapMutations} from 'vuex'
import { setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
// import moment from 'moment'
 var showMsg;
 var token;
export default {
  name: 'login',
  showMsg,token,
  data(){
      return{
        phoneNumber:"",
        getnumber:"请输入手机号",
        get_code:"获取验证码",
        disabled:false,
        time:"",
        isActive:false,
        checkCode:"",
        getLogin:false,
        isLogin:false,
        usertoken:"",
        date:""
      }
  },
  methods:{
    //点击获取验证码
     get_login(){
              var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if(this.phoneNumber==''){
                   alert("请输入手机号码");
                   this.getLogin=false
                }else if(!reg.test(this.phoneNumber)){
                    alert("手机格式不正确");
                    this.getLogin=false
                }else{
                    this.time=60;
                    this.disabled=true;
                    //console.log("手机号验证成功")
                    this.timer();
                    this.sendCode();
                    this.phoneNumber =this.phoneNumber
                    this.getLogin=true
                  }
               },
     //倒计时
      timer() {
                if (this.time > 0) {
                    this.isActive=true;
                     this.time--;
                     this.get_code=this.time+"秒";
                     setTimeout(this.timer, 1000);
                } else{
                     this.time=0;
                     this.get_code="获取验证码";
                     this.disabled=false;
                     this.isActive=false;
                }
            },

      //获取验证码请求发起
               sendCode() {
                    // var url="http://insapi.tpddns.cn/insurance-intact-wechat-api/send_veri_code";
                    var url=this.GLOBAL.BASE_URL+"send_veri_code";
                    var phoneNumber = this.phoneNumber;
                    this.$axios({
                      method:'post',
                      url:url,
                      params: {
                        params:{
                        phoneNumber: phoneNumber
                        }
                        },
                      withCredentials: true,
                      crossDomain: true,
                      headers: {
                              'Content-Type':'application/x-www-form-urlencoded',
                              'X-Requested-With':'XMLHttpRequest',
                        }
                  }).then(data=>{
                    console.log("请求成功")
                    var getToken = data.data.errorMsg.split(":");
                    token = getToken[1];
                    //console.log(typeof token2)
                    showMsg = getToken[0];
                    //this.checkCode = showMsg; 
                   //console.log(token)
                    if (data.data.errorCode == 0) {
                       setCookie("token",token,7);

                  } else {
                    if (data.data.errorMsg == null || data.data.errorMsg == "") {
                      alert("获取验证码失败！");
                      this.isLogin==false;
                    } else {
                     console.log(data);
                    }
                  } 
                  })
                  .catch(error=>{
                      console.log(error);
                      this.isLogin==false;
                    });

                  localStorage.setItem("phone",phoneNumber)
               },
              //点击下一步时 判断验证码是否正确 正确登录则保存cookie
               loginNext(){ 
                //6位数随机数
                var str= Math.random()*100;
                var str1=str.toFixed(6)
                //console.log(str1);
                 //时间戳
                var time = new Date().getTime();
                //console.log(time);
                //获取设备信息
                var version;
                checkPlatform()
                function checkPlatform(){
                  if(/android/i.test(navigator.userAgent)){
                    version = "android"
                  }
                  if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                    version = "iOS"
                  }
                  if(/Win64/i.test(navigator.userAgent)){
                    version = "Win64"
                  }
                  if(/Win32/i.test(navigator.userAgent)){
                    version = "Win32"
                  }
        }
              var appId = version+ '-'+ time +'-'+ str1;
              console.log(appId);
                 var tokens=getCookie("token");
                 //console.log(tokens);
                 var veriCode = this.checkCode
                 var phoneNumber = this.phoneNumber
                    this.$axios({
                    method:'post',
                    // url:'http://192.168.1.16:9005/insurance-intact-wechat-api/register_login',
                    url:this.GLOBAL.BASE_URL+'register_login',
                      params: {
                        params:{
                        veriCode:veriCode,
                        phoneNumber:phoneNumber,
                        appId:appId
                          }
                        },
                      headers: {
                      'Content-Type':'application/x-www-form-urlencoded',
                      'token': tokens
                    },
                    withCredentials:true,
                    crossDomain: true,
                }).then(data=>{
                  console.log(data.data.errorCode)
                  if(data.data.errorCode="0"){
                    if(showMsg ==this.checkCode){  
                    this.$router.push('/homePage'); 
                  }else{
                   alert("请您先登录或输入正确的验证码")
                   return false;
                  }
                  }
                                     
                })
                .catch(error=>{
                  alert("您登陆失败")
                  console.log(error);
    });                           
              }     
},

    mounted(){
      
      var _this =this;
      var tokens=getCookie("token");
      console.log(tokens);
      this.$axios({
      method:'post',
      // url:'http://192.168.1.16:9005/insurance-intact-wechat-api/checkToken',
      url:this.GLOBAL.BASE_URL+'checkToken',
      withCredentials:true,
      crossDomain: true,
      headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'token': tokens,
        }
  }).then(function(data){
      console.log(data);
      let resdata = data.request.response.split(",");
      //console.log(resdata[0]);
      let resdata2 =resdata[0].split("{");
      //console.log(resdata2[1]);
      let resdata3 = "{" +resdata2[1]+ "}"
      let realutCode = JSON.parse(resdata3);
      let realutCode2 = realutCode.resultCode
      console.log(data);
      if(realutCode2=="000000"){
        setTimeout(function(){
          // alert('登录成功，欢迎进入')
          _this.$router.push('/homePage');
    },0)        
    }else{
        return
    }
  })
  .catch(function (error) {
     _this.isLogin=false;
      console.log(error);
    });
    }   
}
</script>


<style scoped>
 @import "../../assets/css/login.css";
</style>

