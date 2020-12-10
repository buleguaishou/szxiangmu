<template>
    <div>
        <table>
            <tr>
                <th style="">业务来源编码</th>
                <td>{{settlePigeonList.ywlyBm}}</td>
                <th>业务来源</th>
                <td>{{settlePigeonList.ywly}}</td>
            </tr>
            <tr>
                <th>业务编码</th>
                <td>{{settlePigeonList.ywbm}}</td>
                <th>业务名称</th>
                <td>{{settlePigeonList.ywmc}}</td>
            </tr>
            <tr >
                <th >档案编号</th>
                <td colspan=3>
                    <div style="display:flex;justify-content:space-between;margin-right:10px">
                        全宗号：<el-input class="paperview-input" v-model="form.qzh" ></el-input>
                        目录号：<el-input class="paperview-input" v-model="form.mlh" maxlength="3" ></el-input>
                        分类号：<el-input class="paperview-input" v-model="form.flh" ></el-input>
                        保管期限：<el-input class="paperview-input" v-model="form.bgqx" ></el-input>
                        案卷号：<el-input class="paperview-input" v-model="form.ajh" maxlength="5"></el-input>
                    </div>
                </td>
            </tr>
            <tr>
                <th>文件页数</th>
                <td>{{settlePigeonList.wjys}}</td>
                <th>办结年度</th>
                <td>{{settlePigeonList.bjnd}}</td>
            </tr>
            <tr v-if="sourceArchive == 2">
                <th>上传影像</th>
                <td colspan="3">
                    <div style="margin-left:-10px">
                        <!-- <span><img style="margin-right: 5px" src="@/assets/img/message.png" />影像材料尚未传递过来！</span><br /><br /> -->
                        <el-upload
                            class="upload-demo"
                            :auto-upload="false"
                            action="#"
                            :on-change="handleChange"
                            list-type="picture"
                            :show-file-list="false"
                        >
                            <el-input style="width: 60%; display: inline-block" v-model="percentageName" placeholder="请选择影像材料上传"></el-input>
                            <el-progress v-if="percentage" style="position: absolute;width: 220px;" :percentage="this.percentage"></el-progress>
                            <el-button style="margin-left:20px" icon="el-icon-search" type="primary">浏览</el-button> </el-upload
                        >
                        <!-- <span style="color: #6f737e; font-size: 14px">
                            1、上传文件要求：zip格式压缩文件<br />
                            2、解押后第一层文件夹命名规则：上传日期<br />
                            3、第二层文件夹命名规则：该档案的档案编号<br />
                            4、第三层文件夹命名规则：该档案归档目录<br /><br /> -->
                            <a style="float:right;margin:-55px 35px 0 0" href="/demo.zip" class="downloadZIP" download="demo.zip">点击下载参考模板：demo.zip </a>
                        <!-- </span> -->
                    </div>
                </td>
            </tr>
            <!-- <tr>
                <th>归档目录</th>
                <td colspan=3>-</td>
            </tr> -->
        </table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="openEdit">保存</el-button>
            <el-button type="primary" @click="openIn">确定整理</el-button>
        </span>
    </div>
</template>

