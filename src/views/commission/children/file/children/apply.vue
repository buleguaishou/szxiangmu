<template>
    <div>
        <table >
            <tr><th colspan=4 style="height:40px;background: #F5F7FA;">办理业务</th></tr>
            <tr>
                <th>业务名称</th>
                <td>{{applyListData.applicationInfo ? applyListData.applicationInfo.blyw : '-'}}</td>
                <th>业务代码</th>
                <td>{{applyListData.applicationInfo ? applyListData.applicationInfo.blywCode : '-'}}</td>
            </tr>
            <tr>
                <th>报件编号</th>
                <td>{{applyListData.applicationInfo ? applyListData.applicationInfo.bjbh : '-'}}</td>
                <th>受理单号</th>
                <td>{{applyListData.applicationInfo ? applyListData.applicationInfo.sldh : '-'}}</td>
            </tr>
            <tr>
                <th>办理地点</th>
                <td colspan=3>{{applyListData.applicationInfo ? applyListData.applicationInfo.bldd : '-'}}</td>
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
        <table   v-for="(val, index) in applyListData.qlrs" :key="'qlr'+index">
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
          <tr><th colspan=6 style="height:40px;background: #F5F7FA;border: 1px solid #EBEEF5;">义务人信息</th></tr>
            <tr class="qlr" style="background: #F5F7FA;border: 1px solid #EBEEF5;">
                <th>义务人类型</th>
                <th>义务人姓名</th>
                <th>证件类型</th>
                <th>证件号码</th>
                <th>电话号码</th>
                <th>法人代表/负责人</th>
            </tr>
        </table>
        <table v-for="(el,j) in applyListData.ywrs" :key="'ywr'+j">
            <tr class="qlr">
                <td>{{el.lx}}</td>
                <td>{{el.mc}}</td>
                <td>{{el.zjMc}}</td>
                <td>{{el.zjHm}}</td>
                <td>{{el.dh}}</td>
                <td>{{el.fzrXm}}</td>
            </tr>
            <tr class="qlr">
                <td>代理人</td>
                <td>{{el.dlrXm}}</td>
                <td>{{el.dlrZjMc}}</td>
                <td>{{el.dlrZjHm}}</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
        <table>
          <tr><th colspan=4 style="height:40px;background: #F5F7FA;">不动产信息</th></tr>
            <tr>
                <th>不动产类型</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.bdclx : '-'}}</td>
                <th>不动产权证书号</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.bdcqzsh : '-'}}</td>
            </tr>
            <tr>
                <th>不动产证明号</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.bdcdjzmh : '-'}}</td>
                <th>不动产单元号</th>
                <td>{{applyListData.houseInfo ? applyListData.houseInfo.fwxxBdcdyh : '-'}}</td>
            </tr>
            <tr>
                <th>房屋坐落</th>
                <td colspan="3">{{applyListData.houseInfo ? applyListData.houseInfo.fwxxZl : '-'}}</td>
            </tr>
            <tr>
                <th>房屋面积</th>
                <td>{{applyListData.houseInfo ? applyListData.houseInfo.fwxxMj : '-'}}</td>
                <th>房屋类型</th>
                <td>{{applyListData.houseInfo ? applyListData.houseInfo.fwxxFwlx : '-'}}</td>
            </tr>
            <tr>
                <th>土地权利性质</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.tdxxQlxz : '-'}}</td>
                <th>土地用途</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.tdxxTdyt : '-'}}</td>
            </tr>
            <tr>
                <th>土地坐落</th>
                <td >{{applyListData.bdcxx ? applyListData.bdcxx.tdxxZl : '-'}}</td>
                <th>土地面积</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.tdxxMj : '-'}}</td>
            </tr>
            <tr>
                <th>土地使用年限起</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.tdxxTtsynxq : '-'}}</td>
                <th>土地使用年限至</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.tdxxTtsynxz : '-'}}</td>
            </tr>
            <tr>
                <th>附记</th>
                <td colspan=3>{{applyListData.bdcxx ? applyListData.bdcxx.fj : '-'}}</td>
            </tr>
          <tr><th colspan=4 style="height:40px;background: #F5F7FA;">共有情况</th></tr>
            <tr>
                <th>共有方式</th>
                <td  colspan=3>{{applyListData.bdcxx ? applyListData.bdcxx.gyfs : '-'}}</td>
            </tr>
            <tr>
                <th>按份共有情况</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.afgyqk : '-'}}</td>
                <th>其他共有情况</th>
                <td>{{applyListData.bdcxx ? applyListData.bdcxx.qtgyqk : '-'}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/commission/children/index';
export default {
    data() {
        return {
            input:'',
            applyListData:{
              applicationInfo: '',
              bdcxx:'',
              qlrs: []
            },
        };
    },
    created() {
        this.getapplyList();
    },
    methods: {
        //获取列表
        async getapplyList() {
            const res = await service.applyList(this.$route.params.sldh);
            this.applyListData = res;
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
}
.qlr td,th{
    height: 56px;
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
.el-input{
    width: 10%;
    margin-right: 30px;
}
</style>