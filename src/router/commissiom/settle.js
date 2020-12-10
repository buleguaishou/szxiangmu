export default { //整理查看
    path: '/commission/settle/setlist',
    component: () => import(/* webpackChunkName: "setlist" */ '../../views/commission/children/file/index.vue'),
    meta: { title: '待整理' },
    children: [
        { //归档信息
            path: '/commission/settle/pigeonhole/:sldh/:x',
            component: () => import(/* webpackChunkName: "pigeonhole" */ '../../views/commission/children/file/children/pigeonhole.vue'),
            meta: { title: '待整理', group: '/commission/settle/setlist' },
        },
        { //申请信息
            path: '/commission/settle/apply/:sldh/:x',
            component: () => import(/* webpackChunkName: "apply" */ '../../views/commission/children/file/children/apply.vue'),
            meta: { title: '待整理', group: '/commission/settle/setlist' },
        },
        { //审核信息
            path: '/commission/settle/audit/:sldh/:x',
            component: () => import(/* webpackChunkName: "audit" */ '../../views/commission/children/file/children/audit.vue'),
            meta: { title: '待整理', group: '/commission/settle/setlist' },
        },
        { //登簿信息
            path: '/commission/settle/recording/:sldh/:x',
            component: () => import(/* webpackChunkName: "recording" */ '../../views/commission/children/file/children/recording.vue'),
            meta: { title: '待整理', group: '/commission/settle/setlist' },
        },
        { //归档文件
            path: '/commission/settle/pigeonholefile/:sldh/:x',
            component: () => import(/* webpackChunkName: "pigeonholefile" */ '../../views/commission/children/file/children/pigeonholefile.vue'),
            meta: { title: '待整理', group: '/commission/settle/setlist' },
        },
        { //流程
            path: '/commission/settle/after/:sldh/:x',
            component: () => import(/* webpackChunkName: "after" */ '../../views/commission/children/file/children/after.vue'),
            meta: { title: '待整理', group: '/commission/settle/setlist'  },
        },
    ]
}

