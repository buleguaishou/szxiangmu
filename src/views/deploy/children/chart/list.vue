<template>
    <div>
        <div class="container">
            <table class="business">
                <tr>
                    <th>业务编码</th>
                    <td>{{chartDetails.businessCode}}</td>
                    <th>业务名称</th>
                    <td>{{chartDetails.businessName}}</td>
                </tr>
                <tr>
                    <th>业务来源编码</th>
                    <td>{{chartDetails.businessSource}}</td>
                    <th>业务来源</th>
                    <td>{{chartDetails.businessSourceName}}</td>
                </tr>
                <tr>
                    <th>保管期限</th>
                    <td>{{chartDetails.bgqx}}</td>
                    <th>所属类型</th>
                    <td>{{chartDetails.beLongType}}</td>
                </tr>
                <tr>
                    <th>序号</th>
                    <th>材料名称</th>
                    <th>文件分类代码</th>
                    <th>是否必传</th>
                </tr>
            </table>
            <table class="list" v-for="(val,index) in chartDetails.businessDataVOS" :key="index">
                <tr >
                    <td style="width:17%">{{index+1}}</td>
                    <td style="width:37%">{{val.fileName}}</td>
                    <td style="width:17%">{{val.fileCode}}</td>
                    <td style="width:37%">
                        <!-- {{val.isNeedName}} -->
                        <el-switch
                            v-model="val.isNeedName"
                            active-value = "是"
                            inactive-value = "否"
                            active-text="是"
                            inactive-text="否"
                            @change="changInfo( val.id , val.isNeedName)"
                            >
                        </el-switch>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/deploy/index';
export default {
    name: 'basetable',
    data() {
        return {
            chartDetails:[],
        }

    },
    mounted() {
        this.getChartDetails()
    },
    methods: {
        //获取列表
        async getChartDetails(){
            const res = await service.chartDetails(this.$route.params.id)
            this.chartDetails = res;
        },
        changInfo(x, y) {
            if(y == "是") {
                y = true
            }
            if(y == "否") {
                y = false
            }
            this.$confirm('此操作将改变该材料是否必传, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.getchangchart(x, y)
            }).catch(() => {
            this.getChartDetails()
            this.$message({
                type: 'info',
                message: '已取消更改'
            });
            });
        },
        //状态改变请求
        async getchangchart(x,y) {
            const res = await service.changchart(x,y)
            this.$message.success('更改成功');
            this.getChartDetails()
        },
    },
};
</script>

<style scoped>
.business{
    width: 100%;
    border-spacing:0;
    color: #6F737E;
    font-size: 14px;
}
.list{
    width: 100%;
    border-spacing:0;
    color: #6F737E;
    font-size: 14px;
}
.list td{
    height: 56px;
    border: solid 1px #EBEEF5;
    text-align: center;
    line-height: 56px;
}
.business th{
    height: 56px;
    width: 17%;
    background: #F5F7FA;
    border: 1px solid #EBEEF5;
}
.business td{
    height: 56px;
    border: solid 1px #EBEEF5;
    text-align: center;
    width: 37%;
    line-height: 56px;
}
</style>
