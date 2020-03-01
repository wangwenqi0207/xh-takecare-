<template>
<!--自评表 -->
    <div class="bility_form">
        <div class="bility_info">
            <p>1.参保人姓名</p>
            <input type="text" maxlength="12" placeholder="请输入姓名" v-model="name">
        </div>
        <div class="bility_info">
            <p>2.身份证号码</p>
            <input type="text" maxlength="21" placeholder="请输身份证" v-model="idcard">
        </div>
        <div class="bility_info">
            <p>3.省市区</p>
            <city @codeProvince="handlerMsg2" @codeCity="handlerMsg3" @codeArea="handlerMsg4"></city>
        </div>
        <div class="bility_textarea">
            <textarea name="" id="" placeholder="请输详细地址" cols="3" v-model="address"></textarea>
        </div>
          <div class="bility_info link_name">
            <p>4.联系人姓名</p>
            <input type="text" maxlength="12" placeholder="请输入姓名" v-model="linkname">
        </div>
          <div class="bility_info">
            <p>5.联系人身份证号码</p>
            <input type="text" maxlength="21" placeholder="请输身份证" v-model="linkcard">
        </div>
         <div class="bility_info">
            <p>6.联系人电话</p>
            <input type="text" maxlength="12" placeholder="请输联系人电话" v-model="linkNum">
        </div>
         <div class="bility_info">
            <p>7.与参保人关系</p>
            <linkoptions @link="handlerOptions"></linkoptions>
        </div>
        <bilityoptions  @choose="handlerChoose"
        @index1="index1" @index2="index2" @index3="index3" @index4="index4" @index5="index5" @index6="index6"
        ></bilityoptions>
        <div class="bility_explain">
            <p>说明：自评分值超过40分（含），可提出评估申请，自评分值小于40分的，
              不建议评估申请。  
            </p>
            <p>
              申明：此表由参表人自评打分，仅作为是否申请失能评估的参考依据，最终结果以正式评估结论为准。   
            </p>
        </div>
         <div class="bility_next"  @click="getList"> 
            提交
        </div>
    </div>
</template>


