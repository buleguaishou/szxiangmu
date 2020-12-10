export default {// 审计跟踪
    path: '/audit',
    component: () => import(/* webpackChunkName: "audit" */ '../../views/audit/index.vue'),
    meta: { title: '审计跟踪' },
    redirect: '/audit/archiveLog',
    children: [
        {   // 归档日志
            path: '/audit/archiveLog',
            component: () => import(/* webpackChunkName: "archiveLog" */ '../../views/audit/children/archiveLog.vue'),
            meta: { title: '归档日志', group: "/audit/archiveLog"},
        },
        {   // 查阅日志
            path: '/audit/consultLog',
            component: () => import(/* webpackChunkName: "consultLog" */ '../../views/audit/children/consultLog.vue'),
            meta: { title: '查阅日志', group: "/audit/consultLog" },
        },
        {   // 系统日志
            path: '/audit/systemLog',
            component: () => import(/* webpackChunkName: "systemLog" */ '../../views/audit/children/systemLog.vue'),
            meta: { title: '系统日志', group: "/audit/systemLog" },
        }
    ]
}