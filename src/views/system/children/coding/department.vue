<template>
    <div>
        <el-table
            :data="depList"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
            <el-table-column prop="code" label="部门编码" align="center"></el-table-column>
            <el-table-column prop="name" label="部门名称" align="center"></el-table-column>
            <el-table-column prop="ksName" label="科室名称" align="center"></el-table-column>
            <el-table-column prop="classification" label="所属分类" align="center"></el-table-column>
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
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            depList: [],
            pageTotal: 0,
            form: {},
            visible: false
        };
    },
    created() {
    },
    mounted() {
        this.getdepList()
    },
    methods: {
        //获取列表
        async getdepList() {
            const res = await service.depList()
            this.depList = res
        }
    }
};
</script>

<style scoped>
.el-select{
    margin: 0 0 5px 0;
}
.el-input {
    width: 60%;
    float:right;
    margin-top: -35px;
}
.form-box{
    width:100%;
}
.form-box span{
    font-size: 14px;
    padding-top: 30px;
    display: inline-block;
}
.form-box .el-select{
    margin-top: 30px;
    width: 60%;
    float: right;
}
.table {
    width: 100%;
    font-size: 14px;
}
</style>