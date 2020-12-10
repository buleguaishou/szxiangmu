export default {
    login: '/auth/token', //登入接口
    info:'/personal-center/info', //个人资料
    change:'/personal-center/modify-pwd', //修改密码
    roleList:'/role/list',//角色/权限列表
    roleAdd:'/role/save',//新增角色/权限
    roleEdit: id => `/role/${id}`,//【角色/权限管理】获取角色详情信息
    roleDelete:id => `/role/${id}`,//删除角色
    rolePermissions:'/role/permissions',//获取权限分组数据
    userList:'/user/list',//用户列表
    userAdd:'/user/save',//新增用户
    userEdit: id => `/user/${id}/detail`, //用户编辑
    userFrost: (id,code) => `/user/update/${id}/status/${code}`, //冻结用户
    userSearch:'/user/search-by-name', //用户查询
}