<template>
    <div class="apply_for">
        <toolbar></toolbar>
        <div class="apply_info">
            <div class="my_apply">
                <p>我要申请</p>
                <li></li>
            </div>
            <form>
                <div class="apply_name">
                    <li>参保人姓名</li>
                    <input type="text" placeholder="请输入参保人姓名" maxlength="12" v-model=userName @input="typeofS" />
                </div>
                 <div class="apply_name">
                    <li>身份证号</li>
                    <input type="text" placeholder="请输入身份证号" maxlength="21" v-model=insIdcard @input="typeofN" />
                </div>
            </form>
            <li @click="next_step">
            <a id="next" class="next_step" >校验并下一步</a>
            </li>
        </div>
    </div>
</template>

<script>
import { setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
import toolbar from "../../components/pages/toolbar"
export default {
    components:{toolbar},
    name:"applyfor",
    data(){
        return{
            userName:"",
            insIdcard:"",
            sex:""
        }
    },
    //离开守卫
    beforeRouteLeave(to,form,next){
        if(to.path == '/homePage'||'/myasses'){
            next()
        }       
    },
    methods:{
        //点击下一步 表单验证 请求接口
        next_step(){
            if(this.userName==null||this.userName==""||this.insIdcard==null||this.insIdcard==""){
            confirm("请输入姓名或身份证");
            this.$router.push('/applyfor');
        }else{
             var _this =this;
            var insIdcard = _this.insIdcard;
            var act="checkIdCard";
            var token=getCookie("token");
            console.log(token);
            //console.log(idCard);
            this.$axios({
            method:'post',
            url:this.GLOBAL.BASE_URL+'check_idcard',
            params: {
                  act:act,
                  insIdcard:insIdcard
             },
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'token': token
            },
            withCredentials:true,
            crossDomain: true,
        }).then(data=>{
                console.log(data)
                // var str = data.data.split(",")[0]+"}";	
                // var str2 = JSON.parse(str);
                if(data.data.errorCode==0){
                    localStorage.setItem("userName",this.userName)
                    localStorage.setItem("idCard",this.insIdcard)
                    this.$router.push('/userinfo');
                }
                if(data.data.errorCode==1100){
                    alert("您已经提交过信息")
                }
                // var sex1= "{"+data.data.split(",")[2]+"}";
                // var sex2 = JSON.parse(sex1);
                // var sex3 = sex2.sex
                if(data.data.sex == "F"){
                    this.sex = "女"
                }else if(data.data.sex == "M"){
                    this.sex = "男"
                }
                localStorage.setItem("sex",this.sex)
         })
        .catch(error=>{
            console.log(error);
            alert("您提交失败");
            this.$router.push('/applyfor');
        });
            } 
        },
        //限制用户输入类型
        typeofS(){
            let reg =/^[\u4E00-\u9FA5]{1,12}$/;
            if(!reg.test(this.userName)){
                this.userName=""
                return false;
            } 
        },
        typeofN(){
            var reg = /^[0-9a-zA-Z]+$/;
            if(!reg.test(this.insIdcard)){
                this.insIdcard=""
                return false;
            }  
        },

        checkId(){
           
        }
    },
}
</script>

<style scoped>
/* @import "../../assets/css/apply_for.css"; */
li{
    list-style: none;
}
.apply_for{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f6f5fa;
    box-shadow: 2px 3px 5px #ddd;
}

.apply_info{
    width: 90%;
    height: 10rem;
    background: white;
    margin:1rem auto;
    box-shadow:2px 3px 5px #ddd;
    border-radius: 20px;
    border:1px solid #dddddd;
}
.my_apply{
    width: 100%;
    /* height: 17%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.my_apply p{
    font-size: .65rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    color: #000000;
}
.my_apply li{
    list-style: none;
    width: 90%;
    height: 5px;
    background: #ddd;
    
}
.apply_name{
    width: 90%;
    height: 2rem;
    margin:0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #dddddd;
}
.apply_name li{
    font-size: .65rem;
    color: #000000;
}
.apply_name input{
    text-align: right;
    font-size: .65rem;
}
.next_step{
    width: 87%;
    height: 2rem;
    background: #448ff7;
    font-size: .73rem;
    color: white;
    border-radius: 15px;
    display: block;
    margin: 1rem auto;
    text-align: center;
    line-height: 2rem;
}
</style>


