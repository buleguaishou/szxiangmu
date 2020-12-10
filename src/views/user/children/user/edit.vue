<template>
    <div>
        <div class="container">
            <div class="form-box" style="width:60%;padding-bottom: 100px">
                <el-form ref="form" :model="form" label-width="85px">
                    <el-form-item label="用户账号" :required='true'>
                        <el-input v-model="form.account" :disabled="true" style="width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名" :required='true'>
                        <el-input v-model="form.name" placeholder="请输入姓名" maxlength="10" style="width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="form.mobile" placeholder="选填" maxlength="11" style="width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="分配角色" :required='true'>
                        <span v-for="(val,index) in roleList" :key="index" class="jurisdiction" >
                            <el-checkbox-group v-model="checkIds">
                                <el-checkbox :label="val.id" >{{val.name}}</el-checkbox>
                            </el-checkbox-group>
                        </span>
                    </el-form-item>
                    <el-form-item label="账号密码" :required='true'>
                        <el-input placeholder="请输入密码" type="password" value="********" style="width:50%" disabled>********</el-input>
                        <el-button type="primary" @click="reset(resetPwdFlag)"  style="margin-left:5%">重置密码</el-button>
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
import sideBarMenusMap from "@/utils/common"
import code from '@/api/home/index';
export default {
    name: 'basetable',
    data() {
        return {
            checkIds:[],
            form: {
                name: '',
                account:'',
                mobile: ''
            },
            roleList: [],
            resetPwdFlag:false,
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        this.getroleList();
        this.getuserEdit()
    },
    methods: {
        //获取列表
        async getroleList() {
            const res = await service.roleList();
            this.roleList = res;
        },
        //用户编辑
        async getuserEdit(){
            const res = await service.userEdit(this.$route.params.id);
            this.form.account = res.account
            this.form.name = res.name
            this.form.mobile = res.mobile
            this.checkIds = res.roleArr
        },
        //添加用户
        async getuserAdd() {
            const _this = this;
            const validate = _this.validate
            if(!validate.isNull(_this.form.account,"账号不能为空")
                || !validate.isNull(_this.form.name,"用户姓名不能为空")
                // || !validate.isPhone(_this.form.mobile)
                || !validate.isNull(_this.checkIds,"分配角色不能为空")) {
                _this.$message.warning(validate.error)
                return
            }
            const res = await service.userAdd({
                account:_this.form.account,
                cfmPwd:"",
                mobile:_this.form.mobile,
                name:_this.form.name,
                password:"11111111",
                roles: _this.checkIds + '',
                id:this.$route.params.id,
                resetPwdFlag:this.resetPwdFlag,
            });
            this.userAdd = res;
            this.getmenuList()
            if (res.code) {

            } else {
                if(this.resetPwdFlag === true){
                    _this.$message.success('密码重置成功');
                }else{
                    _this.$message.success('修改成功');
                }
                _this.$router.push('/user/list');

            }
        },
        //重新获取权限
        async getmenuList() {
            const _this = this
            const res = await code.menuList()
            await this.cacheStorage.set("menuList", res.itemVOList, 10)
            await this.cacheStorage.set("code", res.code, 10)
            if(res.itemVOList) {
                await _this.checkHasMenu(res.itemVOList)
            } else {
                console.error("未获取到菜单数据")
            }
            this.$store.commit('increment')
        },
        async checkHasMenu(menuList) {
            const _this = this
            const items = []
            function deal(list) {
                list.map(remote => {
                    const originLevel1 = sideBarMenusMap.find(origin => origin.code === remote.code)
                    if(originLevel1) {
                        const item = JSON.parse(JSON.stringify(originLevel1))
                        const children = []
                        if(originLevel1.children) {
                            if (remote.children && remote.children.length > 0) {
                                remote.children.map((sub) => {
                                    if(item.children){
                                        const subItem = item.children.find((subOrigin) => subOrigin.code === sub.code);
                                        if (subItem) {
                                            children.push(subItem);
                                        }
                                    }
                                });
                                item.children = children;
                            }
                        }
                        items.push(item);
                    }
                })
            }
            deal(menuList)
            const tagsList = await this.cacheStorage.get('tagsList');
            const newtagsList = []
            tagsList.map((tags) => {
                const include = items.find((val) => tags.path.indexOf(val.index) > -1)
                if(include && tags.path == include.index) {
                    newtagsList.push(tags)
                }
                if(include && include.children && include.children.findIndex(el => tags.path.indexOf(el.index) > -1) > -1) {
                    newtagsList.push(tags)
                }
            })
            await this.cacheStorage.set('tagsList',newtagsList,10)
        },
        //重置密码弹框
        reset(resetPwdFlag) {
            this.$confirm('此操作将重置密码, 是否继续?', '提示', {
                confirmButtonText: '确定重置',
                confirmButtonType: 'danger',
                cancelButtonText: '取消',
                type: 'error'
                }).then(() => {
                    this.resetPwdFlag = true
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消重置'
                });
            });
        },
    }
};
</script>
<style scoped>
.dialog-footer{
    margin-left: 20%;
}
.jurisdiction{
    padding-right: 30px;
    display: inline-block
}
</style>