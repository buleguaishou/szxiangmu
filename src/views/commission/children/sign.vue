<template>
    <div>
        <div class="handle-box">
            <el-button v-if="examine" type="primary" class="handle-del mr10" @click="back">返回</el-button>
            <el-button type="primary" class="handle-del mr10" @click="visible = true">批量签收</el-button>
            <el-dialog v-dialogDrag title="批量签收" center :visible.sync="visible" width="40%">
                <div v-if="this.batchNoList.length == 0">
                    <span>请先选择文件</span>
                </div>
                <div v-if="this.batchNoList.length > 0">
                    <div class="form-box" width="40%">
                        <el-form ref="form" :model="form" width="40%">
                            确认签收已选批次下面的所有文件 : <span>{{ batchNoList.join('、') }}</span>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="visible = false">取 消</el-button>
                        <el-button type="primary" @click="getsignBatch">签收</el-button>
                    </span>
                </div>
            </el-dialog>
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
        <el-table
            v-if="!examine"
            :data="signList"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="batchNo" label="批次号" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="subCenter" label="提交中心" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="totalCnt" label="文件数目" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="submitDateStr" label="提交日期" align="center"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="openIn(scope.row.batchNo, scope.row.subCenter)">
                        <span>签收</span>
                    </el-button>
                    <el-button type="text" @click="goCompile(scope.row.batchNo, scope.row.subCenter)">
                        <span>查看</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-table
            v-if="examine"
            :data="signsList"
            v-loading="loading"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="sldh" label="收件编号" align="left" :show-overflow-tooltip="true">
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
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="zl" label="坐落" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="djlxMc" label="业务名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="qlrs" label="不动产权利人" align="center" :show-overflow-tooltip="true"></el-table-column>\
            <el-table-column prop="dbrq" label="登薄日期" align="center"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" v-if="!scope.row.failedQuality" @click="opensldh(scope.row.sldh)">
                        <span>签收</span>
                    </el-button>
                    <el-button type="text" v-if="!scope.row.failedQuality" @click="gosldh(scope.row.sldh)">
                        <span>查看</span>
                    </el-button>
                    <el-button type="text" v-if="scope.row.failedQuality" @click="goBack(scope.row.sldh)">
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
                pageIndex: 1,
                pageSize: 10,
                keyWord: ''
            },
            pageTotal: 0,
            multipleSelection: [],
            pageTotal: 0,
            form: {
                archiveCode: ''
            },
            signList: [],
            signsList: [],
            sldhList: [],
            batchNoList: [],
            signBatchList: [],
            status: '',
            visible: false,
            examine: false,
            batchNo: '',
            subCenter: '',
            loading: false
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        this.getsignList();
    },
    methods: {
        // 多选操作
        handleSelectionChange(val) {
            if (this.examine) {
                this.batchNoList = [];
                this.sldhList = [];
                val.forEach((element) => {
                    this.batchNoList.push(element.sldh);
                });
                this.sldhList = this.batchNoList;
            } else {
                this.multipleSelection = val;
                this.batchNoList = [];
                this.signBatchList = [];
                val.forEach((element) => {
                    this.batchNoList.push(element.batchNo);
                });
                val.forEach((element) => {
                    this.signBatchList.push(element.batchNo + '_' + element.subCenter);
                });
            }
        },
        //待签收列表
        async getsignList() {
            const res = await service.signList({
                keyWord: this.query.keyWord,
                page: this.query.pageIndex,
                size: this.query.pageSize
            });
            this.signList = res.data;
            this.pageTotal = res.totalItems;
        },
        //批量/单个
        async getsignBatch() {
            if (this.examine) {
                const res = await service.signBatch({
                    sldh: this.sldhList.join(',')
                });
                if (res.code) {
                } else {
                    this.$message.success('签收成功');
                }
                this.goCompile(this.batchNo, this.subCenter);
            } else {
                const res = await service.signBatch({
                    batchNos: this.signBatchList.join(',')
                });
                if (res.code) {
                } else {
                    this.$message.success('签收成功');
                }
                this.getsignList();
            }
            this.visible = false;
        },
        // 触发搜索按钮
        async handleSearch() {
            this.query.pageIndex = 1;
            this.getsignList();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getsignList();
        },
        //详情
        async goCompile(batchNo, subCenter) {
            this.batchNo = batchNo;
            this.subCenter = subCenter;
            this.examine = true;
            const res = await service.signList({
                keyWord: this.query.keyWord,
                batchNo: batchNo,
                subCenter: subCenter,
                page: this.query.pageIndex,
                size: this.query.pageSize
            });
            this.signsList = res.data;
            this.pageTotal = res.totalItems;
        },
        //单个签收
        openIn(batchNo, subCenter) {
            this.visible = true;
            this.batchNoList = [];
            this.signBatchList = [];
            this.batchNoList.push(batchNo);
            this.signBatchList.push(batchNo + '_' + subCenter);
        },
        opensldh(sldh) {
            this.visible = true;
            this.batchNoList = [];
            this.sldhList = [];
            this.batchNoList.push(sldh);
            this.sldhList = this.batchNoList;
        },
        //跳转归档信息
        async gosldh(sldh) {
            this.$router.push({ path: `/commission/sign/pigeonhole/${sldh}/${3}` });
        },
        //返回
        back() {
            this.examine = false;
            this.getsignList();
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
.mr10 {
    margin-right: 10px;
}
.el-pagination {
    float: right;
    padding: 40px 0 34px 0;
}
.dialog-footer {
    display: flex;
    margin: 50px 0 0 40%;
}
</style>