<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import upload from '@/api/common/index';
import service from '@/api/commission/children/index';
export default {
    data() {
        return {
            tableData: [],
            input:'',
            settlePigeonList:[],
            fileArr:{},
            percentage:'',
            percentageName:'',
            sourceArchive:'',
            form:{
                qzh:'',
                mlh:'',
                flh:'',
                bgqx:'',
                ajh:'',
            }
        };
    },
    mounted() {
        this.getPigeon();
    },
    methods: {
        //获取列表并保存受理单号
        async getPigeon() {
            const res = await service.Pigeon(this.$route.params.sldh);
            this.settlePigeonList = res;
            this.form.qzh = this.settlePigeonList.qzh;
            this.form.mlh = this.settlePigeonList.mlh
            this.form.flh = this.settlePigeonList.flh;
            this.form.bgqx = this.settlePigeonList.bgqx
            this.form.ajh = this.settlePigeonList.ajh
            this.sourceArchive = this.settlePigeonList.sourceArchive
            this.cacheStorage.set("setsldh", this.$route.params.sldh)
        },
        //整理弹框
        openIn() {
            const scope = this
            scope.$confirm('此操作将整理文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                scope.getSettleAffirm()
            }).catch(() => {
            scope.$message({
                type: 'info',
                message: '已取消整理'
            });
            });
        },
        //保存文件
        openEdit() {
            const scope = this
            scope.$confirm('此操作将保存文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                scope.getSettleNumber()
            }).catch(() => {
            scope.$message({
                type: 'info',
                message: '已取消保存'
            });
            });
        },
        //确定整理
        async getSettleAffirm() {
            const validate = this.validate
            if(!validate.isNull(this.form.qzh,"全宗号不能为空")
                || !validate.isNull(this.form.mlh,"目录号不能为空")
                || !validate.isNull(this.form.flh,"分类号不能为空")
                || !validate.isNull(this.form.bgqx,"保管期限不能为空")
                || !validate.isNull(this.form.ajh,"案卷号不能为空")) {
                this.$message.warning(validate.error)
                return
            }
            const res = await service.settleAffirm(this.$route.params.sldh,{
                type : 0,
                ajh: this.form.ajh,
                mlh : this.form.mlh,
                qzh : this.form.qzh,
                flh : this.form.flh,
                bgqx : this.form.bgqx,
            });
            if(res.code){

            }else{
                this.$message.success('整理完成');
                this.$router.push({path:`/commission/storages`})
            }
        },
        //保存
        async getSettleNumber() {
            const res = await service.settleNumber(this.$route.params.sldh,{
                type : 0,
                ajh: this.form.ajh,
                mlh : this.form.mlh,
                qzh : this.form.qzh,
                flh : this.form.flh,
                bgqx : this.form.bgqx,
            });
            if(res.code){

            }else{
                this.$message.success('保存完成');
                this.$router.push({path:`/commission/settle`})
            }
        },
        //上传文件展示
        handleChange(file, fileList) {
            if (file.name.indexOf('.zip') == -1) {
                this.$message.warning('上传文件的格式不正确，请上传zip格式的文件');
                return;
            }
            if (file.size / (1024 * 1024) > 10) {
                this.$message.warning('上传的zip文件不能超过100M');
                return;
            }
            this.percentageName = file.name
            const params = new FormData();
            params.append('file', file.raw);
            params.append('sldh', this.$route.params.sldh);
            this.upZip(params);
        },
        //上传文件地址
        async upZip(file) {
            const res = await upload.upZip(file, (percentage)=> {
                this.percentage = percentage
            });
            if (res.code) {
                if (res.code == 110000) {
                    this.$message.warning(res.message);
                }
                this.percentage = ''
            } else {
                this.percentage = ''
                this.$message.success("影像材料上传成功");
                this.$emit("func", 1)
                this.getPigeon()
            }
        },
    }
};
</script>

<style scoped>
.dialog-footer{
    display: flex;
    justify-content:center;
    padding-top: 50px;
}
table{
    width: 100%;
    border-spacing:0;
    color: #6F737E;
    font-size: 14px;
    border-right: solid 1px #EBEEF5;
    border-bottom: solid 1px #EBEEF5;
}
tr{
    display: flex;
}
th{
    height: 56px;
    border-left: solid 1px #EBEEF5;
    border-top: solid 1px #EBEEF5;
    width: 150px;
    text-align: left;
    padding-left: 16px;
    line-height: 56px;
    display: inline-block;
}
td{
    height: 56px;
    border-left: solid 1px #EBEEF5;
    border-top: solid 1px #EBEEF5;
    text-align: center;
    flex: 1;
    line-height: 56px;
    text-align: left;
    padding-left: 16px;
    display: inline-block;
}
.paperview-input >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 0px;
    width: 100px;
}
.paperview-input{
    display: inline-block;
    border-bottom: solid 2px #EBEEF5;
    width: 10%;
    margin-left: 24px;
}
</style>