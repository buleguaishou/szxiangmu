<template>
    <div>
        <div class="container">
            <div class="form-box" style="width: 100%">
                <el-form ref="form" :model="form" label-width="85px">
                    <el-form-item label="角色名" :required='true'>
                        <el-input v-model="form.name" placeholder="请输入角色名"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" :required='true'>
                        <el-input v-model="form.description" placeholder="请对角色进行简单的描述"></el-input>
                    </el-form-item>
                    <div style="background:#4687FF; width: 4px; height: 12px;border-radius:2px;" ></div>
                    <el-form-item label="分配权限" style="margin-top:-26px" :key="formKey"><br/>
                        <div v-for="(val, index) in permissionsData" :key="index" class="jdtList">
                            <el-checkbox :indeterminate="isIndeterminate[index]" v-model="checkAll[index]" @change="handleCheckAllChange($event, index)" style="background-color:#EBEEF5;height:40px;width:98%;padding-left: 16px;">{{val.name}}</el-checkbox>
                            <div class="checkbox">
                                <el-checkbox-group v-model="checkedIds[index]" @change="handleCheckedIdsChange($event, index)">
                                    <el-checkbox v-for="(el, j) in val.permissionList" :key="j" :label="el.id" >{{el.name}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="getroleAdd()">确 定</el-button>
            </span>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/userCenter/role/index';
export default {
    name: 'basetable',
    data() {
        return {
            formKey: 0,
            val: '',
            index: '',
            name: '',
            description: '',
            permissionList: {
                name: ''
            },
            permissionsData: {
                permissionsList: '',
                name: ''
            },
            form: {
                id: [],
                name: '',
                desc: '',
                options: []
            },
            checkAll: [false,false,false,false,false,false,false,false,false,false,false,false],
            checkedIds: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],],
            isIndeterminate: [false,false,false,false,false,false,false,false,false,false]
        };
    },
    mounted() {
        this.getrolePermissions();
    },
    methods:{
        //添加角色
        async getroleAdd() {
            const _this = this;
            const validate = _this.validate
            if(!validate.isNull(_this.form.name,"用户姓名不能为空")
                || !validate.isNull(_this.form.description,"描述不能为空")) {
                _this.$message.warning(validate.error)
                return
            }
            const res = await service.roleAdd({
                name: _this.form.name,
                description: _this.form.description,
                permissions: _this.checkedIds+'',
            });
            this.roleAdd = res;
            if (res.code) {

            } else {
                _this.$message.success('添加成功');
                await _this.$router.push('/user/jurisdiction');

            }
        },
        //获取权限列表
        async getrolePermissions() {
            const res = await service.rolePermissions();
            this.permissionsData = res;
        },
        //复选框
        async handleCheckAllChange(val, index) {
            this.checkedIds[index] = val ? this.permissionsData[index].permissionList.map( v => v.id) : [];
            this.isIndeterminate[index] = false;
        },
        //复选框
        async handleCheckedIdsChange(value, index) {
            let checkedCount = value.length;
            this.checkAll[index] = checkedCount === this.permissionsData[index].permissionList.map( v => v.id).length;
            this.isIndeterminate[index] = checkedCount > 0 && checkedCount < this.permissionsData[index].permissionList.map( v => v.id).length;
            ++this.formKey;
        }
    }
}
</script>
<style scoped>
.checkbox{
    display: flex;
    height: 56px;
}
.el-checkbox-group {
    padding: 10px 0 0 80px;
}
.dialog-footer{
    display: flex;
    justify-content:center;
}
.el-input{
    width: 50%;
}
.jdtList{
    margin-left: -85px;
    border:solid 1px #EBEEF5;
}
</style>