export default { //签收查看
    path: '/commission/sign/signlist',
    component: () => import(/* webpackChunkName: "list" */ '../../views/commission/children/file/index.vue'),
    meta: { title: '待签收' },
    children:[
        { //归档信息
            path: '/commission/sign/pigeonhole/:sldh/:x',
            component: () => import(/* webpackChunkName: "pigeonhole" */ '../../views/commission/children/file/children/signSigeonhole.vue'),
            meta: { title: '待签收', group: '/commission/sign/signlist' },
        },
        { //申请信息
            path: '/commission/sign/apply/:sldh/:x',
            component: () => import(/* webpackChunkName: "apply" */ '../../views/commission/children/file/children/apply.vue'),
            meta: { title: '待签收', group: '/commission/sign/signlist' },
        },
        { //审核信息
            path: '/commission/sign/audit/:sldh/:x',
            component: () => import(/* webpackChunkName: "audit" */ '../../views/commission/children/file/children/audit.vue'),
            meta: { title: '待签收', group: '/commission/sign/signlist' },
        },
        { //登簿信息
            path: '/commission/sign/recording/:sldh/:x',
            component: () => import(/* webpackChunkName: "recording" */ '../../views/commission/children/file/children/recording.vue'),
            meta: { title: '待签收', group: '/commission/sign/signlist' },
        },
        { //归档文件
            path: '/commission/sign/pigeonholefile/:sldh/:x',
            component: () => import(/* webpackChunkName: "pigeonholefile" */ '../../views/commission/children/file/children/pigeonholefile.vue'),
            meta: { title: '待签收', group: '/commission/sign/signlist' },
        },
        { //流程
            path: '/commission/sign/after/:sldh/:x',
            component: () => import(/* webpackChunkName: "after" */ '../../views/commission/children/file/children/after.vue'),
            meta: { title: '待签收', group: '/commission/sign/signlist'  },
        },
    ]
}