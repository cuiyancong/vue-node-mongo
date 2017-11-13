<template lang="html">
  <div class="articleDetail">
    <vheader :title="title" :showback="showback"></vheader>
    <div class="detail-content" v-html="html">

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
      title:"攻略详情",
      showback:true,
      html:""
    }
  },
  mounted(){
      let href = this.$route.params.href
      this.$http.post("/api/articleDetail",{href:href}).then(res=>{
      if(res.status == 200&&res.data){
        this.html=res.data
      }
    })
  }
}
</script>

<style lang="css">
.articleDetail{background: url("../assets/mainbg.gif") repeat;padding-top: 44px;}
.articleDetail img{width: 100%!important;height: auto!important;}
.detail-content{padding: 20px;}
</style>
