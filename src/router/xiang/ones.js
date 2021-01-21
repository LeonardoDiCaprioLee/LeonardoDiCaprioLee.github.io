const add = [
    { // 登录路由
        path: '/login',
        name: 'Login',
        component: () => import('../../views/xiang/login/Login.vue')
    },
    { // 注册路由
      path: "/register",
      name: "Register",
      component: () => import("@/views/xiang/login/Register.vue")
    },
    { // 优惠券路由
      path: "/discount",
      name: "Discount",
      component: () => import("@/views/xiang/my/Discount.vue"),
      meta:{
        rou:1
      }
    },
    { // 设置路由
      path: "/reset",
      name: "Reset",
      component: () => import("@/views/xiang/my/Reset.vue"),
      meta:{
        rou:1
      }
    },
    { // 修改密码路由
      path: "/resetpass",
      name: "Resetpass",
      component: () => import("@/views/xiang/login/ResetPass.vue"),
      meta:{
        rou:1
      }
    },
    { // 绑定手机号路由
      path: "/bindingNumber",
      name: "BindingNumber",
      component: () => import("@/views/xiang/login/BindingNumber.vue"),
      
    },
    { // 用户信息路由
      path: "/userinfo",
      name: "Userinfo",
      component: () => import("@/views/xiang/login/Userinfo.vue"),
      meta:{
        rou:1
      }
    },
    { // 用户信息路由
      path: "/setUser",
      name: "SetUser",
      component: () => import("@/views/xiang/resetUser/SetUser.vue"),
      meta:{
        rou:1
      }
    },
    { // 修改性别路由
      path: "/sex",
      name: "Sex",
      component: () => import("@/views/xiang/resetUser/Sex.vue"),
      meta:{
        rou:1
      }
    },
    { // 修改用户名路由
      path: "/resetNikename",
      name: "ResetNikename",
      component: () => import("@/views/xiang/resetUser/ResetNikename.vue"),
      meta:{
        rou:1
      }
    },
    { // 修改用户名路由
      path: "/collect",
      name: "Collect",
      component: () => import("@/views/xiang/my/Collect.vue"),
      meta:{
        rou:1
      }
    },
    { // 我的关注路由
        path : "/follow",
        name : "follow",
        component : () => import("@/views/jie/follow"),
        meta:{
          rou:1
        }
    },
    {   // 我的特色课
        path : "/myFeature",
        name : "MyFeature",
        component : () => import("@/views/xiang/my/MyFeature"),
        meta:{
          rou:1
        }
    },
    {   // 我的一对一教学
        path : "/oneToOne",
        name : "OneToOne",
        component : () => import("@/views/xiang/my/OneToOne"),
        meta:{
          rou:1
        }
    },
    {   // 剩余学习币
        path : "/surplus",
        name : "Surplus",
        component : () => import("@/views/xiang/my/Surplus"),
        meta:{
          rou:1
        }
    },
    {   // 意见反馈
        path : "/feedback",
        name : "Feedback",
        component : () => import("@/views/xiang/my/Feedback"),
        meta:{
          rou:1
        }
    },
]
export {
    add
}
    

