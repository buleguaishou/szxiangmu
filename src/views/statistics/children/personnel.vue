<template>
    <div>
        <div class="container" style="padding-bottom: 100px;">
            <el-form ref="form" :model="form" label-width="80px" label-position="left" class="form-input">
                <el-form-item label="档案人员" >
                    <el-select v-model="form.users" placeholder="请选择" @change="handleSearch" style="width:136px">
                        <el-option v-for="(val,index) in userLsit" :key="index" :label="val.name" :value="val.name" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="利用方式" >
                    <el-select v-model="usedType" placeholder="请选择" @change="handleSearch" style="width:136px">
                        <el-option v-for="item in usedTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="档案来源" >
                    <el-select v-model="form.ywlydm" placeholder="请选择" @change="handleSearch" style="width:518px">
                        <el-option key="0" label="全部" value=""></el-option>
                        <el-option key="1" label="互联网+抵押" value="A"></el-option>
                        <el-option key="2" label="互联网+查封" value="B"></el-option>
                        <el-option key="3" label="苏易登" value="C"></el-option>
                        <el-option key="4" label="互联网+一窗受理" value="D"></el-option>
                        <el-option key="5" label="线下窗口登记" value="z"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form label-width="80px" label-position="left">
                <el-form-item label="统计日期" style="display:inline-block">
                    <div class="block" >
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
                <div style="float: right;margin-bottom:28px">
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="height:40px;">查询</el-button>
                    <el-button type="primary" @click="getleadout" style="height:40px;">+ 导出</el-button>
                </div>
            </el-form>
            <el-table
                :data="staList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="userName" label="档案人员" align="center"></el-table-column>
                <el-table-column prop="usedType" label="利用方式" align="center"></el-table-column>
                <el-table-column prop="ywlymc" label="业务来源" align="center"></el-table-column>
                <el-table-column prop="archiveDate" label="统计日期" align="center"></el-table-column>
                <el-table-column prop="totalCount" label="次数" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import { apiBaseUrl } from '@/config';
import service from '@/api/statistics/index'
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                name: '',
            },
            usedTypeList:[
                {value:'',label:"全部"},
                {value:'查阅',label:"查阅"},
                {value:'下载',label:"下载"},
                {value:'借阅',label:"借阅"},
            ],
            usedType:'查阅',
            operationFrom:"",
            operationTo:"",
            staList:[],
            userLsit:[],
            pageTotal: 0,
            form: {
                users:'',
                ywlydm:'',
            },
        };
    },
    mounted() {
        this.getstaList()
        this.getuserLsit()
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getstaList()
        },
        //获取管理人员下拉框列表
        async getuserLsit() {
            const res = await service.userLsit()
            this.userLsit = res
        },
        //获取列表
        async getstaList() {
            const res = await service.staList({
                operationFrom : this.operationFrom,
                operationTo : this.operationTo,
                usedType: this.usedType,
                users : this.form.users,
                type : 3,
                ywlydm : this.form.ywlydm
            })
            this.staList = res
        },
        //导出
        async getleadout() {
            // const user = encodeURI(this.form.users)
            const params = `operationFrom=${this.operationFrom}&operationTo=${this.operationTo}&usedType=${encodeURI(this.usedType)}&users=${encodeURI(this.form.users)}&type=3&ywlydm=${this.form.ywlydm}`
            // window.open(`http://192.168.2.237:8099/archive_statistic/exportExcel?${params}`)
            window.open(`http://192.168.168.51/e-archive/archive_statistic/exportExcel?${params}`)
        },
    }
};
</script>
<style scoped>
.form-input{
    display: flex;
    justify-content: space-between;
}
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
</style>