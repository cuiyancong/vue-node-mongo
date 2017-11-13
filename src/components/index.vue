<template lang="html">
  <div class="index">
    <div class="rotatebox">
      <div class="row">
        <div class="index-item">
          <transition name="fade">
            <div class="index-item-1" v-show="show1"></div>
          </transition>
        </div>
        <div class="index-item">
          <transition name="fade">
            <div class="index-item-2" v-show="show2"></div>
          </transition>
        </div>
      </div>
      <div class="row">
        <div class="index-item">
          <transition name="fade">
            <div class="index-item-3" v-show="show3"></div>
          </transition>
        </div>
        <div class="index-item">
          <transition name="fade">
            <div class="index-item-4" v-show="show4"></div>
          </transition>
        </div>
      </div>
      <div class="circlebox rotateback" @click="goLogin">
        <img :src="userimage" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      userimage:require("../assets/"+Math.ceil(Math.random()*9)+".jpg"),
      show1:false,
      show2:false,
      show3:false,
      show4:false,
      show5:false
    }
  },
  methods:{
    goLogin(){
       this.$router.push({path:"/login"})
    },
    showImg1(){
      setTimeout(()=>{
        this.show1 = true
      },500)
    },
    showImg2(){
      setTimeout(()=>{
        this.show2 = true
      },1500)
    },
    showImg3(){
      setTimeout(()=>{
        this.show3 = true
      },2500)
    },
    showImg4(){
      setTimeout(()=>{
        this.show4 = true
      },3500)
    },

  },
  mounted() {
    this.showImg1()
    this.showImg2()
    this.showImg3()
    this.showImg4()
    setTimeout(()=>{
      this.goLogin()
    },5000)
  }

}
</script>

<style lang="css">
  .index{
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background:#000000;
  }
  .rotatebox{
    width:150%;
    height: 150%;
    position: absolute;
    top: -25%;
    left: -25%;
    transform-origin:50% 50%;
    transform: rotate(5deg);
  }
  .row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50%;
  }
  .index-item{
    display: inline-block;
    width: 50%;
    border: 1px solid #333333;
    margin: 0;
  }
  .circlebox{
    width: 100px;
    height: 100px;
    border: 1px solid #333;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    overflow: hidden;
    animation: breath .5s infinite;
  }
  .circlebox img{
    width: 100%;
    height: 100%;
  }
  .rotateback{
    transform-origin:50% 50%;
    transform: rotate(-5deg);
  }
  @keyframes breath {
    0%{
      transform:rotate(-5deg) scale(1);
    }
    25%{
      transform:rotate(-5deg) scale(1.01);
    }
    50%{
    transform:rotate(-5deg) scale(1.02);
    }
    75%{
      transform:rotate(-5deg) scale(1.01);
    }
    100%{
      transform:rotate(-5deg) scale(1);
    }
  }
  .index-item>div{width: 100%;height: 100%;}
  .index-item-1{background: url('../assets/index1.jpg') no-repeat;background-size:190%;background-position: center center;}
  .index-item-2{background: url('../assets/index2.jpg') no-repeat;background-size:180%;background-position: 20% 0%;}
  .index-item-3{background: url('../assets/index3.jpg') no-repeat;background-size:135%;background-position: 100% 0%;}
  .index-item-4{background: url('../assets/index4.jpg') no-repeat;background-size:125%;background-position: 0% 0%;}
  .fade-enter-active, .fade-leave-active {
      transition: opacity 1s ease-out;
    }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
