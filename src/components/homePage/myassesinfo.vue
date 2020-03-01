<template>
    <div class="myassinfo">
        <div class="state">
            {{orderStatus}} >
        </div>
        <div class="grey_tit">
            参保人信息
        </div>
        <div class="myassinfo_info">
            <p>参保人姓名</p>
            <span>{{insName}}</span>
        </div>
         <div class="myassinfo_info">
            <p>性别</p>
            <span>{{sex}}</span>
        </div>
         <div class="myassinfo_info">
            <p>年龄</p>
            <span>{{age}}</span>
        </div>
         <div class="myassinfo_info">
            <p>身份证号</p>
            <span>{{insIdCard}}</span>
        </div>
        <div class="myassinfo_info">
            <p>手机号</p>
            <span>{{insPhone}}</span>
        </div>
        <div class="grey_tit">
            联系人信息
        </div>
         <div class="myassinfo_info">
            <p>联系人姓名</p>
            <span>{{contactName}}</span>
         </div>
         <div class="myassinfo_info">
            <p>性别</p>
            <span>{{contactSex}}</span>
        </div>
         <div class="myassinfo_info">
            <p>身份证号</p>
            <span>{{contactIdcard}}</span>
        </div>
         <div class="myassinfo_info">
            <p>手机号</p>
            <span>{{contactPhone}}</span>
        </div>
        <div class="myassinfo_info">
            <p>与参保人关系</p>
            <span>{{relationshipInsUser}}</span>
        </div>
         <div class="grey_tit">
            联系地址
        </div>
        <div class="myassinfo_info">
            <p>{{city}}</p>
        </div>
        <div class="myassinfo_info">
            <p>{{appointedAddress}}</p>
        </div>
         <div class="grey_tit">
            工单信息
        </div>
        <div class="myassinfo_info">
            <p>工单编号</p>
            <span>{{orderNo}}</span>
        </div>
        <div class="myassinfo_info">
            <p>提交时间</p>
            <span>{{createdTime}}</span>
        </div>
    </div>
</template>


<script>
import { setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
export default {
    name:"myassesinfo",
        data(){
            return{
             insName:"",
             sex:"",
             age:"",
             insIdCard:"",
             orderStatus:"",
             orderNo:"",
             createdTime:"",
             insPhone:"",
             appointedAddress:"",
             contactName:"",
             contactSex:"",
             contactIdcard:"",
             relationshipInsUser:"",
             city:"",
             contactPhone:"",
             id:this.$route.params.orderNo,
            }
        },
        mounted(){
            //页面初始化请求当前id工单数据 在模板中展示
                var _this =this;
                var orderNo =_this.id;
                var tokens=getCookie("token");
                //console.log(orderNo);
                var url=this.GLOBAL.BASE_URL+"user_apply_order";
                    this.$axios({
                    method:'post',
                    url:url,
                    withCredentials: true,
                    crossDomain: true,
                    params: {
                        act :"getUserApplyOrder",
                        orderNo:orderNo,
                        },
                    headers: {
                            'Content-Type':'application/x-www-form-urlencoded',
                            'token':tokens
                        }
                  }).then(data=>{
                    console.log(data.data.dataList)
                    //    console.log(data.data.dataList[0][0].contactName)
                    //    console.log(data.data.dataList[0][0].contactSex)
                    //    console.log(data.data.dataList[0][0].contactIdcard)
                    //    console.log(data.data.dataList[0][0].insPhone)
                    //    console.log(data.data.dataList[0][0].relationshipInsUser)
                    //    console.log(data.data.dataList[0][0].city)
                   //     console.log("我是联系人电话"+data.data.dataList[0][0].contactPhone)
                       if(data.data.errorCode==0){
                           //console.log(data.data.dataList[0])
                           this.insName =data.data.dataList[1][0].insName;
                           var sex =data.data.dataList[1][0].sex;
                           this.age =data.data.dataList[1][0].age;
                           this.insIdCard =data.data.dataList[1][0].insIdCard;
                           this.contactPhone=data.data.dataList[0][0].contactPhone;
                           var orderStatus =data.data.dataList[1][0].orderStatus;
                           	switch(orderStatus) {
						case -1:
							orderStatus = "参保人取消";
							break;
						case -2:
							orderStatus = "拒接单";
							break;
						case -3:
							orderStatus = "系统取消";
							break;
						case 0:
							orderStatus = "待分配";
							break;
						case 1:
							orderStatus = "已完成";
							break;
						case 2:
							orderStatus = "待接单";
							break;
						case 3:
							orderStatus = "待评估";
							break;
						case 4:
							orderStatus = "正在评估";
							break;
						case 5:
							orderStatus = "评估师A完成评估";
							break;
						case 6:
							orderStatus = "已评估";
							break;
						case 8:
							orderStatus = "待指派";
							break;
						case 10:
							orderStatus = "待审核";
							break;
						default:
							orderStatus = "未分配";
							break;
                    }
                           this.orderStatus = orderStatus;
                           this.orderNo =data.data.dataList[1][0].orderNo;
                           this.createdTime =data.data.dataList[1][0].createdTime;
                           this.insPhone = data.data.dataList[0][0].insPhone;
                           if(sex=="M"){
                            this.sex ="男"
                            }else{
                            this.sex ="女"
                            }
                           this.appointedAddress=data.data.dataList[0][0].appointedAddress;
                           this.contactName=data.data.dataList[0][0].contactName;
                           var contactSex=data.data.dataList[0][0].contactSex;
                           if(contactSex=="M"){
                            this.contactSex ="男"
                            }else{
                            this.contactSex ="女"
                            }
                           this.contactIdcard=data.data.dataList[0][0].contactIdcard;
                           var relationshipInsUser=data.data.dataList[0][0].relationshipInsUser;
                           switch(relationshipInsUser) {
						case 0:
							relationshipInsUser = "自己";
							break;
						case 1:
							relationshipInsUser = "子女";
							break;
						case 2:
							relationshipInsUser = "父母";
							break;
						case 3:
							relationshipInsUser = "配偶";
							break;
						case 4:
							relationshipInsUser = "兄弟姐妹";
							break;
						case 5:
							relationshipInsUser = "朋友";
							break;
						case 6:
							relationshipInsUser = "其他";
							break;
						default:
							break;
                    }
                           this.relationshipInsUser=relationshipInsUser;
                           this.city=data.data.dataList[0][0].city;
                       }         
                   })
                  .catch(error=>{
                      console.log("获取信息失败");
                      
                });          
    }
}
</script>

<style scoped>
/* .myassinfo{
    width: 100%;
    overflow-y: scroll;
} */
.state{
    width: 100%;
    height: 3rem;
    font-size: 1.2rem;
    background: #448ff7;
    color: white;
    display: flex;
    align-items: center;
    text-indent: 1rem;
}
.grey_tit{
    background: #eeeeee;
    height: 1.4rem;
    color: rgb(140, 143, 142);
    font-size: .55rem;
    display: flex;
    align-items: center;
    text-indent: 1rem;
}
.myassinfo_info{
    width: 100%;
    height: 1.7rem;
    background: white;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    font-size: .65rem;
    align-items: center;
}
.myassinfo_info p{
    margin-left: .6rem;
}
.myassinfo_info span{
    margin-right: .6rem;
}
</style>
