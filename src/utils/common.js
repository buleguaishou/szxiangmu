const sideBarMenusMap = [
    {
        icon: 'el-icon-lx-apps',
        index: '/commission',
        code: 'myUpcoming',
        title: '我的待办'
    },
    {
        icon: 'el-icon-lx-search',
        code: "archiveSearch",
        index: '/search',
        title: '档案检索',
        children: [
            {
                index: '/search/complete',
                code: "fullSearch",
                title: '全文检索'
            },
            {
                index: '/search/classify',
                code: "classifySearch",
                title: '分类检索'
            }
        ]
    },
    {
        icon: 'el-icon-lx-copy',
        index: '/borrow',
        code: "borrowingManagement",
        title: '借阅管理',
        children: [
            {
                index: '/borrow/record',
                code: "borrowingList",
                title: '借阅记录'
            },
            {
                index: '/borrow/apply',
                code: "borrowingApplication",
                title: '借阅申请'
            }
        ]
    },
    {
        icon: 'el-icon-lx-calendar',
        index: '/statistics',
        code: "archivesStatistics",
        title: '档案统计',
        children: [
            {
                index: '/statistics/pigeonhole',
                code: "archiveStatistics",
                title: '归档统计'
            },
            {
                index: '/statistics/utilize',
                code: "useStatistics",
                title: '利用统计'
            },
            {
                index: '/statistics/personnel',
                code: "personnelStatistics",
                title: '人员统计'
            }
        ]
    },
    {
        icon: 'el-icon-lx-read',
        index: '/audit',
        code: "auditTrail",
        title: '审计跟踪',
        children: [
            {
                index: '/audit/archiveLog',
                code: "archiveLog",
                title: '归档日志'
            },
            {
                index: '/audit/consultLog',
                code: "searchLog",
                title: '查阅日志'
            },
            {
                index: '/audit/systemLog',
                code: "sysLog",
                title: '系统日志'
            }
        ]
    },
    {
        icon: 'el-icon-edit',
        index: '/deploy',
        code: "archiveConfig",
        title: '归档配置',
        children: [
            {
                index: '/deploy/chart',
                code: "archiveConfigTable",
                title: '归档配置表'
            },
            {
                index: '/deploy/metadata',
                code: "metadataTable",
                title: '元数据管理'
            }
        ]
    },
    {
        icon: 'el-icon-lx-people',
        index: '/user',
        code: "userManagement",
        title: '用户管理',
        children: [
            {
                index: '/user/list',
                code: "userList",
                title: '用户管理'
            },
            {
                index: '/user/jurisdiction',
                code: "roleManagement",
                title: '权限管理'
            }
        ]
    },
    {
        icon: 'el-icon-setting',
        index: '/system',
        code: "sysConfig",
        title: '系统管理',
        children: [
            {
                index: '/system/dictionaries',
                code: "dataDict",
                title: '数据字典',
            },
            {
                index: '/system/port',
                code: "interfaceConfig",
                title: '接口配置'
            },
            {
                index: '/system/sureness',
                code: "securityConfig",
                title: '安全配置'
            },
            {
                index: '/system/signature',
                title: '签章管理'
            }
        ]
    }
]
export default sideBarMenusMap;