<template>
    <div>
        <div class="container" style="background-color:#FFF;"> 
            <div class="user">
                {{userdata.account}} ，欢迎进入电子档案系统！<span style="color:#AAB3C4;"><i class="el-icon-lx-notification"></i>最近登入时间：{{userdata.lastLoginTime}}</span>
                <div class="form-box">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="时间范围">
                            <el-select v-model="form.status" placeholder="请选择" @change='handleSearch'>
                                <el-option key="today" label="本日" value="1"></el-option>
                                <el-option key="month" label="本月" value="2" style="selected=selected;"></el-option>
                                <el-option key="year" label="本年" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>        
            </div>
        </div> 
        <div class="card" >
            <el-card shadow="hover" style="height:150px;width:19%;" v-for="(obj,index) in classifyObj" :key="index" >
                <div slot="header" class="clearfix" style="display:flex">
                    <img style="height: 15px;margin-top: 3px;" :src="obj.src"><span style="font-size:15px;color:#333A4D;padding-left:4px">{{obj.name}}</span>
                </div>
                <div class="clearfix " style="font-size:25px">
                    <span>已归档</span>{{staList[index]}}件
                </div>
            </el-card>
        </div>
        <el-card shadow="hover" v-if="codeList">
            <div slot="header" class="clearfix">
                <div style="display:flex">
                    <img style="height: 15px;margin-top: 3px;" src="../assets/img/home_list.png"><span style="font-size:15px;color: black; padding:0 10px">我的待办</span><span style="padding:3px 4px 0 0;margin:0;">({{commissionList.length}})</span>
                </div>
                <router-link to='/commission/sign'>
                    <el-button style="float: right; margin-top:-30px" type="text" ><span>查看更多 >></span></el-button>
                </router-link>
            </div>
            <el-table :show-header="false" :data="commissionList" style="width:100%;">
                <el-table-column>
                    <template slot-scope="scope" >
                        <div
                            class="todo-item"
                            :class="{'todo-item-del': scope.row.status}"
                        >
                            <el-tag :type="scope.row.status=='待整理' ? 'warning' : '' " effect="dark">{{scope.row.status}}</el-tag>
                            {{scope.row.info}}
                            <span style="float: right;padding-right: 10px;">{{scope.row.editTs}}</span>
                            <el-button  type="text" style="padding-top: 3px;float: right;" @click="go(scope.row.status,scope.row.sldh)">立即查看 ></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/home/index';
import statistics from '@/api/statistics/index';
export default {
    name: 'baseform',
    data() {
        return {
            classifyObj:'',
            name:'',
            amount:'',
            icon:'',
            form: {
                status:'2',
            },
            commissionList:[],
            codeList: [],
            userdata:{},
            classifyObj:[
                { name:'互联网+抵押',src:require('../assets/img/homecard_mortgage.png') },
                { name:'互联网+查封',src:require('../assets/img/homecard_seizure.png')},
                { name:'苏易登',src:require('../assets/img/homecard_house.png')},
                { name:'互联网+一窗办理',src:require('../assets/img/homecard_computer.png')},
                { name:'线下窗口登记',src:require('../assets/img/homecard_window.png')},
            ],
            staList:[]
        };
    },
    mounted() {
        this.getUserInfo()
        this.getCommissionList()
        this.getstaList()
        this.getCode()
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.getstaList()
        },
        //获取中间Card数据
        async getstaList() {
            const res = await service.staList({
                status : this.form.status
            })
            this.staList = res
        },
        //获取用户信息
        async getUserInfo(){
            const res = await service.info();
            this.userdata = res;
        },
        //获取我的代办列表
        async getCommissionList(){
            const res = await service.commissionList();
            this.commissionList = res;
        },
        //获取我的待办权限
        async getCode() {
            const code = await this.cacheStorage.get("code")
            const res = await code.includes( "myUpcoming")
            this.codeList = res
        },
        //我的代办跳转
        go(status,sldh){
            if(status == '待整理'){
                this.$router.push({path:`/commission/settle/pigeonhole/${sldh}/${1}`})
            }else{
                this.$router.push({path:`/commission/storages/pigeonhole/${sldh}/${2}`})
            }
        },
    }
}
</script>
<style scoped>
.container{
    margin: 0;
    padding: 0;
    background:url(../assets/img/ikon.png) no-repeat 60% 0%;
}
.user{
    height: 72px;
    line-height: 72px;
    position: relative;
    color:#333A4D;
    background:url(../assets/img/home_head.png) no-repeat;
    background-size:100%100%;    
    padding-left:24px ;
}
.form-box{
    width: 16%;
    justify-content:right;
    position: absolute;
    top:20%;
    transform: translateX(500%);
}
.card{
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
}
span{
    color: darkgrey;
    font-size: 10px;
    padding:0 20px ;
}
ul{
    height: 300px;
}
.el-tag{
    color: #ffffff;
}
</style>