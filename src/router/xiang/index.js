export default [
        {
            path: '/my',
            name: 'My',
            component: () => import('../../views/xiang/my/My.vue'),
            meta:{
                rou:1
            }
        },{
            path: '/exercise',
            name: 'Exercise',
            component: () => import('../../views/xiang/Exercise.vue'),
            meta:{
                rou:1
            }
        },{
            path: '/record',
            name: 'record',
            component: () => import('../../views/xiang/Record.vue'),
            meta:{
                rou:1
            }
        },
]
