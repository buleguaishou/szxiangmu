<template>
  <div>
    <table >
            <tr style="background:#6F737E;color:#FFFFFF;">
                <th>数据名称</th>
                <td>约束条件</td>
                <th>数据名称</th>
                <td>约束条件</td>
            </tr>
            <tr>
                <th>受理单号</th>
                <td>
                    <el-switch
                        v-model="reviewInfoList.sldh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('sldh' , reviewInfoList.sldh)"
                        >
                    </el-switch>
                </td>
                <th>办理结果</th>
                <td>
                    <el-switch
                        v-model="reviewInfoList.bljg"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bljg' , reviewInfoList.bljg)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>办理节点</th>
                <td>
                    <el-switch
                        v-model="reviewInfoList.bljd"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bljd' , reviewInfoList.bljd)"
                        >
                    </el-switch>
                </td>
                <th>办理人</th>
                <td>
                    <el-switch
                        v-model="reviewInfoList.blr"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('blr' , reviewInfoList.blr)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>办理日期</th>
                <td>
                    <el-switch
                        v-model="reviewInfoList.blrq"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('blrq' , reviewInfoList.blrq)"
                        >
                    </el-switch>
                </td>
                <th>办理意见</th>
                <td>
                    <el-switch
                        v-model="reviewInfoList.blyj"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('blyj' , reviewInfoList.blyj)"
                        >
                    </el-switch>
                </td>
            </tr>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import service from '@/api/deploy/index';
export default {
    data() {
        return {
          radio:'1',
          reviewInfoList:{}
        };
    },
    mounted() {
        this.reviewInfo()
    },
    methods: {
        async reviewInfo() {
            const res = await service.reviewInfo()
            this.reviewInfoList = res
        },
        //状态改变弹框
        changInfo(x, y) {
            this.$confirm('此操作将改变该数据的条件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.getchangregis(x, y)
            }).catch(() => {
            this.reviewInfo()
            this.$message({
                type: 'info',
                message: '已取消更改'
            });
            });
        },
        //状态改变请求
        async getchangregis(x,y) {
            const res = await service.changReview(x,y)
            this.$message.success('更改条件成功');
            this.reviewInfo()
        },
    }
}
</script>

<style scoped>
table{
    width: 100%;
    border-spacing:0;
    color: #6F737E;
    font-size: 14px;
    border-right: solid 1px #EBEEF5;
    border-bottom: solid 1px #EBEEF5;
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
</style>