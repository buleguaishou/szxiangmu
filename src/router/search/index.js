export default {// 档案检索
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '../../views/search/index.vue'),
    meta: { title: '档案检索' },
    redirect: '/search/complete',
    children: [
        {   // 全文检索
            path: '/search/complete',
            component: () => import(/* webpackChunkName: "complete" */ '../../views/search/children/complete.vue'),
            meta: { title: '全文检索' , group: "/search/complete" },
        },
        {   // 分类检索
            path: '/search/classify',
            component: () => import(/* webpackChunkName: "classify" */ '../../views/search/children/classify.vue'),
            meta: { title: '分类检索', group: "/search/classify"  },
        },
        {   //查看
            path: '/search/list',
            component: () => import(/* webpackChunkName: "list" */ '../../views/search/children/file/index.vue'),
            meta: { title: '检索查看' },
            children:[
                { //归档信息
                    path: '/search/list/pigeonhole/:sldh/:wjys',
                    component: () => import(/* webpackChunkName: "pigeonhole" */ '../../views/search/children/file/children/pigeonhole.vue'),
                    meta: { title: '检索查看', group: "/search/list" },
                },
                { //申请信息
                    path: '/search/list/apply/:sldh/:wjys',
                    component: () => import(/* webpackChunkName: "apply" */ '../../views/search/children/file/children/apply.vue'),
                    meta: { title: '检索查看' , group: "/search/list"},
                },
                { //审核信息
                    path: '/search/list/audit/:sldh/:wjys',
                    component: () => import(/* webpackChunkName: "audit" */ '../../views/search/children/file/children/audit.vue'),
                    meta: { title: '检索查看', group: "/search/list"  },
                },
                { //登簿信息
                    path: '/search/list/recording/:sldh/:wjys',
                    component: () => import(/* webpackChunkName: "recording" */ '../../views/search/children/file/children/recording.vue'),
                    meta: { title: '检索查看' , group: "/search/list" },
                },
                { //归档文件
                    path: '/search/list/pigeonholefile/:sldh/:wjys',
                    component: () => import(/* webpackChunkName: "pigeonholefile" */ '../../views/search/children/file/children/pigeonholefile.vue'),
                    meta: { title: '检索查看', group: "/search/list"  },
                },
                { //审计跟踪
                    path: '/search/list/after/:sldh/:wjys',
                    component: () => import(/* webpackChunkName: "after" */ '../../views/search/children/file/children/after.vue'),
                    meta: { title: '检索查看', group: "/search/list"  },
                },
            ]
        }
    ]
}