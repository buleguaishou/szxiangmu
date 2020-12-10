<template>
    <div>
        <div class="container" style="padding-bottom: 100px;">
            <el-form ref="form" :model="form" label-width="80px" label-position="left" class="form-input">
                <el-form-item label="档案来源" style="margin-right:60px">
                    <el-select v-model="form.ywlydm" placeholder="请选择" @change="handleSearch" style="width:302px">
                        <el-option key="0" label="全部" value=""></el-option>
                        <el-option key="1" label="互联网+抵押" value="A"></el-option>
                        <el-option key="2" label="互联网+查封" value="B"></el-option>
                        <el-option key="3" label="苏易登" value="C"></el-option>
                        <el-option key="4" label="互联网+一窗受理" value="D"></el-option>
                        <el-option key="5" label="线下窗口登记" value="z"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="归档日期" >
                    <div class="block" >
                        <el-date-picker
                        v-model="operationFrom"
                        type="date"
                        placeholder="请选择"
                        style="width:136px"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <span style="padding:0 10px">至</span>
                        <el-date-picker
                        v-model="operationTo"
                        type="date"
                        placeholder="请选择"
                        style="width:136px"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <div class="buttom">
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="height:40px;">查询</el-button>
                    <el-button type="primary" @click="getleadout" style="height:40px;">+ 导出</el-button>
                </div>
            </el-form>
            <el-table
                :data="staList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >]
                <el-table-column prop="ywlymc" label="档案来源" align="center"></el-table-column>
                <el-table-column prop="archiveDate" label="归档日期" align="center"></el-table-column>
                <el-table-column prop="totalCount" label="份数" align="center"></el-table-column>
                <el-table-column prop="pageCount" label="页数" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/statistics/index'
export default {
    name: 'basetable',
    data() {
        return {
            form:{
                ywlydm:'',
            },
            query: {
                name: '',
            },
            operationFrom:"",
            operationTo:'',
            staList:[],
            pageTotal: 0,
            id: -1,
        };
    },
    mounted() {
        this.getstaList()
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getstaList()
        },
        //获取列表
        async getstaList() {
            const res = await service.staList({
                operationFrom : this.operationFrom,
                operationTo : this.operationTo,
                type : 1,
                ywlydm : this.form.ywlydm
            })
            this.staList = res
        },
        //导出
        async getleadout() {
            const params = `operationFrom=${this.operationFrom}&operationTo=${this.operationTo}&type=1&ywlydm=${this.form.ywlydm}`
            // window.open(`http://192.168.8.74:8099/archive_statistic/exportExcel?${params}`)
            window.open(`http://192.168.168.51/e-archive/archive_statistic/exportExcel?${params}`)
        },
    }
};
</script>
<style scoped>
.form-input{
    display: flex;
}
.buttom{
    position: absolute;
    right:30px;
}
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
</style>
