export default {
    busList:'/dataDict/businessCode',//业务编码列表
    busAdd:'/dataDict/businessCode',//新增业务类型
    busEdit: id => `/dataDict/businessCode/${id}`,//编辑业务类型
    busDel: id => `/dataDict/businessCode/${id}`,//删除业务编码
    busState: (id, status) => `/dataDict/businessCode/updateStatus/${id}/${status}`,//业务编码状态
    depList: '/dataDict/departmentCode',//部门编码
    sourceList:'/dataDict/bussinessSourceCode',//业务来源编码
    sourceState: (id,status)  => `/dataDict/bussinessSourceCode/${id}/${status}`,//改变来源状态
    fileList: '/dataDict/fileCf',//文件列表
    deployList:'/interfaceConfig',//接口配置
    surList: '/security_config/list',//安全配置列表
    surAdd:'/security_config/update',//安全配置编辑
}