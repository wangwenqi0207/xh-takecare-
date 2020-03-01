<template>
    <div class="link_info">
      <toolbar></toolbar>
        <div class="link_tit">
            填写联系人信息（2/2）
        </div>
        <div class="link_detail_info">
            <div class="link_detail_name">
                <p>联系人姓名</p>
                <input type="text" maxlength="12" 
                v-model=linkman_name
                class="link_input" placeholder="(请填写)">
            </div>
            <!-- 性别选择 -->
            <div class="link_detail_name">
                <p>性别</p>
              <div class="user_sexbox" @change="Getsex">
                  <el-radio-group v-model="sexname.sextit">
                  <el-radio-button :label=i.sextit  v-for="(i,index) in sexname" :key="index">
                  </el-radio-button>
                  <!-- <el-radio-button :label=sexname></el-radio-button> -->
                </el-radio-group>
             </div>   
            </div>
             <div class="link_detail_name">
                <p>身份证号（选填）</p>
                <input type="text" maxlength="25" 
                v-model=contactIdcard
                class="link_input" placeholder="(请填写)">
            </div>
             <div class="link_detail_name">
                <p>手机号</p>
                <input type="text" maxlength="11" 
                v-model=linkman_phone
                class="link_input" placeholder="(请填写)">
            </div>
            <!-- 下拉选框 -->
             <div class="link_detail_name">
                <p>与参保人关系</p>
               <linkoptions @link="handlerMsg"></linkoptions>
            </div>
       </div>
       <!-- 选择地区 -->
        <div class="link_tit link_address">
            选择地区
        </div>
        <city @codeProvince="handlerMsg2" @codeCity="handlerMsg3" @codeArea="handlerMsg4"></city>
        <div class="link_tit link_address">
            联系地址（请填写具体真实信息）
        </div>
        <textarea class="linkman_textarea" maxlength="100" v-model=textarea></textarea>
        <div class="linkman_next" @click="linkNext"> 
            提交
        </div>
    </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import city from '../../components/pages/city'
