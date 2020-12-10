<template>
    <div class="container">
        <el-table
            :data="deployList"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            style="color:#333A4D"
        >
            <el-table-column prop="name" label="接口名称" align="center" ></el-table-column>
            <el-table-column prop="path" label="接口地址" align="center"></el-table-column>
            <el-table-column prop="username" label="接口账号" align="center" width="200"></el-table-column>
            <el-table-column prop="password" label="接口密码" align="center" width="200"></el-table-column>
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
            deployList:[]
        }
    },
    mounted() {
        this.getdeployList()
    },
    methods: {
        //获取列表
        async getdeployList() {
            const res = await service.deployList()
            this.deployList = res
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
.el-table-column{
    color:#333A4D;
    font-size: 14px;
}
</style>