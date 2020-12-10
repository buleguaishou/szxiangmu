<template>
  <div class="container" :key="codeKey">
    <div class="head">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="four"></el-tab-pane>
        <el-tab-pane label="待签收" name="first" v-if="waitSigned"></el-tab-pane>
        <el-tab-pane  label="待整理" name="second" v-if="waitArrange" ></el-tab-pane>
        <el-tab-pane label="待入库" name="third" v-if="waitWarehousing"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeName: 'four',
        pathName:'',
        path:'',
        waitSigned:'',
        waitArrange:'',
        waitWarehousing:'',
        codeKey:''
      };
    },
    mounted() {
      this.skip()
      this.getCode()
    },
    beforeRouteEnter(to, from, next) {
      next(vm=>{          
          vm.path = to.fullPath
      })
    },
    methods: {
      async getCode() {
        const code = await this.cacheStorage.get("code")
        if(code){
          this.waitSigned = await code.includes("waitSigned")
          this.waitArrange = await code.includes("waitArrange")
          this.waitWarehousing = await code.includes("waitWarehousing")
          ++this.codeKey
        }else{
          this.getCode()
        }
            
      },
      //头部路由
      handleClick(tab) {
        if(tab.name == 'first'){
          this.$router.push('/commission/sign')
        }
        if(tab.name == 'second') {
          this.$router.push('/commission/settle')
        }
        if(tab.name == 'third') {
          this.$router.push('/commission/storages')
        }
        if(tab.name == 'four') {
          this.$router.push('/commission/complete')
        }
      },
      skip() {
        if(this.path.indexOf('sign')>-1) {
          this.activeName = 'first'
        } else if(this.path.indexOf('settle')>-1 ) {
          this.activeName = 'second'
        } else if(this.path.indexOf('storages')>-1 ) {
          this.activeName = 'third'
        } else if(this.path.indexOf('complete')>-1 ) {
          this.activeName = 'four'
        } 
      }
    }
}
</script>

<style scoped>
.head{
  height: 60px;
  margin-bottom: 25px;
}
.container{
    padding-bottom: 100px;
}
.el-tabs{
  width: 100%;
}

</style>