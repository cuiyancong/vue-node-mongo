<template lang="html">
  <div class="registerSuccess">
    <vheader :title="title" :showback="showback"></vheader>
    <img src="../assets/heart.png" width="150px;">
    <h3>欢迎加入Desperado部落</h3>
    <p class="sextext" v-if="sex">{{sex}}</p>
    <div class="ui button" type="button" name="button" @click="goDesperado">进入部落</div>
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
      title:"注册成功",
      showback:"false",
      sex:"可爱的小姐姐"
    }
  },
  methods:{
    goDesperado(){
      this.$router.push({path:'/main'})
    }
  },
  mounted(){
    if(this.$store.state.userInfo.sex == "男"){
      this.sex='帅气的小哥哥'
    }else {
      this.sex = "可爱的小姐姐"
    }
  }
}
</script>

<style lang="css">
  .registerSuccess{
    padding-top: 44px;
    height: 100%;width: 100%;
    background: url("../assets/successbg.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .registerSuccess h3{text-align: center;}
  .registerSuccess .button{background: #f22546;width: 50%;margin: 0 25%;margin-top: 50px;color: #fff;}
  .sextext{text-align: center;line-height: 100px;}
</style>
