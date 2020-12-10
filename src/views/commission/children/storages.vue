<template>
    <div>
        <div class="handle-box">
            <el-button type="primary" class="handle-del mr10" @click="openIn">批量入库</el-button>
            <el-button type="primary" class="handle-del mr10" @click="openOut">批量退回</el-button>
            <div style="float: right">
                <el-input
                    v-model="query.keyWord"
                    placeholder="权利人，坐落，受理单号查询"
                    class="handle-input mr10"
                    @keyup.enter.native="handleSearch"
                ></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
        </div>
        <el-table
            :data="allList"
            v-loading="loading"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="sldh" label="受理单号" align="left" :show-overflow-tooltip="true">
                <template slot-scope="scope" style="height: 100%; position: relative">
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
                </template>
            </el-table-column>
            <el-table-column prop="ywmc" label="登记类型" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="zl" label="坐落" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="qlrs" label="权利人" align="center"></el-table-column>
            <el-table-column prop="finishDate" label="整理完成时间" :show-overflow-tooltip="true" align="center"></el-table-column>
            <el-table-column label="操作" width="180" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        v-if="!scope.row.failedQuality && !scope.row.failedSigned"
                        @click="goCompile( scope.row.sldh, scope.row.wjys)"
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
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            sldhs: [],
            allList: [],
            status: '',
            loading: false
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        this.getallList();
    },
    methods: {
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.sldhs = [];
            val.forEach((element) => {
                this.sldhs.push(element.sldh);
            });
        },
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
                status: 2,
                keyWord: this.query.keyWord,
                page: this.query.pageIndex,
                size: this.query.pageSize
            });
            this.allList = res.data;
            this.pageTotal = res.totalItems;
        },
        //跳转
        goCompile( sldh, wjys) {
            this.$router.push({ path: `/commission/storages/pigeonhole/${sldh}/${2}` });
        },
        //批量入库
        openIn() {
            const scope = this;
            if (this.sldhs.length == 0) {
                this.$message.warning('请先选择文件');
                return;
            }
            scope
                .$confirm('点击确定后，该批档案将正式入库，并无法修改!', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    scope.status = 4;
                    scope.getstoredAffirm();
                })
                .catch(() => {
                    scope.$message({
                        type: 'info',
                        message: '已取消入库'
                    });
                });
        },
        //退回
        openOut() {
            if (this.sldhs.length == 0) {
                this.$message.warning('请先选择文件');
                return;
            }
            this.$prompt('点击确定后，该批档案将退回至待整理，重新入库!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: '',
                inputType: 'textarea'
            })
                .then(({ value }) => {
                    this.status = 3;
                    this.getstoredAffirm(value);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消退回'
                    });
                });
        },
        //入库/退回
        async getstoredAffirm(reason) {
            const { sldhs, status } = this;
            if (status == 3 && !reason) {
                this.$message.warning('请输入退回原因');
                return;
            }
            this.loading = true
            const res = await service.storedAffirm(sldhs.join('、'), { status, reason });
            this.loading = false
            if (res.code) {
            } else {
                if (status == 3) {
                    this.$message.success('批量退回成功');
                } else if (status == 4) {
                    this.$message.success('批量入库成功');
                }
                this.getallList();
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
</style>