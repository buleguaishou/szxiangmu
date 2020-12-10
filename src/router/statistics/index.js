export default {// 档案统计
    path: '/statistics',
    component: () => import(/* webpackChunkName: "statistice" */ '../../views/statistics/index.vue'),
    meta: { title: '档案统计' },
    redirect: '/statistics/pigeonhole',
    children: [
        {   // 归档统计
            path: '/statistics/pigeonhole',
            component: () => import(/* webpackChunkName: "pigeonhole" */ '../../views/statistics/children/pigeonhole.vue'),
            meta: { title: '归档统计',group: '/statistics/pigeonhole' },
        },
        {   // 利用统计
            path: '/statistics/utilize',
            component: () => import(/* webpackChunkName: "utilize" */ '../../views/statistics/children/utilize.vue'),
            meta: { title: '利用统计',group: '/statistics/utilize' },
        },
        {   // 人员统计
            path: '/statistics/personnel',
            component: () => import(/* webpackChunkName: "personnel" */ '../../views/statistics/children/personnel.vue'),
            meta: { title: '人员统计',group: '/statistics/personnel' },
        }
    ]
}