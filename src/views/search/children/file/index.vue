<template>
  <div class="container">
    <div class="head">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="归档信息" name="first"></el-tab-pane>
        <el-tab-pane label="申请信息" name="second"></el-tab-pane>
        <el-tab-pane label="审核信息" name="third"></el-tab-pane>
        <el-tab-pane label="登簿信息" name="fourth"></el-tab-pane>
        <el-tab-pane v-if="wjys" label="归档文件" name="five"></el-tab-pane>
        <el-tab-pane label="审计跟踪" name="six"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
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
            prams: null,
            wjys:true
        };
    },
    mounted() {
      this.params = this.$route.params
      if(this.params.wjys == 0) {
        this.wjys = false
      }
      this.skip()
    },
    methods: {
      handleClick(tab) {
        const { sldh, wjys } = this.params
        if(tab.name == 'first'){
          this.$router.push({path:`/search/list/pigeonhole/${sldh}/${wjys}`})
        }else if(tab.name == 'second'){
          this.$router.push({path:`/search/list/apply/${sldh}/${wjys}`})
        }else if(tab.name == 'third'){
          this.$router.push({path:`/search/list/audit/${sldh}/${wjys}`})
        }else if(tab.name == 'fourth'){
          this.$router.push({path:`/search/list/recording/${sldh}/${wjys}`})
        }else if(tab.name == 'five'){
          this.$router.push({path:`/search/list/pigeonholefile/${sldh}/${wjys}`})
        }else if(tab.name == 'six'){
          this.$router.push({path:`/search/list/after/${sldh}/${wjys}`})
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
        }  else if(path.indexOf('after') > -1) {
          this.activeName = 'six'
        }
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