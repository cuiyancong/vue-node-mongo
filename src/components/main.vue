<template lang="html">
  <div class="main">
    <vheader :title="title" :showback="showback"></vheader>
    <div class="body">
      <div class="mainbanner">
        <img src="../assets/mainbanner.jpg" width="100%">
        <img :src="require('../assets/'+image+'.jpg')" alt="" class="headimg">
      </div>
      <div class="userInfo">
        {{gameName}}
        <span>{{position}}</span>
      </div>
      <div class="boxPart-1">
        <p>部落名：Desperado .</p>
        <p>部落ID：#JCCCUVUY</p>
        <p>部落简介：进部落请联系接待兼财务小姐姐</p>
      </div>
      <div class="boxPart-2">
        <div class="" @click="goArticle">
          精品攻略
        </div>
        <div class="" @click="goMemberList">
          部落成员表
        </div>
      </div>
      <div class="">

      </div>
      </div>

  </div>
</template>

<script>
import vheader from "./header"
export default {
  components:{
    vheader
  },
  data() {
    return{
      title:"Desperado",
      showback:false,
      image:1,
      gameName:"未命名",
      position:"未知",
    }
  },
  methods:{
    goArticle(){
      this.$router.push({path:"article"})
    },
    goMemberList(){
      this.$router.push({path:"/memberlist"})
    }
  },
  mounted(){
      if(!this.$store.state.userInfo.userId){
        this.$router.push({path:'/login'})
      }
      let token = this.$store.state.userInfo.userId
      this.$http.post('/api/getUserInfo',{token:token}).then(res=>{
        this.gameName = res.data.data.gameName
        this.position = res.data.data.position
        this.image = res.data.data.image
      })
  }
}
</script>

<style lang="css">
  .main{height: 100vh;padding-top: 44px;}
  .boxPart{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
  }
  .boxPart>div{width: 40%;}
  .leftbox p{line-height: 80px;margin: 0;text-align: center;}
  .leftbox{width: 40%;padding: 20px;background: pink;}
  .mainbanner{position: relative;}
  .headimg{width: 100px;border-radius: 50%;position: absolute;bottom: -20%;left: 50%;margin-left: -50px;}
  .userInfo{text-align: center;margin-top: 50px;font-size: 20px;border: bold;padding-left: 40px;}
  .userInfo span{font-size: 13px;background: #2085ff;color: #fff;padding: 3px 7px;border-radius: 15px;}
  .boxPart-1{margin: 20px;background: #e9eef4;border-top: 4px solid #1c66e9;border-radius: 1px;line-height: 35px;padding: 20px 40px;color: #0c0d0f;box-shadow: 3px 3px 3px rgba(0,0,0,.3)}
  .boxPart-2{display: flex;flex-direction: row;justify-content: space-between;margin: 20px;margin-top: 30px;}
  .boxPart-2>div{background: #e9eef4;border-radius: 1px;line-height: 35px;padding: 40px 0px;width: 45%;text-align: center;box-shadow: 3px 3px 3px rgba(0,0,0,.3)}
</style>
