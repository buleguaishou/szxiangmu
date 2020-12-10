<template>
    <div>
        <div class="container" style="padding-bottom: 100px;">
            <el-form ref="form" :model="search" label-width="80px" label-position="left" class="form-input" style="width:100%">
                <el-form-item label="筛选日期">
                    <div class="block" style="display:flex;">
                        <el-date-picker
                        v-model="operationFrom"
                        type="date"
                        placeholder="请选择"
                        style="width:30%"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <span style="padding:0 10px">至</span>
                        <el-date-picker
                        v-model="operationTo"
                        type="date"
                        placeholder="请选择"
                        style="width:30%"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="日志类型" style="width:30%;margin-left: -100px;">
                    <el-select v-model="search.logType" @change="handleSearch" placeholder="请选择" style="width:136px">
                        <el-option key="1" label="全部" value=""></el-option>
                        <el-option key="2" label="登录" value="登录"></el-option>
                        <el-option key="3" label="创建用户" value="创建用户"></el-option>
                        <el-option key="5" label="修改密码" value="修改密码"></el-option>
                        <el-option key="6" label="重置密码" value="重置密码"></el-option>
                        <el-option key="7" label="冻结用户" value="冻结用户"></el-option>
                        <el-option key="8" label="解冻用户" value="解冻用户"></el-option>
                    </el-select>
                </el-form-item>
                <div class="block" style="display:flex;width:40%">
                    <el-input v-model="search.userName" placeholder="请输入姓名" class="handle-input mr10" @keyup.enter.native="handleSearch"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="margin-left:30px;height:40px;">查询</el-button>
                </div>
            </el-form>
            <el-table
                :data="auditList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >]
                <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                <el-table-column prop="logType" label="日志类型" align="center"></el-table-column>
                <el-table-column prop="userName" label="操作用户" align="center"></el-table-column>
                <el-table-column prop="ipAddr" label="IP地址" align="center"></el-table-column>
                <el-table-column prop="logRecord" label="日志记录" align="center"></el-table-column>
                <el-table-column prop="operationTime" label="操作时间" align="center"></el-table-column>
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
import service from '@/api/audit/children/index'
import bus from '@/components/common/bus';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            search:{},
            operationFrom:"",
            operationTo:'',
            auditList:[],
            pageTotal: 0,
        };
    },
    mounted() {
        this.getauditList()
    },
    methods: {
        // 触发搜索按钮
        async handleSearch() {
            this.query.pageIndex = 1
            this.getauditList()
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getauditList();
        },
        //获取列表
        async getauditList() {
            const res = await service.auditList({
                operationFrom : this.operationFrom,
                operationTo : this.operationTo,
                logType : this.search.logType,
                userName : this.search.userName,
                page : this.query.pageIndex,
                // size : this.query.pageSize,
                status : "1"
            });
            this.auditList = res.data;
            this.pageTotal = res.totalItems
        },
    }
};
</script>
<style scoped>
.form-input{
    display: flex;
    justify-content: space-between;
    color:#606266;
    font-size: 14px;
    width:100%;
}
.demonstration{
    width: 160px;
    line-height: 40px;
}
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
.handle-input{
    width: 85%;
}
</style>