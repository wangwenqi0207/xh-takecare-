<template>
    <div class="toolbar" @click="goback">
        <img src="../../assets/img/arrowL2.png" alt="">
    </div>
</template>


<script>
export default {
    name:"toolbar",
    methods:{
    //点击按钮回到上一步
    goback(){
      this.$router.go(-1)
  }
}
}
</script>


<style scoped>
.toolbar{
    width: 100%;
    height: 1.5rem;
    background: #ffffff;
    display: flex;
    align-items: center;
}
.toolbar img{
    width: .4rem;
    margin-left: 3%;
}
</style>

