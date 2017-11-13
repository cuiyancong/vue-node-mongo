import Vue from 'vue'
import Vuex from 'vuex'

let storage = window.localStorage
export const localStorage = {
  set: function(key, value) {
    var mydata = storage['user'] ? JSON.parse(storage['user']) : {};
    mydata[key] = value;
    window.localStorage.setItem('user', JSON.stringify(mydata));
    return mydata;
  },
  get: function(key) {
    var mydata = storage['user'] ? JSON.parse(storage['user']) : {};
    return mydata[key];
  },
  getAll: function() {
    //读取所有
    var mydata = storage['user'] ? JSON.parse(storage['user']) : {};
    return mydata;
  },
  remove: function(key) {
    //移除
    var mydata = storage['user'] ? JSON.parse(storage['user']) : {};
    delete(mydata[key]);
    window.localStorage.setItem('user', JSON.stringify(mydata));
    return mydata;
  },
  clear: function() {
    //清除对象
    delete(storage['user']);
    //window.localStorage = storage;
    window.localStorage.setItem('user', JSON.stringify({}));
    return storage['user'];
  }
}
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {
      userId: localStorage.get("userId"),
      userName: localStorage.get("userName"),
      gameName: "",
      phone: "",
      sex: "",
      position: "",
    },
    href: ""
  },
  mutations: {
    //设置cookie方法
    setUserInfo: (state, data) => {
      state.userInfo.userId = data.token
      state.userInfo.userName = data.name
      localStorage.set("userId", data.token)
      localStorage.set("userName", data.name)
    },
    setUserDetail: (state, data) => {
      state.userInfo.gameName = data.gameName
      state.userInfo.phone = data.phone
      state.userInfo.sex = data.sex
      state.userInfo.position = data.position
      state.userInfo.image = data.image
    },
    changeHref: (state, href) => {
      state.href = href
    }
  }
})
