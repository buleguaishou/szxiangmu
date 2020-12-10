<template>
    <div>
        <el-table
            :data="fileList"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
            <el-table-column prop="code" label="业务分类代码" align="center" width="200"></el-table-column>
            <el-table-column prop="name" label="文件分类" align="center"></el-table-column>
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
            fileList:[]
        }
    },
    mounted() {
        this.getfileList()
    },
    methods: {
        //获取列表
        async getfileList() {
            const res = await service.fileList()
            this.fileList = res
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