export default { //入库查看
    path: '/commission/storages/stolist',
    component: () => import(/* webpackChunkName: "list" */ '../../views/commission/children/file/index.vue'),
    meta: { title: '待入库' },
    children:[
        { //归档信息
            path: '/commission/storages/pigeonhole/:sldh/:x',
            component: () => import(/* webpackChunkName: "pigeonhole" */ '../../views/commission/children/file/children/stoPigeonhole.vue'),
            meta: { title: '待入库', group: '/commission/storages/stolist' },
        },
        { //申请信息
            path: '/commission/storages/apply/:sldh/:x',
            component: () => import(/* webpackChunkName: "apply" */ '../../views/commission/children/file/children/apply.vue'),
            meta: { title: '待入库', group: '/commission/storages/stolist' },
        },
        { //审核信息
            path: '/commission/storages/audit/:sldh/:x',
            component: () => import(/* webpackChunkName: "audit" */ '../../views/commission/children/file/children/audit.vue'),
            meta: { title: '待入库', group: '/commission/storages/stolist' },
        },
        { //登簿信息
            path: '/commission/storages/recording/:sldh/:x',
            component: () => import(/* webpackChunkName: "recording" */ '../../views/commission/children/file/children/recording.vue'),
            meta: { title: '待入库', group: '/commission/storages/stolist' },
        },
        { //归档文件
            path: '/commission/storages/pigeonholefile/:sldh/:x',
            component: () => import(/* webpackChunkName: "pigeonholefile" */ '../../views/commission/children/file/children/pigeonholefile.vue'),
            meta: { title: '待入库', group: '/commission/storages/stolist' },
        },
        { //流程
            path: '/commission/storages/after/:sldh/:x',
            component: () => import(/* webpackChunkName: "after" */ '../../views/commission/children/file/children/after.vue'),
            meta: { title: '待入库', group: '/commission/storages/stolist'  },
        },
    ]
}