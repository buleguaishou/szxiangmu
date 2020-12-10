<template>
    <div>
        <div class="container" style="padding-bottom: 100px;">
            <div class="handle-box">
                <el-input v-model="query.keyWord" placeholder="请输入档案中的关键字进行查询" class="handle-input mr10" style="width:432px;" @keyup.enter.native="handleSearch"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item >
                        <div style="display:flex;">
                            <img  src="../../../assets/img/search_res.png" style="height: 15px;margin-right:4px"><span>检索结果</span>
                        </div>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-table
                :data="searchList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="ywmc" label="业务名称" align="center"></el-table-column>
                <el-table-column prop="statusName" label="当前状态" align="center"></el-table-column>
                <el-table-column prop="lc" label="流程" align="center" width="80">
                    <template slot-scope="scope">
                        <el-button type="text" @click="goAfter(scope.row.sldh, scope.row.wjys)"><i><img src="../../../assets/img/ic_tree.png" alt=""></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="zl" label="坐落" align="center"></el-table-column>
                <el-table-column prop="qlrs" label="权利人" align="center"></el-table-column>
                <el-table-column prop="dbrq" label="登簿日期" align="center"></el-table-column>
                <el-table-column label="操作" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="goMessage(scope.row.sldh, scope.row.wjys)">
                            <div style="display:flex">
                                <img style="margin-right:2px;" src="../../../assets/img/user_edit.png"><span>查看</span>
                            </div>
                        </el-button>
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
import service from '@/api/search/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                keyWord: '',
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            searchList: [],
        };
    },
    created() {

    },
    mounted() {
        this.getList()
    },
    methods: {
        // 触发搜索按钮
        async handleSearch() {
            this.query.pageIndex = 1
            this.getList()
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getList();
        },
        //获取列表
        async getList() {
            const res = await service.getList({
                keyWord : this.query.keyWord,
                status : 0,
                page : this.query.pageIndex,
                size : this.query.pageSize
            });
            this.searchList = res.data
            this.pageTotal = res.totalItems
        },
        //跳转审计
        async goAfter(sldh, wjys) {
            this.$router.push({path:`/search/list/after/${sldh}/${wjys}`})
        },
        //详情跳转
        async goMessage(sldh, wjys) {
            this.$router.push({path:`/search/list/pigeonhole/${sldh}/${wjys}`})
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.handle-box span{
    font-size: 15px;
    padding-right: 20px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
</style>