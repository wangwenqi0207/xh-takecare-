<template>
  <div id="app"> 
     <transition :name="transitionName">
    <router-view/>
     </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName: 'slide-right',
    }
  },
  methods:{
     
  },
   watch: {//使用watch 监听$router的变化
            $route(to, from) {
                //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
                if(to.meta.index > 0){
                    if( to.meta.index < from.meta.index){
                        this.transitionName = 'slide-right';
                    }else{
                        this.transitionName = 'slide-left';
                    }
                }else if(to.meta.index == 0 && from.meta.index > 0){
                    this.transitionName = 'slide-right';
                }

                //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
                /*if( to.meta.index < from.meta.index){
                      this.transitionName = 'slide-right';
                }else{
                      this.transitionName = 'slide-left';
                }*/
            }
        }
}
</script>

<style>
/*移动端样式公共配置*/
article,aside,dialog,footer,header,section,footer,nav,figure,menu{display:block}
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, figure, section, legend, textarea, p, blockquote, th, td, input, select, textarea, button { margin: 0; padding: 0 }
body{font-family:"Microsoft Yahei",Arial,Helvetica,sans-serif;background-color: #fff;color:#424242;}
h1,h2,h3,h4,h5,h6{font-weight: normal;}
table{border-collapse:collapse;border-spacing:0}
ul,ol,dd,dt,dl{list-style-type:none;}
a{color:#333;text-decoration: none;-webkit-touch-callout: none;-webkit-user-select: none;}
a,input,select{-webkit-tap-highlight-color: transparent;-webkit-appearance: none;-moz-appearance: none;-webkit-border-radius: 0;}
input,img{border:none;padding:0;}
i,em{font-style:normal;}
:focus{outline: none}


/*iphone6*/
/*@media(min-device-width:375px)and(max-device-width:667px)and(-webkit-min-device-pixel-ratio:2){body{font-size:14.5px;}}*/
/*iphone6plus*/
/*@media(min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){body{font-size:15.5px;}}*/


/*placeholder css*/
::-moz-placeholder{ font-family: "Microsoft YaHei"}              
::-webkit-input-placeholder{ font-family: "Microsoft YaHei"}    
:-ms-input-placeholder{ font-family: "Microsoft YaHei"}

    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all .2s;
        position: absolute;
        width:100%;
        left:0;
    }
    .slide-right-enter {
        transform: translateX(-100%);
    }
    .slide-right-leave-active {
        transform: translateX(100%);
    }
    .slide-left-enter {
        transform: translateX(100%);
    }
    .slide-left-leave-active {
        transform: translateX(-100%);
    }
</style>
