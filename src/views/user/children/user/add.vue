<template>
    <div>
        <div class="container">
            <div class="form-box" style="width:60%;padding-bottom: 100px">
                <el-form ref="form" :model="form" label-width="85px">
                    <el-form-item label="用户账号" :required='true'>
                        <el-input v-model="form.account" placeholder="请输入账号，可输入数字和字母的组合"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名" :required='true'>
                        <el-input v-model="form.name" placeholder="请输入姓名" maxlength="10" ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="form.mobile" placeholder="选填" maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="分配角色" :required='true'>
                        <span v-for="(val,index) in roleList" :key="index" class="jurisdiction" >
                            <el-checkbox-group v-model="checkIds">
                                <el-checkbox :label="val.id" >{{val.name}}</el-checkbox>
                            </el-checkbox-group>
                        </span>
                    </el-form-item>
                    <el-form-item label="账号密码" :required='true'>
                        <el-input v-model="form.password" placeholder="请输入密码" type="password" maxlength="16" ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :required='true'>
                        <el-input v-model="form.cfmPwd" placeholder="再次输入密码" type="password" maxlength="16"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="getuserAdd" >确 定</el-button>
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
            checkIds:[],
            form: {
                name: '',
                mobile:'',
                account:''
            },
            roleList: [],
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        this.getroleList();
    },
    methods: {
        //获取列表
        async getroleList() {
            const res = await service.roleList();
            this.roleList = res;
        },
        //添加用户
        async getuserAdd() {
            const _this = this;
            const validate = _this.validate
            if(!validate.isNull(_this.form.account,"账号不能为空")
                || !validate.isNull(_this.form.name,"用户姓名不能为空")
                // || !validate.isPhone(_this.form.mobile)
                || !validate.isNull(_this.checkIds,"分配角色不能为空")
                || !validate.isNull(_this.form.password,"密码不能为空")) {
                _this.$message.warning(validate.error)
                return
            }
            const res = await service.userAdd({
                account:_this.form.account,
                cfmPwd:_this.form.cfmPwd,
                mobile:_this.form.mobile,
                name:_this.form.name,
                password:_this.form.password,
                roles: _this.checkIds + '',
            });
            this.userAdd = res;
            if (res.code) {

            } else {
                _this.$message.success('添加成功');
                await _this.$router.push('/user/list');
            }
        },
    }
};
</script>
<style scoped>
.dialog-footer{
    display: flex;
    justify-content:center;
}
.jurisdiction{
    padding-right: 30px;
    display: inline-block
}
</style>