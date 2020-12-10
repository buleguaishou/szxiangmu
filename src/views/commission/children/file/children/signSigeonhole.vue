<template>
    <div>
        <table>
            <tr>
                <th>业务来源编码</th>
                <td>{{signPigeonList.ywlyBm}}</td>
                <th>业务来源</th>
                <td>{{signPigeonList.ywly}}</td>
            </tr>
            <tr>
                <th>业务编码</th>
                <td>{{signPigeonList.ywbm}}</td>
                <th>业务名称</th>
                <td>{{signPigeonList.ywmc}}</td>
            </tr>
            <tr>
                <th>文件页数</th>
                <td>{{signPigeonList.wjys}}</td>
                <th>办结年度</th>
                <td>{{signPigeonList.bjnd}}</td>
            </tr>
        </table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="openIn">签收</el-button>
        </span>
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
            signPigeonList:{},
            sldh:'',
        };
    },
    mounted() {
        this.getPigeon();
    },
    methods: {
        //获取列表并保存受理单号
        async getPigeon() {
            const res = await service.Pigeon(this.$route.params.sldh);
            this.signPigeonList = res;
            this.sldh = res.sldh
            this.cacheStorage.set("signsldh", this.$route.params.sldh)
        },
        //签收弹框
        openIn() {
            const scope = this
            scope.$confirm('此操作将归档文件签收, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                scope.status = 1
                scope.getStoredAffirm()
            }).catch(() => {
            scope.$message({
                type: 'info',
                message: '已取消签收'
            });          
            });
        },
        //签收
        async getStoredAffirm() {
            const res = await service.signBatch({
                sldh : this.sldh
            }) 
            this.$router.push('/commission/sign')
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