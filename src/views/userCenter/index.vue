<template>
    <div>
        <el-card shadow="hover" class="mgb20">
            <div class="user" style="padding:28px 0 64px 0;">
                <img src="../../assets/img/img.jpg" class="user-avator" alt />
                <ul>
                    <li class="user-name">{{ userdata.account }}</li>
                    <li class="user-list time">
                        上次登录时间：
                        <span>{{userdata.lastLoginTime}}</span>
                    </li>
                    <li class="user-info-list ip">
                        上次登录IP  ： 
                        <span> {{userdata.lastLoginIp}}</span>
                    </li>
                </ul>
            </div>
            <div :v-for="(username, phone, password) in userdata" style="padding-left:60px">
                <div class="user-info"><span style="padding: 30px 30px 30px 0">账号：</span>{{ userdata.account }}</div>
                <div class="user-info"><span style="padding: 30px 12px 30px 0px">手机号：</span>{{ userdata.mobile }}</div>
                <div class="user-info">
                    <span style="padding: 30px 30px 30px 0">密码：</span>*********
                    <span style="color:#FF790E;margin-left:10px" v-if="userdata.pwdStatus===2"><img src="../../assets/img/ic_tips.png"> 密码剩余{{userdata.pwdExpireDay}}天过期，请立即修改</span>
                    <span style="color:#FF790E" v-if="userdata.pwdStatus===3"><img src="../../assets/img/ic_tips.png"> 密码已过期，请立即修改</span>
                    <section class="main"> 
                        <el-button type="text"  @click="visible = true" style="margin:0 20px">
                            <img src="../../assets/img/userCenter-chang.png" alt="">
                        </el-button>
                        <el-dialog v-dialogDrag title="修改密码" center :visible.sync="visible" width="40%" >
                            <div class="container">
                                <div class="form-box">
                                    <el-form ref="form" :model="form" width="100%">
                                        <el-form-item>
                                            <el-input v-model="form.oldPwd" placeholder="输入原密码" type="password"></el-input><br />
                                            <el-input
                                                v-model="form.newPwd"
                                                placeholder="输入新的密码,长度8-30，需要包含数字和字母2种类型字符"
                                                type="password"
                                            ></el-input
                                            ><br />
                                            <el-input v-model="form.cfmPwd" placeholder="确认新密码" type="password"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="visible = false">取 消</el-button>
                                <el-button type="primary" @click="changePwd">确 定</el-button>
                            </span>
                        </el-dialog>
                    </section>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import service from '@/api/userCenter/user/index';
export default {
    name: 'dashboard',
    data() {
        return {
            username: '',
            phone: '',
            password: '',
            form: {
                name: ''
            },
            name: localStorage.getItem('ms_username'),
            userdata: {
                lastLoginTime: '',
                account: '',
                mobile: '',
                password: '*********'
            },
            visible: false
        };
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        //获取列表
        async getUserInfo(){
            const res = await service.info();
            this.userdata = res;
            if(res.pwdStatus === 3) {
                this.visible = true
            }
        },
        //修改密码
        async changePwd(){
            const _this = this;
            const validate = _this.validate
            if(!validate.isNull(_this.form.oldPwd,"请输入原密码") 
                || !validate.isNull(_this.form.newPwd,"请输入新密码")
                || !validate.isNull(_this.form.cfmPwd,"请再次输入新密码")) {
                _this.$message.warning(validate.error)
                if(_this.form.newPwd !== _this.form.cfmPwd){
                    _this.$message.warning("两次密码输入不一致")
                }
                return
            }
            const res = await service.change({
                oldPwd: _this.form.oldPwd,
                newPwd: _this.form.newPwd,
                cfmPwd: _this.form.cfmPwd,
            });
            if (res.code) {
                if (res.code === '210007') {
                }
            } else {
                _this.$message.success('密码修改成功，请重新登入！');
                await _this.cacheStorage.clear();
                await _this.$router.push('/login');
            }
        }
    }

};
</script>
<style lang="css" scoped>
.user-info {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #DCDFE6;
    height: 67px;
    margin-bottom: 20px;
}
.el-input {
    width: 100%;
    margin-top: 30px;
}
.form-box {
    width: 100%;
}
.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
.user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
}
.user-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-name{
    font-size: 30px;
    color: #222;
}
ul {
    display: flex;
    flex-direction: column;
    justify-content: left;
    list-style-type: none;
    margin-left: 30px;
}
.user-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}
.ip span{
    margin-left:13px ;
}
.mgb20 {
    margin-bottom: 20px;
    padding:0 50% 0 12px;
}
</style>