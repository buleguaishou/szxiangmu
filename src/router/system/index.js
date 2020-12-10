export default {// 系统管理
    path: '/system',
    component: () => import(/* webpackChunkName: "system" */ '../../views/system/index.vue'),
    meta: { title: '系统管理' },
    redirect: '/system/dictionaries',
    children: [
        {   // 数据字典
            path: '/system/dictionaries',
            component: () => import(/* webpackChunkName: "dictionaries" */ '../../views/system/children/coding/dictionaries.vue'),
            meta: { title: '数据字典' },
            redirect: '/system/dictionaries/department',
            children: [
                {   // 部门编码
                    path: '/system/dictionaries/department',
                    component: () => import(/* webpackChunkName: "department" */ '../../views/system/children/coding/department.vue'),
                    meta: { title: '数据字典',group:'/system/dictionaries' },
                },
                {   // 业务编码
                    path: '/system/dictionaries/business',
                    component: () => import(/* webpackChunkName: "business" */ '../../views/system/children/coding/business.vue'),
                    meta: { title: '数据字典',group:'/system/dictionaries'  },
                },
                {   // 业务来源
                    path: '/system/dictionaries/source',
                    component: () => import(/* webpackChunkName: "source" */ '../../views/system/children/coding/source.vue'),
                    meta: { title: '数据字典',group:'/system/dictionaries'  },
                },
                {   // 文件分类
                    path: '/system/dictionaries/matter',
                    component: () => import(/* webpackChunkName: "matter" */ '../../views/system/children/coding/matter.vue'),
                    meta: { title: '数据字典',group:'/system/dictionaries'  },
                },
            ]
        },
        {   // 接口配置
            path: '/system/port',
            component: () => import(/* webpackChunkName: "port" */ '../../views/system/children/port.vue'),
            meta: { title: '接口配置',group:'/system/port'  },
        },
        {   // 安全配置
            path: '/system/sureness',
            component: () => import(/* webpackChunkName: "sureness" */ '../../views/system/children/sureness.vue'),
            meta: { title: '安全配置' ,group:'/system/sureness' },
        },
        {   // 签章管理
            path: '/system/signature',
            component: () => import(/* webpackChunkName: "signature" */ '../../views/system/children/signature.vue'),
            meta: { title: '签章管理',group:'/system/signature'  },
        }
    ]
}