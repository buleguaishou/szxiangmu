import Vue from 'vue';
import Router from 'vue-router';
import settleConfig from "./commissiom/settle";
import storagesConfig from "./commissiom/storages"
import signConfig from "./commissiom/sign"
import suditConfig from "./audit"
import borrowConfig from "./borrow/index"
import deployConfig from "./deploy/index"
import searchConfig from './search'
import statisticsConfig from './statistics'
import systemConfig from './system'
import userConfig from './user'
Vue.use(Router);

const originalPush = Router.prototype.push
    Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                // 主路由
                // {
                //     path: '/home',
                //     component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
                //     meta: { title: '首页', group: '/home' },
                // },
                { //我的代办
                    path: '/commission',
                    component: () => import(/* webpackChunkName: "commission" */ '../views/commission/commission.vue'),
                    meta: { title: '我的代办',group: '/commission'},
                    redirect:'/commission/complete',
                    children:[
                        { //全部
                            path: '/commission/complete',
                            component: () => import(/* webpackChunkName: "complete" */ '../views/commission/children/complete.vue'),
                            meta: { title: '我的待办', group: '/commission' },
                        },
                        { //待入库
                            path: '/commission/storages',
                            component: () => import(/* webpackChunkName: "storages" */ '../views/commission/children/storages.vue'),
                            meta: { title: '我的待办', group: '/commission' },
                        },
                        { //待整理
                            path: '/commission/settle',
                            component: () => import(/* webpackChunkName: "settle" */ '../views/commission/children/settle.vue'),
                            meta: { title: '我的待办', group: '/commission'  },
                        },
                        { //待签收
                            path: '/commission/sign',
                            component: () => import(/* webpackChunkName: "sign" */ '../views/commission/children/sign.vue'),
                            meta: { title: '我的待办', group: '/commission'  },
                        },
                    ]
                },
                //签收查看
                signConfig,
                //整理查看
                settleConfig,
                //入库查看
                storagesConfig,
                // 审计跟踪
                suditConfig,
                // 档案借阅
                borrowConfig,
                // 归档配置
                deployConfig,
                // 档案检索
                searchConfig,
                // 档案统计
                statisticsConfig,
                // 系统管理
                systemConfig,
                // 用户管理
                userConfig,
                {// 个人中心
                    path: '/userCenter',
                    component: () => import(/* webpackChunkName: "userCenter" */ '../views/userCenter/index.vue'),
                    meta: { title: '个人中心' , group: '/userCenter'  }
                },
                // {   //404
                //     path: '/404',
                //     component: () => import(/* webpackChunkName: "error" */ '../views/404.vue'),
                //     meta: { title: '错误'  , group: '/404' }
                // },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/screen',
            component: () => import(/* webpackChunkName: "login" */ '../views/screen.vue'),
        },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ],
});

