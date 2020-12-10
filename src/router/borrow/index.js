export default {// 档案借阅
    path: '/borrow',
    component: () => import(/* webpackChunkName: "borrow" */ '../../views/borrow/index.vue'),
    meta: { title: '档案借阅' },
    redirect: '/borrow/record',
    children: [
        {   // 借阅申请
            path: '/borrow/apply',
            component: () => import(/* webpackChunkName: "apply" */ '../../views/borrow/children/apply.vue'),
            meta: { title: '借阅申请' },
            redirect: '/borrow/apply/main',
            children:[
                {   //借阅申请
                    path: '/borrow/apply/main',
                    component: () => import(/* webpackChunkName: "main" */ '../../views/borrow/children/applyMold/main.vue'),
                    meta: { title: '借阅申请',group: "/borrow/apply" },
                },
                {   //权利人
                    path: '/borrow/apply/title/:id',
                    component: () => import(/* webpackChunkName: "title" */ '../../views/borrow/children/applyMold/title.vue'),
                    meta: { title: '权利人',group: "/borrow/apply/title/:id" },
                },
                {   //国家机关
                    path: '/borrow/apply/office/:id',
                    component: () => import(/* webpackChunkName: "office" */ '../../views/borrow/children/applyMold/office.vue'),
                    meta: { title: '国家机关',group: "/borrow/apply/office/:id" },
                },
                {   //利害人
                    path: '/borrow/apply/terrible/:id',
                    component: () => import(/* webpackChunkName: "terrible" */ '../../views/borrow/children/applyMold/terrible.vue'),
                    meta: { title: '利害人',group: "/borrow/apply/terrible/:id" },
                },
                // {//签字版
                //     path: '/borrow/apply/screen',
                //     component: () => import(/* webpackChunkName: "screen" */ '../../views/borrow/children/applyMold/screen.vue'),
                // },
            ]
        },
        {   // 借阅记录
            path: '/borrow/record',
            component: () => import(/* webpackChunkName: "record" */ '../../views/borrow/children/record.vue'),
            meta: { title: '借阅记录',group: "/borrow/record" },
        }
    ]
}