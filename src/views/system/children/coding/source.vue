<template>
    <div>
        <el-table
            :data="sourceList"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
            <el-table-column prop="code" label="业务来源编码" align="center" width="200"></el-table-column>
            <el-table-column prop="name" label="业务来源名称" align="center"></el-table-column>
            <el-table-column prop="" label="状态" align="center" width="100">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        :active-value = "1"
                        :inactive-value = "0"
                        @change="opensourceStat(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="" label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button @click="getbusEdit(scope.row)" type="text"><i><img src="../../../../assets/img/user_edit.png" /></i>编辑</el-button>
                    <el-button @click="openbusDel(scope.row.id)"  type="text" style="color:red"><i><img src="../../../../assets/img/user_delete.png" /></i>删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/system/business/index'
export default {
    name: 'basetable',
    data() {
        return {
            sourceList:[]
        }
    },
    mounted() {
        this.getsourceList()
    },
    methods: {
        //获取列表
        async getsourceList() {
            const res = await service.sourceList()
            this.sourceList = res
        },
        //状态改变
        opensourceStat(row) {
            const status = row.status
            row.status = row.status ? 0 : 1;
            this.$confirm('此操作将改变该条业务的状态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.getsourceState(row.id, status)
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消改变'
            });          
            });
        },
        //改变状态
        async getsourceState(id,status) {
            const res = await service.sourceState(id,status)
            this.$message.success('更改状态成功');
            this.getsourceList()
        },
    },
};
</script>

<style scoped>
.el-select{
    margin: 0 0 5px 0;
}
.form-box{
    width:100%;
}
.table {
    width: 100%;
    font-size: 14px;
}
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
</style>