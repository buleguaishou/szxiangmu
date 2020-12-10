<template>
    <div>
        <table>
            <tr>
                <th>业务来源编码</th>
                <td>{{messageList.ywlyBm}}</td>
                <th>业务来源</th>
                <td>{{messageList.ywly}}</td>
            </tr>
            <tr>
                <th>业务编码</th>
                <td>{{messageList.ywbm}}</td>
                <th>业务名称</th>
                <td>{{messageList.ywmc}}</td>
            </tr>
            <tr>
                <th>档案编号</th>
                <td>{{messageList.archiveCode}}</td>
                <th>归档时间</th>
                <td>{{messageList.gdsj}}</td>
            </tr>
            <tr>
                <th>档案科室</th>
                <td>{{messageList.gdks}}</td>
                <th>归档机构</th>
                <td>{{messageList.gdjg}}</td>
            </tr>
            <tr>
                <th>文件页数</th>
                <td>{{messageList.wjys}}</td>
                <th>办结年度</th>
                <td>{{messageList.bjnd}}</td>
            </tr>
            <tr>
                <th>保管期限</th>
                <td>{{messageList.bgqx}}</td>
                <th>归档人</th>
                <td>{{messageList.gdr}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/search/index';
export default {
    data() {
        return {
            tableData: [],
            input:'',
            messageList:{},
        };
    },
    mounted() {
        this.message();
    },
    methods: {
        //获取列表
        async message() {
            const res = await service.message(this.$route.params.sldh);
            this.messageList = res;
            this.cacheStorage.set("searchsldh", this.$route.params.sldh)
            this.cacheStorage.set("searchwjys", this.$route.params.wjys)
        },
    }
};
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
.el-input{
    width: 10%;
    margin-right: 30px;
}
</style>