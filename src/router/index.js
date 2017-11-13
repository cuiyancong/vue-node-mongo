import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import VueResource from 'vue-resource';
import login from '@/components/login'
import register from '@/components/register'
import userCenter from '@/components/userCenter'
import main from '@/components/main'
import registerForm from "@/components/registerForm"
import registerSuccess from "@/components/registerSuccess"
import article from "@/components/article"
import articleDetail from "@/components/articleDetail"
import memberlist from "@/components/memberlist"
Router.prototype.goBack = function() {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/register',
    name: 'register',
    component: register
  }, {
    path: '/userCenter',
    name: "userCenter",
    component: userCenter
  }, {
    path: '/main',
    name: "main",
    component: main,
  }, {
    path: '/registerForm',
    name: "registerForm",
    component: registerForm
  }, {
    path: "/registerSuccess",
    name: "registerSuccess",
    component: registerSuccess
  }, {
    path: "/article",
    name: "article",
    component: article
  }, {
    path: "/articleDetail/:href",
    name: "articleDetail",
    component: articleDetail
  }, {
    path: "/memberlist",
    name: "memberlist",
    component: memberlist
  }]
})
