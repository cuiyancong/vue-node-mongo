<template lang="html">
  <div class="article">
    <vheader :title="title" :showback="showback"></vheader>
    <!-- <div class="loading">
      <img src="../assets/load.gif" alt="" v-if="loading">
    </div> -->
    <div class="article-box">
      <div class="" v-for="item in list">
        <div class="article-item" @click="goDetail(item.href)" >
          {{item.title}}
        </div>
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
  data(){
    return{
      title:"游戏攻略",
      showback:true,
      list:[],
      loading:true
    }
  },
  methods:{
    goDetail(href){
      this.$router.push({name:"articleDetail",params:{href:href}})
    }
  },
  mounted(){
    this.$http.get("/api/article").then((res)=>{
      if(res.status&&res.data.length){
        this.loading = false
        this.list = res.data
      }
    })
  }
}
</script>

<style lang="css">
.article{background: url("../assets/mainbg.gif") repeat;padding-top: 44px;min-height: 100vh}
  .article-item{
    text-align: left;
    line-height: 40px;
    padding-left: 20px;
    border: 1px solid #fff
  }
  .article-box{

  }
  .loading{}
</style>
