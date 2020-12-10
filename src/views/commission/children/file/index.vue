<template>
  <div class="container">
    <div class="head">
      <el-tabs v-model="activeName" @tab-click="handleClick" :key="tabsKey">
        <el-tab-pane label="归档信息" name="first"></el-tab-pane>
        <el-tab-pane label="申请信息" name="second"></el-tab-pane>
        <el-tab-pane label="审核信息" name="third"></el-tab-pane>
        <el-tab-pane label="登簿信息" name="fourth"></el-tab-pane>
        <el-tab-pane v-if="this.prams == 1 || wjys" label="归档文件" name="five"></el-tab-pane>
        <el-tab-pane v-if="this.prams == 1 || !wjys" label="流程" name="six"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view @func="getwjys"/>
  </div>
</template>

<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/commission/children/index';
export default {
    data() {
        return {
            tableData: [],
            activeName: 'first',
            prams: 1,
            tabsKey: 0,
            wjys:true
        };
    },
    mounted() {
      this.params = this.$route.params
      if(this.params.x == '3') {
        this.prams = 0
        this.wjys = false
      }
      if(this.params.x == '0') {
        this.wjys = false
        this.prams = 0
      }
      this.skip()
    },
    methods: {
      getwjys(data) {
        this.prams == data
        this.$set(this, "prams",data)
      },
      //头部路由
      handleClick(tab) {
        const {x, sldh, batchNo} = this.params
        if(x == 1) {
          if(tab.name == 'first'){
            this.$router.push({path:`/commission/settle/pigeonhole/${sldh}/${x}`})
          }else if(tab.name == 'second'){
            this.$router.push({path:`/commission/settle/apply/${sldh}/${x}`})
          }else if(tab.name == 'third'){
            this.$router.push({path:`/commission/settle/audit/${sldh}/${x}`})
          }else if(tab.name == 'fourth'){
            this.$router.push({path:`/commission/settle/recording/${sldh}/${x}`})
          }else if(tab.name == 'five'){
            this.$router.push({path:`/commission/settle/pigeonholefile/${sldh}/${x}`})
          }else if(tab.name == 'six'){
            this.$router.push({path:`/commission/settle/after/${sldh}/${x}`})
          }
        }
        if(x == 2 ){
          if(tab.name == 'first'){
            this.$router.push({path:`/commission/storages/pigeonhole/${sldh}/${x}`})
          }else if(tab.name == 'second'){
            this.$router.push({path:`/commission/storages/apply/${sldh}/${x}`})
          }else if(tab.name == 'third'){
            this.$router.push({path:`/commission/storages/audit/${sldh}/${x}`})
          }else if(tab.name == 'fourth'){
            this.$router.push({path:`/commission/storages/recording/${sldh}/${x}`})
          }else if(tab.name == 'five'){
            this.$router.push({path:`/commission/storages/pigeonholefile/${sldh}/${x}`})
          }else if(tab.name == 'six'){
            this.$router.push({path:`/commission/storages/after/${sldh}/${x}`})
          }
        }
        if(x == 3) {
          if(tab.name == 'first'){
            this.$router.push({path:`/commission/sign/pigeonhole/${sldh}/${x}`})
          }else if(tab.name == 'second'){
            this.$router.push({path:`/commission/sign/apply/${sldh}/${x}`})
          }else if(tab.name == 'third'){
            this.$router.push({path:`/commission/sign/audit/${sldh}/${x}`})
          }else if(tab.name == 'fourth'){
            this.$router.push({path:`/commission/sign/recording/${sldh}/${x}`})
          }else if(tab.name == 'six'){
            this.$router.push({path:`/commission/sign/after/${sldh}/${x}`})
          }
        }
        if(x == 0) {
          if(tab.name == 'first'){
            this.$router.push({path:`/commission/settle/pigeonhole/${sldh}/${x}`})
          }else if(tab.name == 'second'){
            this.$router.push({path:`/commission/settle/apply/${sldh}/${x}`})
          }else if(tab.name == 'third'){
            this.$router.push({path:`/commission/settle/audit/${sldh}/${x}`})
          }else if(tab.name == 'fourth'){
            this.$router.push({path:`/commission/settle/recording/${sldh}/${x}`})
          }else if(tab.name == 'five'){
            this.$router.push({path:`/commission/settle/pigeonholefile/${sldh}/${x}`})
          }else if(tab.name == 'six'){
            this.$router.push({path:`/commission/settle/after/${sldh}/${x}`})
          }
        }
      },
      skip() {
        const path = this.$route.path
        if(path.indexOf('file') > -1) {
          this.activeName = 'five'
        } else if(path.indexOf('apply') > -1) {
          this.activeName = 'second'
        } else if(path.indexOf('audit') > -1) {
          this.activeName = 'third'
        } else if(path.indexOf('recording') > -1) {
          this.activeName = 'fourth'
        } else if(path.indexOf('pigeonhole') > -1) {
          this.activeName = 'first'
        } else if(path.indexOf('after') > -1) {
          this.activeName = 'six'
        }
        ++this.tabsKey;
      }
    }
};
</script>

<style scoped>
.head{
  height: 60px;
  margin-bottom: 10px;
  display: flex;
}
.container{
    padding-bottom: 100px;
}
.el-tabs{
  width: 100%;
}
.el-tab-pane{
  outline:none
}
</style>