<template>
    <div>
        <div class="container">
            <router-link v-if="createRole" to='/user/jurisdiction/add'>
                <el-button style="margin-bottom: 20px" type="primary">+ 新增角色</el-button>
            </router-link>
            <el-table :data="roleList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column label="角色名" prop="name" align="center"></el-table-column>
                <el-table-column label="角色描述" prop="description" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center"> 
                     <template slot-scope="scope"  v-if="scope.row.id !== 1">
                        <el-button type="text" @click="goCompile(scope.row.id)">
                            <div style="display:flex">
                                <img style="margin-right:2px;" src="../../../../assets/img/user_edit.png"><span>编辑</span>
                            </div>
                            </el-button>
                        <el-button type="text" @click="del(scope.row.id)" class="active" >
                            <div style="display:flex">
                                <img style="margin-right:2px;" src="../../../../assets/img/user_delete.png"><span>删除</span>
                            </div>
                            </el-button>
                     </template>
                </el-table-column>
            </el-table>
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
            roleList: [],
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            form: {},
            scope:"",
            id:'',
            createRole:''
        };
    },
    created() {},
    mounted() {
        this.getroleList();
        this.getCode()
    },
    methods: {
        //获取权限
        async getCode() {
            const code = await this.cacheStorage.get("code")
            this.createRole = await code.includes("createRole")
        },
        //删除弹框
        del(id) {
            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.roleDelete(id)
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //获取列表
        async getroleList() {
            const res = await service.roleList();
            this.roleList = res;
        },
        //删除
        async roleDelete(id) {
            const res = await service.roleDelete(id);
            if(res.code) {

            } else {
                this.$message.success("已删除");
                this.getroleList()
            }
        },
        //跳转
        goCompile(id) {
            this.$router.push({path:`/user/jurisdiction/edit/${id}`})
        }
    }
};
</script>
<style scoped>
.active{
    color: #F83831;
}
</style>