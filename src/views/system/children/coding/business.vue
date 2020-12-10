<template>
    <div>
        <section class="main">
            <el-form ref="form" :model="form" label-width="80px" class="form-input">
                <el-button type="primary" @click="visible = true" style="">+新增登记子类型</el-button>
                <el-dialog v-dialogDrag title="新增登记子类型" center :visible.sync="visible" width="40%">
                    <div class="container">
                        <div class="form-box" >
                            <el-form ref="form" :model="form" label-width="80px" class="form-input">
                                <el-form-item label="所属登记类型" label-width="120px" style="width:60%">
                                    <el-select v-model="form.registerType" placeholder="请选择" style="width:100%;">
                                        <el-option key="1" label="首次登记" value="FIRST_REGISTER"></el-option>
                                        <el-option key="2" label="转移登记" value="TRANSFER_REGISTER"></el-option>
                                        <el-option key="3" label="变更登记" value="CHANGE_REGISTER"></el-option>
                                        <el-option key="4" label="注销登记" value="WRITE_OFF_REGISTER"></el-option>
                                        <el-option key="5" label="更正登记" value="CORRECT_REGISTER"></el-option>
                                        <el-option key="6" label="异议登记" value="DISSENT_REGISTER"></el-option>
                                        <el-option key="7" label="预告登记" value="ADVANCE_NOTICE_REGISTER"></el-option>
                                        <el-option key="8" label="查封登记" value="CLOSE_DOWN_REGISTER"></el-option>
                                        <el-option key="9" label="其他登记" value="OTHER_REGISTER"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="子类型名称" label-width="120px" style="width:60%;">
                                    <el-input v-model="form.childType" placeholder="抵押权（原他项权证）注销登记" style="width:100%;"></el-input>
                                </el-form-item>
                                <el-form-item label="业务编码" label-width="120px" style="width:60%;">
                                    <el-input v-model="form.code" placeholder="12304400" style="width:100%;"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="visible = false">取 消</el-button>
                        <el-button type="primary" @click="postbusAdd" >确 定</el-button>
                    </span>
                </el-dialog>
                <el-form-item  style="width:30%;float:right;">
                    <el-select v-model="query.registerType" placeholder="按照业务类型查看" style="width:100%" @change='handleSearch'>
                        <el-option key="1" label="首次登记" value="FIRST_REGISTER"></el-option>
                        <el-option key="2" label="转移登记" value="TRANSFER_REGISTER"></el-option>
                        <el-option key="3" label="变更登记" value="CHANGE_REGISTER"></el-option>
                        <el-option key="4" label="注销登记" value="WRITE_OFF_REGISTER"></el-option>
                        <el-option key="5" label="更正登记" value="CORRECT_REGISTER"></el-option>
                        <el-option key="6" label="异议登记" value="DISSENT_REGISTER"></el-option>
                        <el-option key="7" label="预告登记" value="ADVANCE_NOTICE_REGISTER"></el-option>
                        <el-option key="8" label="查封登记" value="CLOSE_DOWN_REGISTER"></el-option>
                        <el-option key="9" label="其他登记" value="OTHER_REGISTER"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </section>
        <el-table
            :data="busList"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
            <el-table-column prop="businessCode" label="业务编码" align="center" width="200"></el-table-column>
            <el-table-column prop="registerType" label="业务类型" align="center" width="200"></el-table-column>
            <el-table-column prop="childType" label="子类型" align="left" style="margin-left:50px"></el-table-column>
            <el-table-column prop="" label="状态" align="center" width="100">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        :active-value = "1"
                        :inactive-value = "0"
                        @change="openbusState(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button @click="getbusEdit(scope.row)" type="text"><i><img src="../../../../assets/img/user_edit.png" /></i>编辑</el-button>
                    <el-button @click="openbusDel(scope.row.id)"  type="text" style="color:red"><i><img src="../../../../assets/img/user_delete.png" /></i>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange">
        </el-pagination>
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
                registerType:'',
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            busList: [],
            delList: [],
            pageTotal: 0,
            form: {
                registerType:'',
                childType:'',
                code:'',
            },
            visible: false,
        };
    },
    created() {
    },
    mounted() {
        this.getbusList()
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getbusList()
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getbusList()
        },
        //获取列表
        async getbusList() {
            const res = await service.busList({
                registerType : this.query.registerType,
                page : this.query.pageIndex,
                size : this.query.pageSize
            })
            this.busList = res.data
            this.pageTotal = res.totalItems
        },
        //新增
        async postbusAdd() {
            const validate = this.validate
            if(!validate.isNull(this.form.registerType,"登记类型不能为空") 
                || !validate.isNull(this.form.childType,"子类型不能为空")
                || !validate.isNull(this.form.code,"业务编码不能为空")) {
                this.$message.warning(validate.error)
                return
            }
            if(this.form.id){
                const res = await service.busEdit(this.form.id,{
                    registerType : this.form.registerType,
                    childType : this.form.childType,
                    code : this.form.code,
                })
                this.visible = false
                this.$message.success('编辑子类型成功');
            } else {
                const res = await service.busAdd({
                registerType : this.form.registerType,
                childType : this.form.childType,
                code : this.form.code,
                })
                this.visible = false
                this.$message.success('新增子类型成功');
            }
            
            this.getbusList()
        },
        //删除
        async getbusDel(id) {
            const res = await service.busDel(id)
            this.$message.success('删除成功');
            this.getbusList()
        },
        //删除弹框
        openbusDel(id) {
            this.$confirm('此操作将删除该条业务编码, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.getbusDel(id)
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        //状态改变弹框
        openbusState(row) {
            const status = row.status
            row.status = row.status ? 0 : 1;
            this.$confirm('此操作将改变该条业务的状态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.getbusState(row.id, status)
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消改变'
            });          
            });
        },
        //状态改变请求
        async getbusState(id,status) {
            const res = await service.busState(id,status)
            this.$message.success('更改状态成功');
            this.getbusList()
        },
        //编辑弹框
        async getbusEdit(row) {
            this.visible = true
            this.form.code = row.businessCode
            this.form.childType = row.childType
            this.form.registerType = row.registerType 
            this.form.id = row.id
        },
    }
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