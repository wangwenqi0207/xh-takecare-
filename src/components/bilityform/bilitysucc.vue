<template>
    <div>
        <div class="success_img">
           <img src="../../assets/img/success_icon.png" alt="">
        </div>
        <div class="success_content">
            <h1>提交成功</h1>
            <p>请等待工作人员与您联系，确认信息</p>
        </div>
        <router-link to="/" tag="div" class="return_homePages">确认</router-link>
    </div>
</template>


<script>
export default {
    name:"bilitysucc"
}
</script>


<style scoped>
.success_img{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}
.success_content{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
}
.success_content h1{
    font-weight: 500;
    font-size: 1.1rem;
    color: #000;
    letter-spacing:.1rem;
}
.success_content p{
    font-size: .65rem;
    color: #666;
    letter-spacing:.05rem;
    margin-top:.3rem;
}
.return_homePages{
    width: 6rem;
    border: 1.5px solid #409EFF;
    font-size: .65rem;
    color: #409EFF;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    position: fixed;
    bottom: 3rem;
    left:50%;
    margin-left:-3rem;
}
</style>




