<template>
    <div>
        <table>
            <tr>
                <th>业务来源编码</th>
                <td>{{stoPigeonList.ywlyBm}}</td>
                <th>业务来源</th>
                <td>{{stoPigeonList.ywly}}</td>
            </tr>
            <tr>
                <th>业务编码</th>
                <td>{{stoPigeonList.ywbm}}</td>
                <th>业务名称</th>
                <td>{{stoPigeonList.ywmc}}</td>
            </tr>
            <tr>
                <th>档案编号</th>
                <td>{{stoPigeonList.archiveCode}}</td>
                <th>整理完成时间</th>
                <td>{{stoPigeonList.finishDate}}</td>
            </tr>
            <tr>
                <th>档案科室</th>
                <td>{{stoPigeonList.gdks}}</td>
                <th>归档机构</th>
                <td>{{stoPigeonList.gdjg}}</td>
            </tr>
            <tr>
                <th>文件页数</th>
                <td>{{stoPigeonList.wjys}}</td>
                <th>办结年度</th>
                <td>{{stoPigeonList.bjnd}}</td>
            </tr>
            <tr>
                <th>保管期限</th>
                <td>{{stoPigeonList.bgqx}}</td>
                <th>整理人</th>
                <td>{{stoPigeonList.gdr}}</td>
            </tr>
            <!-- <tr>
                <th>归档目录</th>
                <td colspan=3>{{stoPigeonList.ywlyBm}}</td>
            </tr> -->
        </table>
        <span slot="footer" class="dialog-footer">
            <el-button  v-debounceClick="openOut">退回</el-button>
            <el-button type="primary" v-debounceClick="openIn">确认入库</el-button>
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
            tableData: [],
            input:'',
            stoPigeonList:{},
        };
    },
    mounted() {
        this.getPigeon();
    },
    methods: {
        //获取列表并保存受理单号
        async getPigeon() {
            const res = await service.Pigeon(this.$route.params.sldh);
            this.stoPigeonList = res;
            this.cacheStorage.set("stosldh", this.$route.params.sldh)
        },
        //退回弹框
        openOut() {
        this.$prompt('请输入退回原因', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: "",
                inputType:"textarea"
            }).then(({ value }) => {
                this.status = 3
                this.getStoredAffirm(this.status,value)
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '取消输入'
                });
            });
        },
        //入库弹框
        openIn() {
            const scope = this
            scope.$confirm('此操作将归档文件入库, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                scope.status = 4
                scope.getStoredAffirm(scope.status)
            }).catch(() => {
                scope.$message({
                    type: 'info',
                    message: '已取消入库'
                });
            });
        },
        //整理/入库
        async getStoredAffirm(status,reason) {
            if(status == 3 && !reason ){
                this.$message.warning('请输入退回原因');
                return;
            }
            const res = await service.storedAffirm(parseInt(this.$route.params.sldh), {status,reason});

            if(res.code){

            }else{
                if(status == 3) {
                    this.$message.success('退回完成');
                    this.$router.push({path:`/commission/storages`})
                } else if (status == 4) {
                    this.$message.success('入库完成');
                    this.$router.push({path:`/commission/storages`})
                }
            }
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