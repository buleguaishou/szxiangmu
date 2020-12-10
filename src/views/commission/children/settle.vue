<template>
    <div>
        <div class="handle-box">
            <el-button type="primary" class="handle-del mr10" @click="visible = true">批量编号</el-button>
            <el-dialog v-dialogDrag title="批量编号" center :visible.sync="visible" width="40%">
                <div v-if="this.sldhList.length == 0">
                    <span>请先选择文件</span>
                </div>
                <div v-if="this.sldhList.length > 0">
                    <div class="form-box" width="40%">
                        <el-form ref="form" :model="form" width="40%">
                            所选审批表号：<span>{{ sldhList.join('、') }}</span>
                            <el-form-item label="目录号：" style="margin-top: 30px">
                                <el-input v-model="form.mlh"></el-input>
                            </el-form-item>
                            <div style="display: flex">
                                <span style="line-height: 40px; width: 68px">案卷号：</span>
                                <el-form-item style="margin-right: 10px">
                                    <el-input v-model="form.ajhStart"></el-input>
                                </el-form-item>
                                <el-form-item label="至">
                                    <el-input v-model="form.ajhEnd"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="visible = false">取 消</el-button>
                        <el-button type="primary" v-debounceClick="getSettleNumber">批量编号</el-button>
                    </span>
                </div>
            </el-dialog>
            <el-button type="primary" class="handle-del mr10" @click="settle = true">批量整理</el-button>
            <el-dialog v-dialogDrag title="批量整理" center :visible.sync="settle" width="40%">
                <div v-if="this.sldhList.length == 0">
                    <span>请先选择文件</span>
                </div>
                <div v-if="this.sldhList.length > 0">
                    所选审批表号：<span>{{ sldhList.join('、') }}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="settle = false">取 消</el-button>
                        <el-button type="primary" v-debounceClick="getSettleAffirm">批量整理</el-button>
                    </span>
                </div>
            </el-dialog>
            <div style="float: right">
                <span style="font-size: 14px; color: #333a4d">业务来源</span>
                <el-select v-model="query.ywlyBm" placeholder="请选择" @change="handleSearch" style="width: 136px; margin-left: 10px; margin-right: 30px">
                    <el-option key="0" label="全部" value=""></el-option>
                    <el-option key="1" label="互联网+抵押" value="A"></el-option>
                    <el-option key="2" label="互联网+查封" value="B"></el-option>
                    <el-option key="3" label="苏易登" value="C"></el-option>
                    <el-option key="4" label="互联网+一窗受理" value="D"></el-option>
                    <el-option key="5" label="线下窗口登记" value="z"></el-option>
                </el-select>
                <el-input
                    v-model="query.keyWord"
                    placeholder="权利人，坐落，受理单号等查询"
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
                            v-if="scope.row.reason"
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
            <el-table-column prop="qzh" label="全宗号" align="center"></el-table-column>
            <el-table-column prop="flh" label="分类号" align="center"></el-table-column>
            <el-table-column prop="mlh" label="目录号" align="center"></el-table-column>
            <el-table-column prop="ajh" label="案卷号" align="center"></el-table-column>
            <el-table-column prop="qlrs" label="权利人" align="center"></el-table-column>
            <el-table-column prop="zl" label="坐落" align="center"></el-table-column>
            <el-table-column prop="ywly" label="业务来源" align="center"></el-table-column>
            <el-table-column prop="receiveDate" label="接收日期" align="center" :show-overflow-tooltip="true"></el-table-column>
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
                ywlyBm: '',
                keyWord: '',
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            visible: false,
            settle: false,
            allList: [],
            multipleSelection: [],
            delList: [],
            sldhList: [],
            form: {
                mlh: '',
                ajhStart: '',
                ajhEnd: ''
            },
            loading: false
        };
    },
    mounted() {
        this.getallList();
    },
    methods: {
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.sldhList = [];
            val.forEach((element) => {
                this.sldhList.push(element.sldh);
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
                ywlyBm: this.query.ywlyBm,
                status: 1,
                keyWord: this.query.keyWord,
                page: this.query.pageIndex,
                size: this.query.pageSize
            });
            this.pageTotal = res.totalItems;
            this.allList = res.data;
        },
        //跳转
        goCompile(sldh, wjys) {
            if (wjys == 0) {
                this.$router.push({ path: `/commission/settle/pigeonhole/${sldh}/${0}` });
                return;
            }
            this.$router.push({ path: `/commission/settle/pigeonhole/${sldh}/${1}` });
        },
        //批量编号
        async getSettleNumber() {
            if (this.form.mlh.length != 3 || this.form.ajhEnd.length != 5 || this.form.ajhStart.length != 5) {
                this.$message.warning('您提交的目录号/案卷号不正确，请确认目录号/案卷号符合规范要求');
                return;
            }
            const res = await service.settleNumber(this.sldhList.join('、'), {
                type: 1,
                ajhEnd: this.form.ajhEnd,
                ajhStart: this.form.ajhStart,
                mlh: this.form.mlh
            });
            if (res.code) {
            } else {
                this.$message.success('批量编号成功');
                this.visible = false;
                this.form.mlh = '';
                this.form.ajhEnd = '';
                this.form.ajhStart = '';
                this.getallList();
            }
        },
        //批量整理
        async getSettleAffirm() {
            const res = await service.settleAffirm(this.sldhList.join('、'), {
                type: 1
            });
            if (res.code) {
            } else {
                this.$message.success('批量整理成功');
                this.settle = false;
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
.form-box {
    width: 90%;
}
.el-pagination {
    float: right;
    padding: 40px 0 34px 0;
}
.el-form-item {
    display: flex;
}
.dialog-footer {
    display: flex;
    margin: 50px 0 0 40%;
}
</style>