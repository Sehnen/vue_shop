import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/home"
import Welcome from "@/components/Welcome";
import User from "@/components/user/User";
import Rights from "@/components/roles/Rights";
import Roles from "@/components/roles/Roles";
import * as path from "path";
Vue.use(VueRouter)

const routes = [
  //  路由重定向
  {path:'/',redirect:'/login'},
  {path:'/login',component:Login},
  {path: '/home',component: Home,
  redirect: '/home/welcome',children:[
      {path:'welcome',component:Welcome},
      {path: 'users',component: User},
       {path: 'rights',component: Rights},
          {path: 'roles',component: Roles }
    ]},

]

const router = new VueRouter({
  routes
})
//挂载导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path==='/login') return next()
  //获取token，假如自己修改token会出现问题吗？
  const  tokenStr=window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
      next()
})
export default router
