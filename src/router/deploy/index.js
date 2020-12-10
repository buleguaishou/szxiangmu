export default {// 归档配置
    path: '/deploy',
    component: () => import(/* webpackChunkName: "deploy" */ '../../views/deploy/index.vue'),
    meta: { title: '归档配置' },
    redirect: '/deploy/chart',
    children: [
        {   // 归档配置表
            path: '/deploy/chart',
            component: () => import(/* webpackChunkName: "chart" */ '../../views/deploy/children/chart.vue'),
            meta: { title: '归档配置表',group:'/deploy/chart' },
        },
        {   //查看详情
            path: '/deploy/chart/list/:id',
            component: () => import(/* webpackChunkName: "chart" */ '../../views/deploy/children/chart/list.vue'),
            meta: { title: '归档配置表',group:'/deploy/chart' },
        },
        {   // 元数据管理
            path: '/deploy/metadata',
            component: () => import(/* webpackChunkName: "metadata" */ '../../views/deploy/children/metadata.vue'),
            meta: { title: '元数据管理', group: '/deploy/metadata' },
            redirect:'/deploy/metadata/apply',
            children: [
                { // 申请信息
                    path: '/deploy/metadata/apply',
                    component: () => import(/* webpackChunkName: "apply" */ '../../views/deploy/children/metadata/apply.vue'),
                    meta: { title: '元数据管理', group: '/deploy/metadata' },
                },
                { // 审核信息
                    path: '/deploy/metadata/audit',
                    component: () => import(/* webpackChunkName: "audit" */ '../../views/deploy/children/metadata/audit.vue'),
                    meta: { title: '元数据管理', group: '/deploy/metadata' },
                },
                { // 登簿信息
                    path: '/deploy/metadata/recording',
                    component: () => import(/* webpackChunkName: "recording" */ '../../views/deploy/children/metadata/recording.vue'),
                    meta: { title: '元数据管理', group: '/deploy/metadata' },
                },
            ]
        }
    ]
}