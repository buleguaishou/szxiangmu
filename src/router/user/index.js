export default {// 用户管理
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ '../../views/user/index.vue'),
    meta: { title: '用户管理' },
    redirect: '/user/list',
    children: [
        {   // 用户管理
            path: '/user/list',
            component: () => import(/* webpackChunkName: "user" */ '../../views/user/children/user.vue'),
            meta: { title: '用户管理' },
            redirect:'/user/list',
            children:[
                {   // 用户管理
                    path: '/user/list',
                    component: () => import(/* webpackChunkName: "add" */ '../../views/user/children/user/index.vue'),
                    meta: { title: '用户管理',group:'/user/list' },
                },
                {   // 新增用户
                    path: '/user/list/add',
                    component: () => import(/* webpackChunkName: "add" */ '../../views/user/children/user/add.vue'),
                    meta: { title: '用户管理',group:'/user/list'  },
                },
                ,
                {   // 编辑用户
                    path: '/user/list/edit/:id',
                    component: () => import(/* webpackChunkName: "edit" */ '../../views/user/children/user/edit.vue'),
                    meta: { title: '用户管理',group:'/user/list' },
                },
            ],
        },
        {   // 权限管理
            path: '/user/jurisdiction',
            component: () => import(/* webpackChunkName: "jurisdiction" */ '../../views/user/children/jurisdiction.vue'),
            meta: { title: '权限管理' },
            redirect:'/user/jurisdiction/list',
            children:[
                {   // 权限管理
                    path: '/user/jurisdiction',
                    component: () => import(/* webpackChunkName: "edit" */ '../../views/user/children/jurisdiction/index.vue'),
                    meta: { title: '权限管理',group:'/user/jurisdiction' },
                },
                {   // 权限管理编辑
                    path: '/user/jurisdiction/edit/:id',
                    component: () => import(/* webpackChunkName: "edit" */ '../../views/user/children/jurisdiction/edit.vue'),
                    meta: { title: '权限管理' ,group:'/user/jurisdiction'},
                },
                {   // 创造角色
                    path: '/user/jurisdiction/add',
                    component: () => import(/* webpackChunkName: "add" */ '../../views/user/children/jurisdiction/add.vue'),
                    meta: { title: '权限管理' ,group:'/user/jurisdiction'},
                },
            ]
        },
    ]
}