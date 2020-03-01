<template>
    <div class="myasses">
        <div class="my_assess"  v-for="(i,index) in orderList"  :key="index" v-show=showList>
            <div class="order_number">
                <div class="order_number_left">
                    <img src="../../assets/img/pg_icon.png" alt="">
                    <p>订单编号：{{i.orderNo}}</p>
                </div>
                <p>{{i.orderStatus}}</p>
            </div>
            <router-link v-bind:to="/myassesinfo/ +i.orderNo" class="order_info_box" tag="div">
               <img src="../../assets/img/head_default.png" alt="">
               <div class="order_info">
                    <p>{{i.insName}},{{i.sex}},{{i.age}}岁</p>
                    <p>{{i.insIdCard}}</p>
                    <p class="myasses_times">{{i.createdTime}}</p>
               </div>
            </router-link>
        </div>
        <h1 class="myAssesNo" v-show=NoList >您暂无提交数据</h1>
    </div>
</template>


<script>
import { setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
export default {
    name:"myasses",
    data(){
        return{
            orderStatus:"",
            createdTime:"",
            showList:true,
            NoList:false,
            datalist:"",
            orderList:[
                {
                orderNo:"",insName:"",insIdCard:"",sex:"",age:"",orderStatus:"",createdTime:"",
            },
            ]
        }
    },
            mounted(){
                //页面一打开拉取工单信息
                //console.log(this.orderList[1].orderNo)
                var phoneNumber = window.localStorage.getItem("phone")
                //console.log(phoneNumber)
                var _this =this;
                var tokens=getCookie("token");
                var url=this.GLOBAL.BASE_URL+"user_apply_order_list";
                    this.$axios({
                    method:'post',
                    url:url,
                    withCredentials: true,
                    crossDomain: true,
                    params: {
                        act :"getOrderList",
                        pageSize : "1000",
                        pageNo:"1",
                        phoneNumber: phoneNumber
                        },
                    headers: {
                            'Content-Type':'application/x-www-form-urlencoded',
                            'token':tokens
                        }
                  }).then(data=>{
                    //console.log(data.data.errorCode)
                     if(data.data.errorCode="0"){
                        this.orderList =data.data.dataList;
                    for(var p in this.orderList){
                        if(this.orderList[p].sex=="M"){
                        this.orderList[p].sex ="男"
                        }else{
                        this.orderList[p].sex ="女"
                        }
                     var orderStatus = data.data.dataList[0].orderStatus;
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
                    this.orderList[p].orderStatus = orderStatus;  
                }       
                        this.NoList=false;
                    }                     
                   })
                  .catch(error=>{
                      console.log("获取信息失败");
                      this.showList=false;
                      this.NoList=true;
                });          
    },
           
}
</script>

<style scoped>
.myasses{
    /* position: fixed; */
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f6f5fa;
    box-shadow: 2px 3px 5px #ddd;
}
.my_assess{
    background: #ffffff;
    width: 100%;
    height: 5.7rem;
    margin-bottom:.2rem;
}
.order_number{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1.7rem;
    border-bottom: 1px solid #ccc;
}
.order_number img{
    width: .7rem;
    height: .7rem;
    margin-left: .5rem;
    margin-right: .5rem;
}
.order_number p{
    font-size: .65rem;
    margin-right: .5rem;
}
.order_number_left{
    display: flex;
}
.order_info_box{
    width: 100%;
    height: 4rem;
    display: flex; 
    align-items: center;
}
.order_info_box img{
    width: 3rem;
    height: 3rem;
    margin-left: 1rem;
    margin-right: 1rem;
}
.order_info{
    display: flex;
    flex-direction: column;
}
.order_info p{
    font-size: .65rem;
    margin-top: .2rem;
    letter-spacing: .02rem;
}
.order_info .myasses_times{
    font-size: .5rem;
    color: #666;
    letter-spacing: .03rem;
}

/* 数据不存在时 */
.myAssesNo{
    font-size: .9rem;
    text-align: center;
}
</style>


