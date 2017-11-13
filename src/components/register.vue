<template lang="html">
  <div style="height:100%;position:relative">
    <div class="register">
      <div class="mask">
      </div>
    </div>
      <div class="loginbox">
          <img src="../assets/logo.png" width="100%">
          <div class="foot">
            <form class="ui large form">
              <div class="ui">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input type="text" name="name" v-validate="'required|min:6|max:20'" v-model="name" placeholder="请输入用户名">
                  </div>
                  <p v-if="errors.has('name')" class="errMsg">{{errors.first('name')}} </p>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input type="password" name="password" v-validate="'required|min:6|max:20'"  v-model="password" placeholder="请输入密码">
                  </div>
                  <p v-if="errors.has('password')" class="errMsg">{{errors.first('password')}} </p>
                </div>
                <div :class="btnclass"  @click="register" style="width:100%;margin-top:20px;">注册</div>
              </div>

              <div class="ui error message" v-if="errMsg">{{errMsg}}</div>

            </form>

            <div class="ui message">
              New to us? <router-link to="/login">登录</router-link>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      name:'',
      password:'',
      errMsg:"",
      btnclass:'ui red button'
    }
  },
  methods: {
    register(){

      let params = {
        name : this.name,
        password : this.password
      };
      this.$validator.validateAll().then(result=>{
        console.log(result)
        if(result){
          this.btnclass+=" shake"
          console.log(params,"pppp")
          this.$http.post('/api/createUser',params).then(res=>{
             this.btnclass="ui red button"
            if(res.status==200&&res.data.ret==1){
              console.log(res.data)
              console.log(res)
              this.$store.commit("setUserInfo",res.data)
              this.$router.push({path:"/registerForm"})
            }else {
              this.errMsg= res.data.msg
            }
          })
        }else {
          return
        }
      })
    }
  }
}
</script>

<style lang="css">
  #app>.grid{height: 100%;}
  .ui.form .error.message{display: block;}
  .banner img{width: 90%;margin:20px 5%}
  .register{height: 100%;background: url('../assets/bg2.jpg') no-repeat;background-size: 100%;background-position: center center;filter:blur(1px);
-webkit-filter:blur(1px);
-moz-filter:blur(1px);
-ms-filter:blur(1px);
-o-filter:blur(1px);
  position: absolute;top: 0;bottom: 0;left: 0;right: 0;
}
  .mask{height: 100%;background-color: rgba(255,255,255,.2);
    }
  .loginbox{width: 90%;margin: 0 5%;position: absolute;top: 0%;padding-top: 20%;position: relative;height: 100%}
  .foot{margin-top: 40px;}
  .register .ui.input input{background:transparent!important;border: none!important;border-radius: 0!important;border-bottom: 1px solid #333333!important;color: #333!important;}
  .ui.message{background:transparent;box-shadow:none;text-align: center;}
  .ui.message a{color: #9F3A38;}
  .ui.error.message{box-shadow: none!important;background:transparent!important;padding: .5em!important;font-size: 12px;}
  .shake{
      animation: shake 10s linear ;
  }
  .errMsg{text-align: center;font-size: 12px;color:#f22546;width: 100%;line-height: 24px;}
</style>
