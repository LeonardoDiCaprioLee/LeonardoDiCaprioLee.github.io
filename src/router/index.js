import Vue from 'vue'
import VueRouter from 'vue-router'
import lixiang from './xiang/index.js'
import { add } from './xiang/ones.js'
import whjRouter from "./whj_router"
import whj from './whj';

Vue.use(VueRouter)
import jun from './jun'
import jun1 from './jun1'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/details",
    name: "Details",
    component: () => import("../views/jie/details")
  },
  // 特色课搜索页面
  {
    path: "/search",
    name: "search",
    component: () => import("../views/jie/search")
  },
  // 我的消息
  {
    path: "/myMessage",
    name: "myMessage",
    component: () => import("../views/jie/myMessage")
  },
  {
    path: "/noMsg",
    name: "noMsg",
    component: () => import("../views/jie/noMsg")
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: '/index',
    children: [
      ...lixiang,
      ...whjRouter,
      ...jun,
    ],
  },
  // 外部路由登录、优惠券
  ...add,
  // 外部路由
  ...jun1,
  // 外部路由
  ...whj
]


console.log(routes);
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(localStorage.getItem('token')) {
    to.meta.rou == 2
    next()
  } else {
    to.meta.rou == 1
    if(to.meta.rou == 1) {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
