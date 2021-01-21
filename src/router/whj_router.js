export default [
    {
        path : "/curriculum",
        name : "Curriculum",
        component : () => import("../views/jie/curriculum"),
        meta:{
          rou:1
        }
    },
    {
        path : "/rollUp",
        name : "rollUp",
        component : () => import("../views/jie/rollUp"),
        meta:{
          rou:1
        }
    },
    {
        path : "/simulation",
        name : "simulation",
        component : () => import("../views/jie/simulation"),
        meta:{
          rou:1
        }
    },
    {
        path : "/Evaluation",
        name : "Evaluation",
        component : () => import("../views/jie/Evaluation"),
        meta:{
          rou:1
        }
    },
    {
        path : "/analysis",
        name : "analysis",
        component : () => import("../views/jie/analysis"),
        meta:{
          rou:1
        }
    },
    // 学习卡路由
    {
        path : "/study",
        name : "study",
        component : () => import("../views/jie/study"),
        meta:{
          rou:1
        }
    },
    // 学习卡兑换
    {
        path : "/exchange",
        name : "exchange",
        component : () => import("../views/jie/exchange"),
        meta:{
          rou:1
        }
    },
    
]