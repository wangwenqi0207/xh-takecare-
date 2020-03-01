<template>
<!-- 失能评估表选项 -->
    <div>
        <div class="optins_info" >
            <p>8.进食</p>
            <div class="bility_info_option">
                <van-radio-group v-model="radio">
                    <van-radio :name=item.value v-for="(item,index) in radios"
              :key="index" :label="item.label"  @click="getIndex(index)"
              >{{item.label}}
                    </van-radio>
                </van-radio-group>
            </div>
        </div>
         <div class="optins_info" >
            <p>9.头部清洁及洗浴</p>
            <div class="bility_info_option">
                <van-radio-group v-model="radio2" >
                    <van-radio :name=item.value v-for="(item,index) in radios2"
              :key="index" :label="item.label" @click="getIndex2(index)"
              >{{item.label}}
                    </van-radio>
                </van-radio-group>
            </div>
        </div>
         <div class="optins_info" >
            <p>10.穿衣</p>
            <div class="bility_info_option">
                <van-radio-group v-model="radio3" >
                    <van-radio :name=item.value v-for="(item,index) in radios3"
              :key="index" :label="item.label" @click="getIndex3(index)"
              >{{item.label}}
                    </van-radio>
                </van-radio-group>
            </div>
        </div>
         <div class="optins_info" >
            <p>11.大小便及如厕</p>
            <div class="bility_info_option">
                <van-radio-group v-model="radio4">
                    <van-radio :name=item.value v-for="(item,index) in radios4"
              :key="index" :label="item.label" @click="getIndex4(index)"
              >{{item.label}}
                    </van-radio>
                </van-radio-group>
            </div>
        </div>
         <div class="optins_info" >
            <p>12.移动</p>
            <div class="bility_info_option">
                <van-radio-group v-model="radio5" >
                    <van-radio :name=item.value v-for="(item,index) in radios5"
              :key="index" :label="item.label" @click="getIndex5(index)"
              >{{item.label}}
                    </van-radio>
                </van-radio-group>
            </div>
        </div>
         <div class="optins_info" >
            <p>13.疾病</p>
            <div class="bility_info_option">
                <van-radio-group v-model="radio6" >
                    <van-radio :name=item.value v-for="(item,index) in radios6"
              :key="index" :label="item.label" @click="getIndex6(index)"
              >{{item.label}}
                    </van-radio>
                </van-radio-group>
            </div>
        </div>
         <div class="bility_total">合计:{{score2}}分</div>
        <div class="bility_info">
            <p>是否确认申请失能评估</p>
            <el-radio-group v-model="getChoose" class="bility_sex" @change="Getscore">
                <el-radio-button :label=i.choose1  v-for="(i,index) in choose" :key="index">
                </el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>


