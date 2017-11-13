<template lang="html">
  <div class="memberlist">
      <vheader :title="title" :showback="showback"></vheader>
      <div class="listPart">
        <div class="ui cards">
          <div class="card" v-for="item in memberlist">
            <div class="content">
              <img class="right floated mini ui image" :src="require('../assets/'+item.image+'.jpg')">
              <div class="header">昵称：{{item.gameName}}</div>
              <div class="meta" style="margin-top:10px;">职位：{{item.position}} </div>
              <div class="description">
                <p>性别：{{item.sex}}</p>
                <p >电话：{{item.phone}} </p>
               </div>
            </div>
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
    return {
      title:"部落成员表",
      showback:true,
      memberlist:[]
    }
  },
  mounted(){
    this.$http.get("/api/getList").then(res=>{
      if(res.status==200&&res.data){
        this.memberlist = res.data
      }
    })
  }
}
</script>

<style lang="css">
  .listPart{padding-top: 70px;}
  .listPart .ui.cards{justify-content: center;}
</style>
