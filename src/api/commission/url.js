export default {
    applyList: sldh => `/upcoming/find_application_info/${sldh}`,//申请信息
    auditList: sldh => `/upcoming/find_review_info/${sldh}`,//审核信息
    recordingList: sldh => `/upcoming/find_register_info/${sldh}`,//登簿信息
    getFile: sldh => `/upcoming/find_elec_document/${sldh}`,//归档文件

    allList:'/upcoming/to_receive_list',//全部，待整理，待入库列表
    signList:'/upcoming/to_signed',//待签收列表
    signBatch: '/upcoming/batch_signed',//批量/单个签收
    Pigeon: sldh => `/upcoming/to_sorted_out/${sldh}`,//归档信息
    settleNumber: sldhs => `/upcoming/to_sorted_out/edit_batch/${sldhs}`,// 批量,单个编号
    settleAffirm: sldhs => `/upcoming/to_sorted_out/${sldhs}`, //批量,单个整理
    storedAffirm: sldhs => `/upcoming/to_stored/batch/${sldhs}`,//确认入库/退回
    nopass: sldh => `/upcoming/refresh_send_ysj/${sldh}`,//质检不通过
    signpass: sldh => `/upcoming/verifySource/${sldh}`,//验签不通过
}