import linkoptions from '../../components/pages/linkoptions'
import toolbar from "../../components/pages/toolbar"
import moment from 'moment'
import { setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
var username;var card;var phone;var sex;var filepic1;var filepic2;
export default {
    username,card,phone,sex,filepic1,filepic2,
    name:"linkman",
    components: { VDistpicker,city,linkoptions,toolbar },
    data(){
        return{
          sexname:[
            {sextit:"男"},
            {sextit:"女"},
          ],
          radio1: '',
          codeProvince:'',
          codeArea:"",
          codeCity:"",
          addInp :false,
          mask:false,
          textarea:"",
          linkman_name:"",
          linkman_phone:"",
          link_options:"",
          date:"",
          user:"",
          card:"",
          phone:"",
          contactIdcard:"",
        }
    },

    mounted(){
       username = window.localStorage.getItem("userName")
       this.user = username
       card = window.localStorage.getItem("idCard")
       this.card = card
       phone = window.localStorage.getItem("phone")
       this.detail_phone = phone
       filepic1= window.localStorage.getItem("filepic1")
       filepic2= window.localStorage.getItem("filepic1")
    },

    methods:{
      handlerMsg4(data){
        this.codeArea =data;
        //console.log("我是父页面区:"+this.codeArea)
      },
      handlerMsg3(data){
        this.codeCity =data;
        //console.log("我是父页面市:"+this.codeCity)
      },
      handlerMsg2(data){
        this.codeProvince = data;
        //console.log("我是父页面省:"+this.codeProvince)
      },
      handlerMsg(data){
        this.link_options = data;
      },
      toAddress(){
        this.mask = true;
        this.addInp = true;
      },
      //下一步
      linkNext(){
      var tokens=getCookie("token");
      var phoneNumber = window.localStorage.getItem("phone")
      //console.log(phoneNumber)
      if(this.textarea==""||this.linkman_name==""||this.linkman_phone=="" 
            ||this.link_options=="" ||this.sexname.sextit==""){
            alert("请输入所有填写内容");
             this.$router.push('/linkman');
        }
             
            // var url="http://insapi.tpddns.cn/insurance-intact-wechat-api/authed/assess_order_apply";
            var url=this.GLOBAL.BASE_URL+'authed/assess_order_apply'
                    var link_options = this.link_options;
                    var textarea =this.textarea;
                    var linkman_name = this.linkman_name;
                    var linkman_phone = this.linkman_phone; 
                    var city = this.city;
                    var contactIdcard = this.contactIdcard;
                    var applyPics = filepic1+","+filepic2;
                    var province = this.codeProvince;
                    // console.log(province)
                    var codeCity = this.codeCity;
                    // console.log(codeCity)
                    var codeArea = this.codeArea;
                    // console.log(codeArea)
                    // console.log("地址"+textarea)
                    // console.log("联系人姓名"+linkman_name)
                    // console.log("联系人电话"+linkman_phone)
                    // console.log("联系人性别"+sex)
                    // console.log("申请人姓名"+username)
                    // console.log("申请人身份证"+card)
                    // console.log("申请人电话"+phone)
                    // console.log("申请人身份证"+contactIdcard)
                    // console.log(tokens)
                    // console.log("我是图片路径"+applyPics)
                    this.$axios({
                    method:'post',
                    url:url,
                    params: {
                            act: "ApplyForOrder",
                            insName:username, 
                            insIdcard:card,
                            applyPics: applyPics,
                            contactName:linkman_name,
                            insPhone:phone, 
                            contactSex: sex,
                            contactIdcard: contactIdcard,
                            contactPhone: linkman_phone,
                            relationshipInsUser:link_options,
                            appointedAddress:textarea,
                            province:province ,
                            district:codeArea,
                            city:codeCity,
                            phoneNumber:phoneNumber,
                    
                    },
                    withCredentials: true,
                    crossDomain: true,
                    headers: {
                            'Content-Type':'application/x-www-form-urlencoded',
                            'token':tokens
                        }
                  }).then(data=>{
                    console.log(data)
                    if(data.data.errorCode ==0){
                      this.$router.push('/successful');
                    };                  
                   })
                  .catch(error=>{
                      console.log("提交失败");
                });
         //相当于路由跳转           
         //this.$router.push('/linkman');
},   
    Getsex(){
        //console.log(this.sexname.sextit)
        if(this.sexname.sextit=="男"){
            sex="M"
        }else{
           sex="F"
        }
        //console.log(sex)
      } 
    },
}
</script>


<style >
  li{
    list-style: none;
  }
.link_info{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    box-shadow: 2px 3px 5px #ddd;
}
.link_tit{
    background: #f6f5fa;
    width: 100%;
    height: 1.7rem;
    font-size: .6rem;
    display: flex;
    align-items: center;
    padding-left: 7%;
    color: #448ff7;
}
.link_detail_info{
    background: white;
}
.link_detail_name{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.9rem;
    border-bottom: 1px #acacac solid;
    padding-left: .5rem;
    padding-right: .5rem;
}
.link_detail_name p{
    font-size: .65rem;
    color: #000000;
}
.user_sexbox{
    display: flex;
}
/* 单选框 */
.el-radio-group{
  display: flex  !important;
}
.el-radio-group .el-radio-button__inner {
    width: 2rem !important;
    height: 1.2rem !important;
    display: flex !important;
    justify-content: center  !important;
    align-items: center  !important;
    font-size: .65rem !important;
    color: #409EFF;
}
 /* .el-radio  .el-radio__label{
    font-size: .65rem !important; 
}
.el-radio--medium.is-bordered{
    width: 2rem !important;
    height: 1.2rem !important;
    line-height: 1.2rem;
}
.el-radio--medium.is-bordered .el-radio__inner{
    width: .4rem !important;
    height: .4rem !important;
} */

/* 地区选择 */
/* .link_info .link_address{
    height: 1.4rem;
    color: rgb(140, 143, 142);
}
.van-picker-column__item{
    font-size: .65rem !important;
}
  .link_city{
    z-index: 200;
    position: relative;
  }
  .distpicker-address-wrapper{
    z-index: 200  !important;
    position: fixed !important;
    right: 0 !important;
    top:0;
    color: #666 !important;
  }
  .address-container{
    height: 100%;
  }
  .distpicker-address-wrapper .address-container ul{
    height: 19rem;
  }
  .distpicker-address-wrapper .address-header ul li.active{
    color: white;
    border-bottom:0;
  }
  .distpicker-address-wrapper .address-container ul li{
    font-size: .65rem !important;
    height: 1.2rem !important;
  }
  .link_city .city{
    font-size: .65rem;
  }
  .address-header ul{
    background: #409EFF;
  }
  .address-header ul li{
    color: white;
  }
  .mask{
    position: fixed;
    top:0;
    left: 0;
    background: black;
    opacity: .5;
    z-index: 100;
    width: 100%;
    height: 100%;
  } */

  /* textarea */
  .linkman_textarea{
    width: 100%;
    resize: none;
    border:none;
    border-bottom: 1px #acacac solid;
    font-size: .65rem;
    height: 3rem;
  }

  /* 提交 */
  .linkman_next{
    width: 100%;
    height: 2rem;
    background: #448ff7;
    color: #ffffff;
    font-size: .65rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left:0;
}
.link_input{
  text-align: right;
  font-size: .65rem;

}
</style>


