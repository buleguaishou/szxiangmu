<template>
  <div class="container">
    <div class="head">
      <el-tabs v-model="activeName" @tab-click="handleClick" :key="tabsKey">
        <el-tab-pane label="部门编码" name="first"></el-tab-pane>
        <el-tab-pane label="业务编码" name="second"></el-tab-pane>
        <el-tab-pane label="业务来源" name="third"></el-tab-pane>
        <el-tab-pane label="文件分类" name="fourth"></el-tab-pane>
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
            activeName: 'first',
            tabsKey: 0
        };
    },
    mounted() {
      this.params = this.$route.params
      this.skip()
    },
    methods: {
      //头部路由
      handleClick(tab) {
        const {id, sldh} = this.params
        if(tab.name == 'first'){
          this.$router.push({path:`/system/dictionaries/department`})
        }else if(tab.name == 'second'){
          this.$router.push({path:`/system/dictionaries/business`})
        }else if(tab.name == 'third'){
          this.$router.push({path:`/system/dictionaries/source`})
        }else if(tab.name == 'fourth'){
          this.$router.push({path:`/system/dictionaries/matter`})
        }
      },
      async skip() {
        const path = this.$route.path
        if(path.indexOf('department') > -1) {
          this.activeName = 'first'
        } else if(path.indexOf('business') > -1) {
          this.activeName = 'second'
        } else if(path.indexOf('source') > -1) {
          this.activeName = 'third'
        } else if(path.indexOf('matter') > -1) {
          this.activeName = 'fourth'
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