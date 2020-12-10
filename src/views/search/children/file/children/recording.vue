<template>
    <div>
        <table>
            <tr>
                <th>受理单号</th>
                <td>{{recordingListData.registerInfo ? recordingListData.registerInfo.sldh : '-'}}</td>
                <th>登薄日期</th>
                <td>{{recordingListData.registerInfo ? recordingListData.registerInfo.dbrq : '-'}}</td>
            </tr>
            <tr>
                <th>登薄人</th>
                <td>{{recordingListData.registerInfo ? recordingListData.registerInfo.dbr : '-'}}</td>
                <th>登记原因</th>
                <td>{{recordingListData.registerInfo ? recordingListData.registerInfo.djyy : '-'}}</td>
            </tr>
          <tr><th colspan=4 style="height:40px;background:#F5F7FA;">登记信息</th></tr>
            <tr>
                <th>登记机构名称</th>
                <td>{{recordingListData.registerInfo ? recordingListData.registerInfo.djjg : '-'}}</td>
                <th>登记记录</th>
                <td>{{recordingListData.registerInfo ? recordingListData.registerInfo.djlx : '-'}}</td>
            </tr>
            <tr>
                <th>登记机构所在区县</th>
                <td>{{recordingListData.registerInfo ? recordingListData.registerInfo.qxmc : '-'}}</td>
                <th>登记区县代码</th>
                <td>{{recordingListData.registerInfo ? recordingListData.registerInfo.qxdm : '-'}}</td>
            </tr>
            <tr>
                <th>登记类型</th>
                <td colspan=3>{{recordingListData.registerInfo ? recordingListData.registerInfo.djlx : '-'}}</td>
            </tr>
          </table>
            <!-- 权利人信息 -->
        <table>
            <tr><th colspan=6 style="height:40px;background: #F5F7FA;">权利人信息</th></tr>
            <tr class="qlr" style="background: #F5F7FA;border: 1px solid #EBEEF5;">
                <th>权利人类型</th>
                <th>权利人姓名</th>
                <th>证件类型</th>
                <th>证件号码</th>
                <th>电话号码</th>
                <th>法人代表/负责人</th>
            </tr>
        </table>
        <table   v-for="(val, index) in recordingListData.qlrs" :key="'qlr'+index">
            <tr class="qlr">
                <td>{{val.lx}}</td>
                <td>{{val.mc}}</td>
                <td>{{val.zjMc}}</td>
                <td>{{val.zjHm}}</td>
                <td>{{val.dh}}</td>
                <td>{{val.fzrXm}}</td>
            </tr>
            <tr class="qlr">
                <td>代理人</td>
                <td>{{val.dlrXm}}</td>
                <td>{{val.dlrZjMc}}</td>
                <td>{{val.dlrZjHm}}</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
        <table>
          <tr><th colspan=4 style="height:40px;background:#F5F7FA;">不动产信息</th></tr>
            <tr>
                <th>不动产类型</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.bdclx : '-'}}</td>
                <th>不动产权证书号</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.bdcqzsh : '-'}}</td>
            </tr>
            <tr>
                <th>不动产证明号</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.bdcdjzmh : '-'}}</td>
                <th>不动产单元号</th>
                <td>{{recordingListData.houseInfo ? recordingListData.houseInfo.fwxxBdcdyh : '-'}}</td>
            </tr>
             <tr>
                <th>房屋坐落</th>
                <td colspan="3">{{recordingListData.houseInfo ? recordingListData.houseInfo.fwxxZl : '-'}}</td>
            </tr>
            <tr>
                <th>房屋面积</th>
                <td>{{recordingListData.houseInfo ? recordingListData.houseInfo.fwxxMj : '-'}}</td>
                <th>房屋类型</th>
                <td>{{recordingListData.houseInfo ? recordingListData.houseInfo.fwxxFwlx : '-'}}</td>
            </tr>
            <tr>
                <th>土地权利性质</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.tdxxQlxz : '-'}}</td>
                <th>土地用途</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.tdxxTdyt : '-'}}</td>
            </tr>
            <tr>
                <th>土地坐落</th>
                <td >{{recordingListData.bdcxx ? recordingListData.bdcxx.tdxxZl : '-'}}</td>
                <th>土地面积</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.tdxxMj : '-'}}</td>
            </tr>
            <tr>
                <th>土地使用年限起</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.tdxxTtsynxq : '-'}}</td>
                <th>土地使用年限至</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.tdxxTtsynxz : '-'}}</td>
            </tr>
            <tr>
                <th>附记</th>
                <td colspan=3>{{recordingListData.bdcxx ? recordingListData.bdcxx.fj : '-'}}</td>
            </tr>
          <tr><th colspan=4 style="height:40px;background:#F5F7FA;">共有情况</th></tr>
            <tr>
                <th>共有方式</th>
                <td  colspan=3>{{recordingListData.bdcxx ? recordingListData.bdcxx.gyfs : '-'}}</td>
            </tr>
            <tr>
                <th>按份共有情况</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.afgyqk : '-'}}</td>
                <th>其他共有情况</th>
                <td>{{recordingListData.bdcxx ? recordingListData.bdcxx.qtgyqk : '-'}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/commission/children/index'
export default {
    data() {
        return {
            input:'',
            recordingListData: [],
            registerInfo: [],
            sldh:'',
        };
    },
    mounted() {
        this.getrecordingList();
    },
    methods: {
        //获取列表
        async getrecordingList() {
            const res = await service.recordingList(this.$route.params.sldh);
            this.recordingListData = res;
        },
    }
}
</script>
<style scoped>
.dialog-footer{
    display: flex;
    justify-content:center;
    padding-top: 50px;
}
table{
    width: 100%;
    border-spacing:0;
    color: #6F737E;
    font-size: 14px;
    border-right: solid 1px #EBEEF5;
    border-bottom: solid 1px #EBEEF5;
}
.both{
    width:83%;
}
th{
    height: 56px;
    border-left: solid 1px #EBEEF5;
    border-top: solid 1px #EBEEF5;
    width: 17%;
}
td{
    height: 56px;
    border-left: solid 1px #EBEEF5;
    border-top: solid 1px #EBEEF5;
    text-align: center;
    width: 37%;
    line-height: 56px;
}
.qlr td,th{
    height: 56px;
    width: 17%;
}
.el-input{
    width: 10%;
    margin-right: 30px;
}
</style>