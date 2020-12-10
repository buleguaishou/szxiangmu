<template>
    <div>
        <div class="handle-box">
            <span style="font-size: 14px; color: #333a4d">按照状态筛选</span>
            <el-select v-model="query.selectType" @change="handleSearch" placeholder="请选择" style="width: 136px; margin-left: 10px">
                <el-option key="1" label="全部" value=""></el-option>
                <el-option key="2" label="待签收" value="0"></el-option>
                <el-option key="3" label="待整理" value="1"></el-option>
                <el-option key="4" label="待入库" value="2"></el-option>
                <el-option key="5" label="已入库" value="4"></el-option>
            </el-select>
            <div style="float: right">
                <el-input
                    v-model="query.keyWord"
                    placeholder="关键字查询"
                    class="handle-input mr10"
                    @keyup.enter.native="handleSearch"
                ></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
        </div>
        <el-table :data="allList" v-loading="loading" border class="table" ref="multipleTable" header-cell-class-name="table-header">
            <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column label="受理单号" align="left" :show-overflow-tooltip="true" width="150">
                <template slot-scope="scope" style="position: relative">
                    <p>{{ scope.row.sldh }}</p>
                    <div v-if="!scope.row.reason">
                        <el-tooltip placement="top" effect="light">
                            <div slot="content" popper-class="item">{{ scope.row.failedQuality }}</div>
                            <el-button
                                v-if="scope.row.failedQuality"
                                type="text"
                                style="
                                    width: 70px;
                                    height: 25px;
                                    font-size: 10px;
                                    background: rgba(248, 56, 49, 0.2);
                                    border: 0px;
                                    padding: 0px;
                                    border-radius: 9px;
                                    color: #f83831;
                                "
                                >质检不通过</el-button
                            >
                        </el-tooltip>
                        <el-tooltip placement="top" effect="light">
                            <div slot="content" popper-class="item">{{ scope.row.failedSigned }}</div>
                            <el-button
                                v-if="scope.row.failedSigned && !scope.row.failedQuality"
                                style="
                                    width: 70px;
                                    height: 25px;
                                    font-size: 10px;
                                    background: rgba(248, 56, 49, 0.2);
                                    border: 0px;
                                    padding: 0px;
                                    border-radius: 9px;
                                    color: #f83831;
                                "
                                >验签不通过</el-button
                            >
                        </el-tooltip>
                        <el-button v-if="scope.row.failedSigned && !scope.row.failedQuality" @click="downlooser(scope.row.sldh)" type="text">下载</el-button>
                    </div>
                    <el-tooltip placement="top" effect="light">
                        <div slot="content" popper-class="item">退回原因：{{ scope.row.reason }}</div>
                        <el-button
                            v-if="scope.row.statusName == '待整理' && scope.row.reason"
                            style="
                                width: 60px;
                                height: 25px;
                                font-size: 10px;
                                background: rgba(248, 56, 49, 0.2);
                                border: 0px;
                                padding: 0px;
                                border-radius: 9px;
                                color: #f83831;
                            "
                            >入库退回</el-button
                        >
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="ywmc" label="业务名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ywly" label="业务来源" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="statusName" label="当前状态" align="center"></el-table-column>
            <el-table-column prop="zl" label="坐落" align="center"></el-table-column>
            <el-table-column prop="qlrs" label="权利人" align="center"></el-table-column>
            <el-table-column label="流程" align="center" width="50">
                <template slot-scope="scope">
                    <el-button type="text" @click="goAfter(scope.row.statusName, scope.row.sldh)"
                        ><i><img src="../../../assets/img/ic_tree.png" alt="" /></i
                    ></el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        v-if="!scope.row.failedQuality && !scope.row.failedSigned"
                        @click="goCompile(scope.row.statusName, scope.row.sldh, scope.row.wjys)"
                    >
                        <div style="display: flex">
                            <img style="margin-right: 2px" src="../../../assets/img/user_edit.png" /><span>查看</span>
                        </div>
                    </el-button>
                    <el-button type="text" v-if="scope.row.failedQuality" @click="goBack(scope.row.sldh)">
                        <span style="color: orange">重新获取</span>
                    </el-button>
                    <el-button type="text" v-if="scope.row.failedSigned && !scope.row.failedQuality" @click="goBacktow(scope.row.sldh)">
                        <span style="color: orange">重新获取</span>
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
            @current-change="handlePageChange"
        >
        </el-pagination>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/commission/children/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                keyWord: '',
                selectType: '',
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            ids: [],
            allList: [],
            status: '',
            loading: false
        };
    },
    mounted() {
        this.getallList();
    },
    methods: {
        // // 多选操作
        // handleSelectionChange(val) {
        //     this.multipleSelection = val;
        //     this.ids = []
        //     val.forEach(element => {
        //         this.ids.push(JSON.stringify(element.id))
        //     });
        // },
        // 触发搜索按钮
        async handleSearch() {
            this.query.pageIndex = 1;
            this.getallList();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getallList();
        },
        //获取列表
        async getallList() {
            const res = await service.allList({
                status: 0,
                keyWord: this.query.keyWord,
                selectType: this.query.selectType,
                page: this.query.pageIndex,
                size: this.query.pageSize
            });
            this.allList = res.data;
            this.pageTotal = res.totalItems;
        },
        //跳转
        goCompile(statusName, sldh, wjys) {
            if (statusName == '待签收') {
                this.$router.push({ path: `/commission/sign/pigeonhole/${sldh}/${3}` });
            }
            if (statusName == '待整理') {
                if (wjys == 0) {
                    this.$router.push({ path: `/commission/settle/pigeonhole/${sldh}/${0}` });
                    return;
                }
                this.$router.push({ path: `/commission/settle/pigeonhole/${sldh}/${1}` });
            }
            if (statusName == '待入库') {
                this.$router.push({ path: `/commission/storages/pigeonhole/${sldh}/${2}` });
            }
            if (statusName == '已入库') {
                this.$router.push({ path: `/search/list/pigeonhole/${sldh}/${wjys}` });
            }
        },
        //跳转审计
        async goAfter(statusName, sldh) {
            if (statusName == '待签收') {
                this.$router.push({ path: `/commission/sign/after/${sldh}/${3}` });
            }
            if (statusName == '待整理') {
                this.$router.push({ path: `/commission/settle/after/${sldh}/${1}` });
            }
            if (statusName == '待入库') {
                this.$router.push({ path: `/commission/storages/after/${sldh}/${2}` });
            }
            if (statusName == '已入库') {
                this.$router.push({ path: `/search/list/after/${sldh}/${wjys}` });
            }
        },
        async goBack(sldh) {
            const res = await service.nopass(sldh);
            if (res.code) {
            } else {
                this.loading = true;
                clearTimeout(this.timer); //清除延迟执行
                this.timer = setTimeout(() => {
                    //设置延迟执行
                    this.loading = false;
                }, 10000);
            }
            this.getallList();
        },
        async goBacktow(sldh) {
            const res = await service.signpass(sldh);
            if (res.code) {
            } else {
                this.getallList();
            }
        },
        async downlooser(sldh) {
            window.open(`http://192.168.168.51/e-archive/file/downloadError/${sldh}`)
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.handle-input {
    width: 300px;
    display: inline-block;
}
.form-input {
    display: flex;
    justify-content: space-between;
    color: #606266;
    font-size: 14px;
}
.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
.el-pagination {
    float: right;
    padding: 40px 0 34px 0;
}
/* .pass{
    height:100%;
    background: url("../../../assets/img/commission_pass.png") no-repeat;
} */
</style>