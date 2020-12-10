export default {
    borrowList: '/borrow/list',//借阅申请列表
    borrowAdd: '/borrow/application',//新增借阅申请
    borrowDel: id => `/borrow/delete/${id}`, //删除
    getzl: '/borrow/queryCard', //获取坐落
    detailsList: id => `/borrow/query/${id}`,//查看单个申请
    query: '/borrow/to_zl_bdcqzsh',//通过坐落和权证号查询不动产信息
}