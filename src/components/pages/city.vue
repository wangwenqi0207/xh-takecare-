<template>
   <div>
          <p @click="clickCity" class="link_city">{{chooseCity}}</p> 
      <div class="boxcity" v-if="showCity">
       <div class="chooseTit">
          <p @click="chooseProvince" v-show='tit1'>{{chooseTit1}}</p>
          <p @click="chooseCity2" v-show='tit2'>{{chooseTit2}}</p>
          <p v-show='tit3'>{{chooseTit3}}</p>
       </div>
     <div  class="citys">
       <div @click="getCity" class="province">
         <ul v-show="showProvince">
          <li v-for="item in provinceL" :key="item.regionId" @click="getProvince(item)">{{item.regionName}}</li>
        </ul>
        <ul v-show="showCity2">
          <li v-for="item in cityL" :key="item.regionId" @click="getCity2(item)">{{item.regionName}}</li>
        </ul>
         <ul v-show="showarea">
          <li v-for="item in areaL" :key="item.regionId" @click="getarea(item)">{{item.regionName}}</li>
        </ul>
       </div>
     </div>
     </div>
     <div class="mask" v-show="mackShow" @click="closeMask"></div> 
</div>
</template>


<script>
import { setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
export default {
    name:"city",
    data(){
      return{
      chooseCity:"点击我选择",
      selected    : '',
      citySelected: '',
      areaSelected: '',
      provinceL   : [],
      cityL       : [],
      areaL       : [],
      city        : [],
      provinceName: '',
      cityName    : '',
      areaName    : '',
      showProvince:true,
      showCity:false,
      showCity2:false,
      showarea:false,
      chooseTit1:"省",
      chooseTit2:"市",
      chooseTit3:"区",
      tit1:true,
      tit2:false,
      tit3:false,
      mackShow:false,
      province:"",
      Nextcity:"",
      district:"",
      } 
    },
     methods:{
       //点击省 省出来 市隐藏
       chooseProvince(){
        this.showProvince = true;
        this.showCity2 = false;
    },
    //点击市 省和区隐藏 市出现
    chooseCity2(){
      this.showProvince = false;
      this.showCity2 = true;
      this.showarea = false;
    },
    //点击选择省市区
    clickCity(){
      this.showCity = true;
      this.mackShow = true;
    },
    getCity(){
      for(var item of this.provinceL){
          this.provinceName = item.regionName;
          //this.regionId = item.regionId
       }
    },
    //获取省
    getProvince(item){
       this.province = item.regionName
       var codeProvince = item.regionId+"-"+item.regionName
       //console.log(codeProvince);
      // console.log(item.regionId);
       this.$axios({
      url:this.GLOBAL.BASE_URL+'get_regions?parentId='+item.regionId,
      method: 'get'
      }).then(res=>{
        //console.log(res)
         this.cityL        = res.data;
         this.citySelected = this.cityL[0].regionId;
         this.showProvince = false;
         this.showCity2= true;
         this.tit2 = true;
      })

      this.areaL = [];
      this.$emit("codeProvince",codeProvince);
    },
    //获取市
    getCity2(item){
        this.Nextcity = item.regionName
        var codeCity = item.regionId+"-"+item.regionName
        //console.log(codeCity);
        //console.log(item.regionId);
      this.$axios({
       url:this.GLOBAL.BASE_URL+'get_regions?parentId='+item.regionId, 
       method: 'get'
      }).then(res=>{
        //console.log(res)
         this.areaL        = res.data;
         this.areaSelected = this.areaL[0].regionId;
         this.showarea = true;
         this.showCity2= false;
         this.tit3 = true;
         this.$emit("codeCity",codeCity);
      })
    },
    //获取区
    getarea(item){
        this.district = item.regionName;
        var codeArea = item.regionId+"-"+item.regionName
        //console.log(codeArea);
        var totalCity = this.province+"," + this.Nextcity +"," +this.district;
        this.chooseCity =totalCity;
        //console.log(item.regionId);
        this.showCity = false;
        this.mackShow = false;
        this.$emit("codeArea",codeArea);
    },

    closeMask(){
      this.showCity = false;
      this.mackShow = false;
    }
  },
   created() {
         var url=this.GLOBAL.BASE_URL+"get_regions?parentId=0";
                    this.$axios({
                      method:'get',
                      url:url,
                      withCredentials: true,
                      crossDomain: true,
                      data:"data",
                      headers: {
                              'Content-Type':'application/x-www-form-urlencoded',
                        }
                  }).then(res=>{
                   //console.log(res.data);
                   this.provinceL = res.data;
                   

                  })
                  .catch(error=>{
                      console.log(error);
                });
  },
}
</script>

<style>
 @import "../../assets/css/city.css";
</style>

