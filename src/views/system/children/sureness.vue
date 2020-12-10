<template>
    <div class="container" :key='editKey'>
       <el-button type="primary" v-if="Edit == false" @click="openEdit">编辑</el-button>
       <el-button v-if="Edit == true" @click="Edit = false" >取消</el-button>
       <el-button type="primary" v-if="Edit == true" @click="getEdit">确定</el-button>
       <ul v-if="Edit == false">
           <!-- <li><span style="color:#6F737E;padding:0;display: inline-block;width:80px">密码复杂度 </span>
               <span v-if="surList.passwordComplexity == 1" >至少8位数字</span>
                <span v-if="surList.passwordComplexity == 2" >至少8位数字+字母组合</span>
                <span v-if="surList.passwordComplexity == 3" >至少8位数字+字母组合，并包含大小写</span>
            </li> -->
           <li><span style="color:#6F737E;padding:0;display: inline-block;width:80px">修改周期 </span>
               <span v-if="surList.updatePeriod == 1">每月</span>
               <span v-if="surList.updatePeriod == 2">每季度</span>
               <span v-if="surList.updatePeriod == 3">每半年</span>
               <span v-if="surList.updatePeriod == 4">每年</span>
            </li>
           <li><span style="color:#6F737E;padding:0;display: inline-block;width:80px">访问IP段 </span><span >{{surList.ipStart}}-{{surList.ipEnd}}</span></li>
       </ul>
       <ul v-if="Edit == true">
           <el-form ref="form" :model="form" label-width="150px" label-position="left">
               <!-- <el-form-item  label="密码复杂度" label-width="100px" >
                    <el-radio-group v-model="form.passwordComplexity" >
                        <el-radio :label="1" >至少8位数字</el-radio>
                        <el-radio :label="2">至少8位数字+字母组合</el-radio>
                        <el-radio :label="3">至少8位数字+字母组合，并包含大小写</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item   label="修改周期" label-width="100px">
                    <el-radio-group v-model="form.updatePeriod" >
                        <el-radio :label="1">每月</el-radio>
                        <el-radio :label="2">每季度</el-radio>
                        <el-radio :label="3">每半年</el-radio>
                        <el-radio :label="4">每年</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div style="display:flex">
                    <el-form-item  label="访问IP段" label-width="100px">
                        <el-input v-model="form.ipStart" required="required" style="margin-right:5px"></el-input>
                    </el-form-item>
                    <el-form-item  label="至" label-width="20px">
                        <el-input v-model="form.ipEnd" required="required"></el-input>
                    </el-form-item>
                </div>
            </el-form>
       </ul>
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
            surList:[],
            Edit : false,
            editKey:0,
            form: {
                passwordComplexity:'',
                updatePeriod:'',
                ipStart:'',
                ipEnd:'',
            },
            id : 0,
        }
    },
    mounted() {
        this.getsurList()
    },
    methods: {
        //获取列表
        async getsurList() {
            const res = await service.surList()
            this.surList = res
            this.id = this.surList.id
        },
        //编辑安全配置
        async getEdit(){
            const res = await service.surAdd({
                id : this.id,
                passwordComplexity : this.form.passwordComplexity,
                updatePeriod : this.form.updatePeriod,
                ipStart : this.form.ipStart,
                ipEnd : this.form.ipEnd,
            })
            this.surList = res
            this.$message.success('编辑成功');
            this.getsurList()
            this.Edit = false
        },
        //转化编辑页面并获取列表
        async openEdit() {
            this.Edit = true
            this.form.passwordComplexity = this.surList.passwordComplexity 
            this.form.updatePeriod =  this.surList.updatePeriod 
            this.form.ipStart = this.surList.ipStart
            this.form.ipEnd = this.surList.ipEnd 
        },
    },
};
</script>

<style scoped>
li{
    list-style-type: none;
    font-size: 14px;
    padding-top: 30px;
}
.container{
    height: 100%;
}
li span{
    font-size:14px ;
    color:#333A4D;
    padding-left:15px
}
.el-form-item{
    list-style-type: none;
    color:#6F737E;
    font-size: 14px;
    padding-top: 30px;
}
.el-input{
    width: 250px;
}
</style>