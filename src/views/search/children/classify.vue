<template>
    <div>
        <div class="container" style="padding-bottom: 100px;">
            <div class="form-box" style="display:flex;justify-content:space-between">
                <el-form ref="form" :model="form" label-width="80px" label-position="left" class="form-input">
                    <el-form-item label="登簿日期" style="width:35%">
                        <div class="block" >
                            <el-date-picker
                            v-model="dbrqFrom"
                            type="date"
                            placeholder="请选择"
                            style="width:134px"
                            value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                            <span style="padding:0 10px">至</span>
                            <el-date-picker
                            v-model="dbrqTo"
                            type="date"
                            placeholder="请选择"
                            style="width:134px"
                            value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="办结年度" style="width:23%;margin-right:12%">
                        <div class="block">
                            <el-date-picker
                            v-model="bjnd"
                            type="year"
                            value-format="yyyy"
                            placeholder="选择年"
                            style="width:100%"
                            >
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="档案号" label-width="65px" style="width:30%;">
                        <el-input v-model="form.archiveCode" @keyup.enter.native="handleSearch"></el-input>
                    </el-form-item>
                    <el-form-item label="业务来源" style="width:35%">
                        <el-select v-model="form.ywlyBm" placeholder="请选择" @change="handleSearch"  style="width:300px">
                            <el-option key="0" label="全部" value=""></el-option>
                            <el-option key="1" label="互联网+抵押" value="A"></el-option>
                            <el-option key="2" label="互联网+查封" value="B"></el-option>
                            <el-option key="3" label="苏易登" value="C"></el-option>
                            <el-option key="4" label="互联网+一窗受理" value="D"></el-option>
                            <el-option key="5" label="线下窗口登记" value="z"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权利人" style="width:23%;margin-right:12%">
                        <el-input v-model="form.qlr" style="width:100%" @keyup.enter.native="handleSearch"></el-input>
                    </el-form-item>
                    <el-form-item label="权证号" label-width="65px" style="width:30%">
                        <el-input v-model="form.qzh" @keyup.enter.native="handleSearch"></el-input>
                    </el-form-item>
                    <el-form-item label="坐落" style="width:58%">
                        <el-input v-model="form.zl" @keyup.enter.native="handleSearch"></el-input>
                    </el-form-item>
                    <el-button style="height:40px;position: absolute;top: 156px;right: 33px;" type="primary" icon="el-icon-search" @click="handleSearch" >查询</el-button>
                </el-form>
            </div>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
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
                <el-table-column prop="archiveCode" label="档案号" align="center"></el-table-column>
                <el-table-column prop="lc" label="流程" align="center" width="80">
                    <template slot-scope="scope">
                        <el-button type="text" @click="goAfter(scope.row.sldh, scope.row.wjys)"><i><img src="../../../assets/img/ic_tree.png" alt=""></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="ywmc" label="业务名称" align="center"></el-table-column>
                <el-table-column prop="ywly" label="业务来源" align="center"></el-table-column>
                <el-table-column prop="statusName" label="当前状态" align="center"></el-table-column>
                <el-table-column prop="bdcqzsh" label="权证号" align="center"></el-table-column>
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
            form:{
                ywlyBm:'',
                region: '',
                archiveCode:'',
                qlr:'',
                qzh:'',
                zl:'',
            },
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            dbrqFrom:'',
            dbrqTo:'',
            bjnd:'',
            searchList:[],
            form: {},
        };
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
                dbrqFrom : this.dbrqFrom,
                dbrqTo : this.dbrqTo,
                bjnd : this.bjnd,
                archiveCode : this.form.archiveCode,
                ywlyBm : this.form.ywlyBm,
                qlr : this.form.qlr,
                qzh : this.form.qzh,
                zl : this.form.zl,
                page : this.query.pageIndex,
                size : this.query.pageSize
            });
            this.searchList = res.data
            this.pageTotal = res.totalItems
        },
        //详情跳转
        async goMessage(sldh,wjys) {
            this.$router.push({path:`/search/list/pigeonhole/${sldh}/${wjys}`})
        },
        //跳转审计
        async goAfter(sldh,wjys) {
            this.$router.push({path:`/search/list/after/${sldh}/${wjys}`})
        },
    }
};
</script>

<style scoped>
.form-box{
    width: 100%;
}
.form-input{
    display: flex;
    flex-wrap: wrap ;
}
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap
{
    overflow: scroll!important;
}
</style>