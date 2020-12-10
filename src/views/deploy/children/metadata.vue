<template>
  <div class="container">
    <div class="head">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="申请信息" name="first"></el-tab-pane>
        <el-tab-pane label="审核信息" name="second"></el-tab-pane>
        <el-tab-pane label="登簿信息" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
export default {
    data() {
        return {
            tableData: [],
            activeName: 'first',
            prams: null,
        };
    },
    mounted() {
      this.skip()
    },
    methods: {
      //头部路由
      handleClick(tab) {
        if(tab.name == 'first'){
          this.$router.push({path:`/deploy/metadata/apply`})
        }else if(tab.name == 'second'){
          this.$router.push({path:`/deploy/metadata/audit`})
        }else if(tab.name == 'third'){
          this.$router.push({path:`/deploy/metadata/recording`})
        }
      },
      skip() {
        const path = this.$route.path
        if(path.indexOf('apply')>-1) {
          this.activeName = 'first'
        } else if(path.indexOf('audit')>-1 ) {
          this.activeName = 'second'
        } else if(path.indexOf('recording')>-1 ) {
          this.activeName = 'third'
        } 
      }
    }
};
</script>

<style scoped>
.head{
  height: 60px;
  margin-bottom: 25px;
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