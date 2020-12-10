export default {
    chartList:'/archive_config/list',//配置列表
    chartDetails: id => `/archive_config/query/${id}`,//配置详情
    changchart:(id, value) => `/archive_config/registerInfo/${id}/${value}`, //配置改变状态
    applicationInfo: "/metadata/applicationInfo", //申请信息
    registerInfo: "/metadata/registerInfo", //登簿信息
    reviewInfo: "/metadata/reviewInfo", //审核信息
    changapply:(key, value) => `/metadata/applicationInfo/${key}/${value}`, //申请改变状态
    changreview:(key, value) => `/metadata/reviewInfo/${key}/${value}`, //审核改变状态
    changregister:(key, value) => `/metadata/registerInfo/${key}/${value}`, //登簿改变状态
}