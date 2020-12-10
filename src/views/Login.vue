<template>
    <div class="login-wrap" >
        <div class="header" style="width:100%;" ><img src="../assets/img/logo.png" style="margin:13px,30px;"></div>
        <div class="ms-login">
            <div class="ms-title">用户登入</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" v-debounceClick="submitForm">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import service from '../api/userCenter/user/index';
import code from '@/api/home/index';
export default {
    data: function () {
        return {
            isDisable:false,
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        //点击登陆按钮
        async submitForm() {
            const _this = this;
            const validate = _this.validate
            if(!validate.isNull(_this.param.username,"账号不能为空") || !validate.isNull(_this.param.password,"密码不能为空")) {
                _this.$message.warning(validate.error)
                return
            }
            _this.isDisable = true
            const res = await service.login({
                username: _this.param.username,
                password: _this.param.password
            });
            if (res.code) {
                if (res.code === '31000') {
                }
            } else {
                _this.$message.success('登录成功');
                _this.isDisable = false
                await _this.cacheStorage.set("menuList", res.menuList, 10)
                await _this.cacheStorage.set('token', res.token, 60*24*30*12);
                await _this.cacheStorage.set('name', res.name);
                await this.getmenuList()
                if (res.isExpiredPwd < '0') {
                    await _this.$router.push('/userCenter');
                }else{
                    await _this.$router.push('/commission');
                }
            }
        },
        //存储权限信息
        async getmenuList() {
            const _this = this
            const res = await code.menuList()
            await this.cacheStorage.set("menuList", res.itemVOList, 10)
            await this.cacheStorage.set("code", res.code, 10)
        },
    }
};
</script>

<style scoped>
.header{
    width: 1440px;
    height: 24px;
    background: linear-gradient(118deg, #052160 0%, #2A52BB 100%);
    opacity: 1;
    padding: 13px 30px;
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.png);
    background-size: cover;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgba(255, 255, 255);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>