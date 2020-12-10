<template>
    <div>
        <div class="container" style="padding-bottom: 100px;">
            <el-form ref="form" :model="query" label-width="80px" class="form-input" label-position="left" style="display:flex;justify-content:space-between">
                <el-form-item label="筛选日期" style="width:65%">
                    <div class="block">
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
                <el-input v-model="query.parameter"  style="width:432px;" placeholder="您可以输入档案中档案号或姓名进行检索" class="handle-input mr10 " @keyup.enter.native="handleSearch"></el-input>
                <el-button   type="primary" icon="el-icon-search" @click="handleSearch" style="height:40px" >查询</el-button>
            </el-form>
            <el-table
                :data="borrowList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="serialNo" label="流水号" align="center" width="130"></el-table-column>
                <el-table-column prop="applicationName" label="申请人" align="center" width="150"></el-table-column>
                <el-table-column prop="applicationType" label="类别" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="archiveCode" label="查阅档案号" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="borrowDate" label="借阅日期" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column  label="状态" align="center" width="100" >
                    <template slot-scope="scope">
                        <span :class="scope.row.status=='1' ? 'red' : ''">{{scope.row.statusName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="借阅申请表" width="150" align="center">
                    <template slot-scope="scope" >
                        <el-button type="text" v-if="scope.row.status=='1'" @click="openDel(scope.row.id)">删除</el-button>
                        <el-button type="text" v-if="scope.row.status=='1'"  @click="goList(scope.row.id,scope.row.applicationType)">编辑</el-button>
                        <el-button type="text" v-if="scope.row.status=='2'" @click="goList(scope.row.id,scope.row.applicationType)">查看申请表</el-button>
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
import service from '@/api/borrow/children/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            borrowList: [],
            operationFrom:'',
            operationTo:'',
        };
    },
    created() {

    },
    mounted() {
        this.getBorrowList()
    },
    methods: {
        // 触发搜索按钮
        async handleSearch() {
            this.query.pageIndex = 1
            this.getBorrowList()
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getBorrowList()
        },
        //获取列表
        async getBorrowList() {
            const res = await service.borrowList({
                operationFrom:this.operationFrom,
                operationTo:this.operationTo,
                parameter:this.query.parameter,
                page : this.query.pageIndex,
                // size : this.query.pageSize
            });
            this.borrowList = res.data
            this.pageTotal = res.totalItems
        },
        //通过不同的name跳转
        async goList(id,applicationType) {
            if(applicationType=='不动产权利人'){
                this.$router.push({path:`/borrow/apply/title/${id}`})
            } else if(applicationType=='利害关系人'){
                this.$router.push({path:`/borrow/apply/terrible/${id}`})
            }else{
                this.$router.push({path:`/borrow/apply/office/${id}`})
            }
        },
        //删除弹框
        openDel(id) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.borrowDel(id)
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
            });
        },
        //删除请求
        async borrowDel(id) {
            const res = await service.borrowDel(id);
            if(res.code) {

            } else {
                this.$message.success('删除成功');
                this.getBorrowList()
            }
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
    width: 500px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
.red{
    color:red
}
.floatRight{
    float: right;
}
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
</style>