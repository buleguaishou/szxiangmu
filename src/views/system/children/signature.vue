<template>
    <div>
        签章管理
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