<script>
var score;var index1;var index2;var index3;var index4;var index5;var index6;
export default {
    score,index1,index2,index3,index4,index5,index6,
    name:"bilityoptions",
    data(){
        return{
            score:"",
            radio: '',
            radio2: '',
            radio3: '',
            radio4: '',
            radio5: '',
            radio6: '',
            getChoose:"",
            choose:[
            {choose1:"是",value:"1"},
            {choose1:"否",value:"0"},
          ],
                 radios:[
                {
                   value:0 ,
                   label:"使用餐具将饭菜送入口、咀嚼、吞咽等步骤",
                },
                 {
                   value:5 ,
                   label:"使用餐具，在切碎、搅拌等协助下完成"
                },
                 {
                   value:10 ,
                   label:"使用餐具有困难，进食需要帮助"
                },
                 {
                   value:20,
                   label:"不能自主进食，或伴有吞咽困难，完全需要帮助（如喂食、鼻饲等）"
                },
            ],
            radios2:[
                {
                   value:0 ,
                   label:"独立完成",
                },
                 {
                   value:5 ,
                   label:"头部清洁能独立完成，洗浴需要协助"
                },
                 {
                   value:10 ,
                   label:"在他人协助下能完成部分头部清洁；洗浴需要帮助"
                },
                 {
                   value:20 ,
                   label:"完全需要帮助"
                },
            ],
            radios3:[
                {
                   value:0,
                   label:"独立完成",
                },
                 {
                   value:5 ,
                   label:"需要他人协助，在适当时间内完成部分穿衣"
                },
                 {
                   value:10 ,
                   label:"在他人协助下，仍需在较长时间内完成部分 穿衣"
                },
                 {
                   value:20 ,
                   label:"完全需要帮助"
                },
            ],
            radios4:[
                {
                   value:0 ,
                   label:"如厕不需协助",
                },
                 {
                   value:5 ,
                   label:"在适当提示和协助下能如厕或使用便盆"
                },
                 {
                   value:10 ,
                   label:"在很多提示和协助下尚能如厕或使用便盆"
                },
                 {
                   value:20 ,
                   label:"如厕完全需要帮助"
                },
            ],
            radios5:[
                {
                   value:0 ,
                   label:"独立完成",
                },
                 {
                   value:5,
                   label:"借助较小外力或辅助装置能完成站立、转移、行走、上下楼梯等"
                },
                 {
                   value:10 ,
                   label:"动则气急喘息，借助较大外力才能完成站立、转移、行走，不能上下楼梯"
                },
                 {
                   value:20 ,
                   label:"卧床不起；休息状态下时有气息喘息，难以站立；移动完全需要帮助"
                },
            ],
            radios6:[
                {
                   value:0 ,
                   label:"无帕金森病、中风后遗症等导致上述能力受限的疾病",
                },
                 {
                   value:10 ,
                   label:"有帕金森病、中风后遗症等导致上述能力受限的疾病之一"
                },
                 {
                   value:20 ,
                   label:"有帕金森病、中风后遗症等导致上述能力受限的疾病一种以上"
                },
            ],
        }
    },
    methods:{
        //是否确认 将选项传递给父元素
    Getscore(data){
           var choose = this.getChoose;
           if(this.getChoose=="是"){
               choose = "1"
           }else{
               choose = "0"
           }
        //    this.$emit("score",score);
           this.$emit("choose",choose);
           this.$emit("index1",index1);
           this.$emit("index2",index2);
           this.$emit("index3",index3);
           this.$emit("index4",index4);
           this.$emit("index5",index5);
           this.$emit("index6",index6);
        },
        //获取每个选项
    getIndex(index){
        index1 = index+1;
     },
    getIndex2(index){
        index2 = index+1;
     },
    getIndex3(index){
        index3 = index+1;
     },
    getIndex4(index){
        index4 = index+1;
     },
    getIndex5(index){
        index5 = index+1;
     },
    getIndex6(index){
        index6 = index+1;
     },
    },
    //实时监听分数变化 转为数字然后相加
    computed:{
        score2: function () {
        var _this = this;
        score =Number(_this.radio) + Number(_this.radio2) + Number(_this.radio3) + Number(_this.radio4)
        +Number(_this.radio5)+Number(_this.radio6);
        return score;
    }
    }
}
</script>


<style >
.optins_info{
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #ffffff;
    margin-top: .5rem;
}
.optins_info p{
    display: flex;
    align-items: center;
    padding-left: .4rem;
    box-sizing: border-box;
    font-size: .6rem;
    height: 2rem;
    border-bottom: 1px solid #acacac;
}
.bility_info_option{
    width: 100% !important;
    height: 7rem !important;
    background: #ffffff !important;
    padding-left: .4rem !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-around !important; 
    box-sizing: border-box;
}
.van-radio__label {
    font-size: .65rem !important; 
    color: #666 !important;
    margin-left: .5rem;
}
.van-radio__icon .van-icon{
    width: .9rem  !important;
    height: .9rem !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important; 
}
.van-radio__icon {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}
.van-icon-success:before{
    font-size: .9rem !important;
}
.van-radio{
    display: flex !important;
    align-items: center !important;
    margin-top: .3rem !important;
    box-sizing: border-box !important;
}
 .van-radio__label{
    line-height: 70px !important;
}
.van-radio__icon .van-icon{
    line-height: 70px !important;
}

.bility_total{
    width: 100%;
    height: 3rem;
    background: #ffffff;
    margin-top:.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .9rem;
    color: #448ff7;
    letter-spacing: .1rem;
}
.van-radio-group{
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-around !important;
}
.el-radio-group{
  display: flex  !important;
}
.bility_sex{
 margin-right: 1.7rem !important;
}
.el-radio-button, .el-radio-button__inner{
    width: 2rem !important;
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
</style>

