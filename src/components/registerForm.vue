<template lang="html">
  <div class="registerForm">
    <vheader :title="title" :showback="showback"></vheader>
    <div class="chooseImageBox">
      <h5>请选择一个头像：</h5>
      <div class="imageBoxItem" v-for="key in imgArray"  >
        <img :src="require('../assets/'+key+'.jpg')" alt="" width="100%" height="100%" :class="{active:activekey == key}" @click="chooseImg(key)">
      </div>
    </div>
    <form class="ui large form">
          <div class="ui">
            <div class="inline fields">
              <div class="field">
                <!-- <i class="user icon"></i> -->
                <label>游戏名：</label>
                <input type="text" name="gameName" v-validate="'required'" placeholder="请输入游戏名" v-model="gameName">
              </div>
              <p v-if="errors.has('gameName')" class="errMsg">{{errors.first('gameName')}} </p>
            </div>
            <div class="inline fields">
              <div class="field">
                <label>手机号：</label>
                <input type="tel" name="phone"  placeholder="请输入手机号" v-model="phone" v-validate="'required|mobile'">
              </div>
              <p v-if="errors.has('phone')" class="errMsg">{{errors.first('phone')}}</p>
            </div>
            <div class="inline fields">
              <div class="field">
                <label>性  别：</label>
                <select @change="changeSex">
                  <option value="" selected="true">请选择性别</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
            </div>
            <div class="inline fields">
              <div class="field">
                <label>职  位：</label>
                <select @change="changePos">
                  <option value="" selected="true">请选择职位</option>
                  <option value="首领">首领</option>
                  <option value="副首领">副首领</option>
                  <option value="长老">长老</option>
                  <option value="成员">成员</option>
                </select>
              </div>
            </div>
            <div class="errMsg" v-show="errMsg">{{errMsg}}</div>
            <button class="ui red button" style="width:100%;margin-top:20px;" @click="finishform" type="button">确定</button>
          </div>

      </form>
      <!-- <div class="column is-12">
          <label class="label" for="email">Email</label>
          <p :class="{ 'control': true }">
              <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
          </p>
      </div> -->
  </div>
</template>

<script>
import vheader from "./header"
import { Validator } from 'vee-validate';

export default {
  components:{
    vheader
  },
  data(){
    return{
      title:"完善信息",
      showback:"false",
      name:this.$store.state.userInfo.userName,
      gameName:"",
      phone:"",
      sex:"",
      position:"",
      formdone:"disabled",
      errMsg:"",
      imgArray:[1,2,3,4,5,6,7,8,9],
      activekey:0
    }
  },
  methods:{
    finishform(){
      var that = this
      console.log(this.name)
      this.$validator.validateAll().then(result=>{
        if (result&&that.sex&&that.position&&that.activekey!=0) {
          let params = {
            name:that.name,
            gameName:that.gameName,
            phone:that.phone,
            sex:that.sex,
            position:that.position,
            image:that.activekey
          }
          console.log(params)
          this.$http.post("/api/userInfo",params).then(res=>{
            console.log(res)
            if(res.status==200&&res.data){
              this.$store.commit("setUserDetail",res.data)
               this.$router.push({path:"/registerSuccess"})
            }
          })
        }else {
          that.errMsg = "请完整填写信息"
          if(that.activekey ==0){
            that.errMsg = "请选择一个头像"
          }
        }
      })

    },
    changeSex(ele){
      this.sex = ele.target.value;

    },
    changePos(ele){
      this.position = ele.target.value;
    },
    chooseImg(key){
      this.activekey = key
    }
  },
  computed:{
  },
  mounted(){
    console.log(this.name)
    if(!this.$store.state.userInfo.userId){
      this.$router.push({path:'/login'})
    }
    console.log(this.$store.state.userInfo.userName)
  }
}
</script>

<style lang="css">
.registerForm{padding-top: 44px;}
  .registerForm .ui.red.button{
    width: 80%!important;margin: 20px 10%!important;
  }
  .registerForm .ui.form .inline.fields{
    width: 100%!important;margin: 20px 0!important
  }
  .registerForm .ui.form .inline.fields label{width: 20%;}
  .registerForm .ui.form .inline.fields .field{width: 100%;padding:0 10%;}
  .chooseImageBox{padding: 30px;}
  .registerForm .ui.form .inline.fields input,.registerForm .ui.form .inline.fields select{width: 70%!important}
  .imageBoxItem{width: 33%;display: inline-block;border-radius: 50%;overflow: hidden;}
  .active{border: 3px solid #f22546;border-radius: 50%;}
  .errMsg{text-align: center;font-size: 12px;color:#f22546;width: 100%;line-height: 24px;}
</style>
