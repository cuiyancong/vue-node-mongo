<template lang="html">
  <div class="vheader">
    <div class="backbutton" @click="goback" v-if="showback"><i class="angle left icon"></i></div>
    <div class="" >{{title}}</div>
  </div>
</template>
<script>
export default {
  props: {
      title: '' ,
      showback:""
  },
  methods:{
    goback(){
      this.$router.goBack()
    }
  }
}
</script>

<style lang="css">
  .vheader{height: 44px;width: 100%;background: #f22546;line-height: 44px;color: #fff;font-size: 16px;text-align: center;position: fixed;top: 0;z-index: 10000}
  .backbutton{font-size: 20px;font-weight: bold;margin: 0 10px;position: absolute;left: 0;}
</style>