<script>
import VDistpicker from 'v-distpicker'
import city from '../../components/pages/city'
import linkoptions from '../../components/pages/linkoptions'
import bilityoptions from '../../components/pages/bilityoptions'
import { setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
export default {
    name:"bilityform",
    components: { VDistpicker,city,linkoptions,bilityoptions},
    data(){
        return{
            city:'点击选择（点击蓝色标题可回退）',
            addInp :false,
            mask:false,
            link_options:"",
            ScoreValue:"", 
            ChooseValue:"", 
            citys:"" ,
            address:"",
            name:"",
            idcard:"",
            address:"",
            linkname:"",
            linkcard:"",
            linkNum:"",
            q1:"",
            q2:"",
            q3:"",
            q4:"",
            q5:"",
            q6:"",
            codeProvince:'',
            codeArea:"",
            codeCity:"",
        }
    },
    //进入该路由时判断如果有token进入自评表 如果没有token，转到登录页面
     beforeRouteEnter:(to,from,next)=>{
          var tokens=getCookie("token");
           if(tokens.length>0){
               next()
           }else{
               alert("请您先登录")
               next('/login')
           }
          
    },
    methods:{
        //省市区
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
        toAddress(){
        this.mask = true;
        this.addInp = true;
      },
      // 省市区三级联动
      selected(data){
        this.mask =false;
        this.addInp = false;
        this.city = data.province.value + ' ' + data.city.value +' ' + data.area.value
      },
      closeCity(){
        this.mask = false;
        this.addInp = false;
      },
    //    handlerScore(data){
    //     this.ScoreValue = data;
    //     //console.log(this.ScoreValue);
    //   },
    //是否确认失能评估
      handlerChoose(data){
        this.ChooseValue = data;
        console.log(this.ChooseValue)
      },
      handlerCity(data){
          this.citys = data;
      },
      //与参保人关系
      handlerOptions(data){
          this.link_options = data;
      },
      //6道题的用户选择
      index1(data){
          this.q1 = data;
          console.log(this.q1);
      },
       index2(data){
          this.q2 = data;
          console.log(this.q2);
      },
       index3(data){
          this.q3 = data;
          console.log(this.q3);
      },
       index4(data){
          this.q4 = data;
          console.log(this.q4);
      },
       index5(data){
          this.q5 = data;
          console.log(this.q5);
      },
       index6(data){
          this.q6 = data;
          console.log(this.q6);
      },
      //评估表提交 将用户所选信息发送
      getList(){
          if(this.name=="" ||this.idcard=="" ||this.address=="" ||this.linkname=="" ||this.link_options==""||
            this.linkcard=="" || this.linkNum=="" || this.citys=="" ||this.q1=="" ||this.q2==""||
            this.q3=="" || this.q4=="" || this.q5==""|| this.q6==""|| this.ChooseValue=="" 
            ){
                alert("请输入全部信息")
                this.$router.push('/bilityform');
                return false;
          }else{
              //console.log("通过")
               var url=this.GLOBAL.BASE_URL+"ins_self_assessment_update";
                    var insName = this.name;
                    var insIdcard =this.idcard;
                    var address = this.address;
                    var contactName = this.linkname;
                    var contactIdcard = this.linkcard;
                    var contactPhone = this.linkNum;
                    var city = this.citys;
                    var relationshipInsUser = this.link_options;
                    var q1 = this.q1;
                    var q2 = this.q2;
                    var q3 = this.q3;
                    var q4 = this.q4;
                    var q5 = this.q5;
                    var q6 = this.q6;
                    var confirmApply =this.ChooseValue;
                    var province = this.codeProvince;
                    console.log(province)
                    var codeCity = this.codeCity;
                    console.log(codeCity)
                    var codeArea = this.codeArea;
                    console.log(codeArea)   
                    // console.log("申请人姓名"+insName)
                    // console.log("申请人身份证"+insIdcard)
                    // console.log("联系人姓名"+contactName)
                    // console.log("联系人身份证"+contactIdcard)
                    // console.log("联系人电话"+contactPhone)
                    // console.log("城市"+city)
                    // console.log("地址"+address)
                    // console.log("是否申请 :"+confirmApply)
                    // console.log("关系"+relationshipInsUser)
                    // console.log(q1,q2,q3,q4,q5,q6)
                    this.$axios({
                    method:'post',
                    url:url,
                    params: {
                            act: "InsSelfAssessment",
                            insName:insName, 
                            insIdcard:insIdcard,
                            province:province ,
                            district:codeCity,
                            city:codeArea,
                            street:"",
                            address:address,
                            contactName:contactName,
                            contactIdcard:contactIdcard,
                            contactPhone:contactPhone,
                            relationshipInsUser:relationshipInsUser,
                            q1:q1,
                            q2:q2,
                            q3:q3,
                            q4:q4,
                            q5:q5,
                            q6:q6,
                            confirmApply:confirmApply
                    },
                    withCredentials: true,
                    crossDomain: true,
                    headers: {
                            'Content-Type':'application/x-www-form-urlencoded',
                        }
                  }).then(data=>{
                      if(data.data.errorCode==0){
                        this.$router.push('/bilitysucc');
                      }
                    console.log(data)                  
                   })
                  .catch(error=>{
                      alert("您未提交成功")
                      this.$router.push('/bilityform');
                      console.log("提交失败");
                });
          }
      },
    }
}
</script>


<style >
li{
    list-style: none;
}
.bility_form{
    /* position: fixed; */
    width: 100%;
    box-sizing: border-box;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f6f5fa;
    box-shadow: 2px 3px 5px #ddd;
    overflow-x: hidden;
}
.bility_info{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #acacac;
    background: #ffffff;
    align-items: center;
}
.bility_info p,.bility_info input{
    font-size: .6rem;
}
.bility_info p{
    margin-left: .4rem;
}
.bility_info input{
    text-align: right;
    margin-right: .4rem;
}
/* 地区选择 */

/* textarea */
 .bility_textarea textarea{
     width: 100%;
     height: 4rem;
     border:none;
     font-size: .65rem;
     text-align: right;
     resize: none;
     padding-right: .4rem;
 }
 .bility_textarea{
     margin-top: .5rem;
     border-top: 1px solid #acacac;
 }
 .link_name{
     margin-top: .3rem;
 }


.bility_explain p{
    font-size: .55rem;
    margin:1rem;
    line-height: .8rem;
    letter-spacing: .05rem;
}
.bility_next{
    width: 100%;
    height: 2rem;
    background: #448ff7;
    color: #ffffff;
    font-size: .65rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>


