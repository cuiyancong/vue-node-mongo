// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index.js'
import zh from 'vee-validate/dist/locale/zh_CN';
import VeeValidate, {
  Validator
}
from 'vee-validate';

Validator.localize('zh_CN', zh); //引入中文
// 修改中文包
const dictionary = {
  zh_CN: {
    messages: {
      required: () => '该项为必填项',
      min: (n, e) => '该项最少' + e[0] + '位长度',
      max: (n, e) => '该项最多' + e[0] + '位长度'
    }
  }
};
Validator.updateDictionary(dictionary); //更新字典
Validator.extend('mobile', {
  messages: {
    zh_CN: field => '请输入正确的手机号'
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(
      value)
  }
});
Vue.use(VeeValidate, {
  locale: 'zh_CN'
});
Vue.use(Vuex)
Vue.config.productionTip = false
  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
