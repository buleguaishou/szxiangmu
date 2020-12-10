<template>
    <div>
        <div class="container" style="padding-bottom: 100px;">
            <div class="handle-box">
                <router-link v-if="createUser" to="/user/list/add">
                    <el-button type="primary">+创建用户</el-button>
                </router-link>
                <div style="float: right">
                    <el-input v-model="search.name" placeholder="请输入姓名" class="handle-input mr10" @keyup.enter.native="handleSearch"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                </div>
            </div>
            <el-table :data="userList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="account" label="账号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="roles" label="角色" align="center"></el-table-column>
                <el-table-column prop="" label="状态" align="center">
                    <template slot-scope="scope">
                        <span :class="{ active: scope.row.statusCode == 0 }">{{ scope.row.statusName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" align="center">
                    <template slot-scope="scope" v-if="scope.row.id !== 1">
                        <el-button @click="goCompile(scope.row.id)" type="text">
                            <div style="display:flex">
                                <img style="margin-right:2px;" src="../../../../assets/img/user_edit.png" /><span>编辑</span>
                            </div>
                        </el-button>
                        <el-button @click="Frost(scope.row.id, scope.row.statusCode)" type="text">
                            <div v-if="scope.row.statusCode == 0" style="display:flex">
                                <img  style="margin-right:2px;" src="../../../../assets/img/user_thaw.png" /><span>解冻</span>
                            </div>
                            <div v-if="scope.row.statusCode == 1" class="active" style="display:flex">
                                <img  style="margin-right:2px;" src="../../../../assets/img/user_frozen.png" /><span>冻结</span>
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
import service from '@/api/userCenter/role/index';
export default {
    name: 'basetable',
    data() {
        return {
            search: {
                name: ''
            },
            userList: [],
            code: '',
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            createUser:''
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        this.getuserList();
        this.getCode()
    },
    methods: {
        // 触发搜索按钮
        async handleSearch() {
            this.query.pageIndex = 1
            this.getuserList()
        },
        //获取权限
        async getCode() {
            const code = await this.cacheStorage.get("code")
            this.createUser = await code.includes( "createUser")
        },
        //获取列表
        async getuserList() {
            const res = await service.userList({
                userName: this.search.name,
                page : this.query.pageIndex,
                size : this.query.pageSize
            });
            this.userList = res.data;
            this.pageTotal = res.totalItems
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getuserList()
        },
        //跳转
        goCompile(id, code) {
            this.$router.push({ path: `/user/list/edit/${id}` });
        },
        //弹窗
        Frost(id, code) {
            code = code ? 0 : 1;
            const message = code === 0 ? '冻结' : '解冻';
            this.$confirm(`此操作将${message}该用户, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.putuserFrost(id, code, message);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        },
        //冻结/解冻
        async putuserFrost(id, code, message) {
            const res = await service.userFrost(id, code);
            if (res.code) {
                // error do something
            } else {
                this.$message.success(`已${message}`);
                this.getuserList();
            }
        },
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.handle-box span {
    font-size: 15px;
    padding-right: 20px;
}
.container {
    margin-bottom: 20px;
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
.active {
    color: #ff790e;
}
img {
    padding-right: 3px;
}
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
</style>