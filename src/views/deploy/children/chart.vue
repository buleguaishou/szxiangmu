<template>
    <div>
        <div class="container" style="padding-bottom: 100px;">
            <el-table :data="chartList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
                <el-table-column label="业务名称" prop="childType" align="center"></el-table-column>
                <el-table-column label="业务编码" prop="businessCode" align="center"></el-table-column>
                <el-table-column label="材料数量" prop="pageSize" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="goCompile(scope.row.id)"><i><img src="../../../assets/img/user_edit.png"></i>查看</el-button>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page="query.pageIndex"
                :page-size="query.pageSize"
                :total="pageTotal"
                @current-change="handlePageChange">
            </el-pagination>
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
            chartList:[],
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 20
            },
            pageTotal: 0,
        }
        
    },
    mounted() {
        this.getChartList()
    },
    methods: {
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getChartList()
        },
        //获取列表
        async getChartList(){
            const res = await service.chartList({
                page : this.query.pageIndex,
                size : this.query.pageSize
            })
            this.pageTotal = res.totalItems
            this.chartList = res.data;
        },
        //查看详情
        goCompile(id){
            this.$router.push({path:`/deploy/chart/list/${id}`})
        }
    },
};
</script>

<style scoped>
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
</style>
