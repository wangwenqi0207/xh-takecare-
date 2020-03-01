<template>
    <div class="user_info">
        <toolbar></toolbar>
        <div class="user_tit">
            填写参保人信息（1/2）
        </div>
        <div class="detail_info">
            <div class="detail_name">
                <p>参保人姓名</p>
                <p>{{user}}</p>
            </div>
             <div class="detail_name">
                <p>身份证号</p>
                <p>{{card}}</p>
            </div>
              <div class="detail_name">
                <p>性别</p>
                <p>{{sex}}</p>
            </div>
             <div class="detail_name">
                <p>手机</p>
                <p>{{detail_phone}}</p>
            </div>
            <!-- 在线版本中的性别验证来自于 上个提交信息页面对身份证的前后端校验 -->
            <div class="up_idcard">
                <p>请上传参保人身份证照片</p>
                <div class="user_info_idcard">
                    <input type="file" multiple="multiple" accept="image/*" 
                    ref="file" :value=photo @change="getFile" id='imgFile'/>
                    <input type="file" multiple="multiple" accept="image/*"
                    ref="file" :value=photo2 @change="getFile2" id='imgFile2'/>
                    <img :src=srcbox1 alt="" class="user_box1"/>
                    <img :src=srcbox2 alt="" class="user_box2"/>
                </div>
            </div>
        </div> 
        <div class="user_info_next" @click="userNext"> 
            下一步
        </div>
    </div>
</template>

<script>
import store from '../../store/index.js'
import { setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
import toolbar from "../../components/pages/toolbar"
//import {mapState,mapGetters,mapMutations} from 'vuex'
export default {
    components:{toolbar},
    store,
    name:"userinfo",
    data(){
        return{
            srcbox1:require("../../assets/img/card.svg"),
            srcbox2:require("../../assets/img/card.svg"),
            photo:"",
            photo2:"",
            filesName:"",
            filesName2:"",
            isLoading: false,
            user:"",
            card:"",
            detail_phone:"",
            sex:"",
        }
    },
    methods:{
        //点击下一步
        userNext(){
          if((this.filesName && this.filesName2) == ""){
            confirm("您还未上传身份证")
            this.$router.push('/userinfo')
            }else{
            this.$router.push('/linkman')
        }      
    },

       getFile (e) {
        let _this = this
        let files = e.target.files[0]
        if (!e || !window.FileReader) return  
        let reader = new FileReader()
        reader.readAsDataURL(files) 
        reader.onloadend = function () {
          _this.srcbox1 = this.result
        }
        this.filesName =files.name;
        //console.log(this.filesName);
//图片上传
            const formData = new FormData();
            formData.append("imgFile", files);
            formData.append("phoneNumber", this.detail_phone);
            this.$axios({
            url: this.GLOBAL.BASE_URL+`upload_file`,
            method: "post",
            data : formData
            })
            .then(data => {
            console.log(data.data.file)
            var filepic1 = data.data.file
            localStorage.setItem("filepic1",filepic1)
            }) 
            .catch(error=>{
                console.log(error);
                alert("上传失败，请重新上传")
             });
        
       },
       //思考一下此处是否可以整合成一个函数
       getFile2 (e) {
        let _this = this
        let files2 = e.target.files[0]
        if (!e || !window.FileReader) return  
        let reader = new FileReader()
        reader.readAsDataURL(files2) 
        reader.onloadend = function () {
          _this.srcbox2 = this.result
        }
        this.filesName2 =files2.name;
//图片上传
            const formData = new FormData();
            formData.append("imgFile", files2);
            formData.append("phoneNumber", this.detail_phone);
            this.$axios({
            url: this.GLOBAL.BASE_URL+`upload_file`,
            method: "post",
            data : formData
            })
            .then(data => {
            console.log(data.data.file)
            var filepic2 = data.data.file
            localStorage.setItem("filepic2",filepic2)
            })
            .catch(error=>{
                console.log(error);
                alert("上传失败，请重新上传")
             });
       },
    },

    computed:{
    //   ...mapState(['user',"card"]),
    },
    
    mounted(){
        var username = window.localStorage.getItem("userName")
        this.user = username
        var card = window.localStorage.getItem("idCard")
        this.card = card
        var phone = window.localStorage.getItem("phone")
        this.detail_phone = phone
        var sex = window.localStorage.getItem("sex")
        this.sex = sex
    }
}
</script>

<style scoped>
.user_info{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    background: #f6f5fa;
    box-shadow: 2px 3px 5px #ddd;
}
.user_tit{
    width: 100%;
    height: 1.7rem;
    font-size: .6rem;
    display: flex;
    align-items: center;
    padding-left: 7%;
    color: #448ff7;
}
.detail_info{
    background: white;
}
.detail_name{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.9rem;
    padding-left: .5rem;
    padding-right: .5rem;
}
.detail_name p{
    font-size: .65rem;
    color: #000000;
}

/* 上传身份证 */
.up_idcard{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px #ddd solid;
}
.up_idcard p{
    font-size: .5rem;
    margin-top: .5rem;
    color: #666;
}
.user_info_idcard{
    width: 100%;
    display: flex;
    
    justify-content: space-around;
    position: relative;
}
.user_info_idcard input{
    width: 44%;
    height: 4.5rem;
    margin-top: .5rem;
    margin-bottom: 1.2rem;
    z-index: 100;
    opacity: 0;
    /* filter:Alpha(opacity=0);
    background-color: rgba(0,0,0,0); */
}
.user_box1{
    position: absolute;
    width: 44%;
    height: 4.5rem;
    left: .5rem;
    top: .5rem;
    opacity: 1;
}
.user_box2{
    position: absolute;
    width: 44%;
    height: 4.5rem;
    right: .5rem;
    top: .5rem;
    opacity: 1;
}
.detail_name .standby_phone{
    font-size: .5rem;
}
.write_phone{
    font-size: .5rem;
    text-align: right;
}
.user_info_next{
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
.detail_phone{
  text-align: right;
  font-size: .65rem;
}
</style>


