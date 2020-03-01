<template>
    <div>
       <el-select v-model=link_options placeholder="请选择" @change="sendOption">
         <el-option v-for="item in options" :key="item.value"
                    :label="item.label" :value="item.value"
         >
         </el-option>
       </el-select>
      <!--<button @click="sendOption">子按钮</button>-->
    </div>
</template>


<script>
export default {
    name:"linkoptions",
    data(){
        return{
          options: [{
          value: '0',
          label: '自己'
        }, {
          value: '1',
          label: '子女'
        }, {
          value: '2',
          label: '父母'
        }, {
          value: '3',
          label: '配偶'
        }, {
          value: '4',
          label: '兄弟姐妹'
        },{
          value: '5',
          label: '朋友'
        },{
          value: '6',
          label: '其他'
        }],
        link_options:"",
        }
    },
     methods:{
         sendOption(){
            this.$emit("link",this.link_options)
         },
     },
}
</script>

<style>
 .user_sexbox label{
    display: flex  !important;
    justify-content: center !important;
    align-items: center !important;
} 
.el-input__inner{
    font-size: .6rem  !important;
    height: 1.5rem !important;
    padding-top: .3rem !important;
}
.el-select-dropdown__item{
    font-size: .6rem  !important;
}
.el-input--suffix .el-input__inner{
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}
.el-select-dropdown__item{
    display: flex !important;
    align-items: center !important;
    height: 1.2rem !important;
}
.el-select-dropdown el-popper{
    height: 7rem !important;
}
.el-select .el-input .el-select__caret{
    font-size: .5rem !important;
}
.el-input__suffix-inner{
    display: flex  !important;
    align-items: center  !important;
}
.el-input__suffix{
    right:5% !important;
}
.el-radio__inner::after {
    width: .3rem !important;
    height: .3rem !important;
}
.el-input__icon{
    height: 1.2rem !important;
}
.el-input--suffix input{
    text-align: left !important;
}
.el-select-dropdown__wrap{
    max-height: 8rem  !important;
}
</style>

