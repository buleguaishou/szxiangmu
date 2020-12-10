<template>
  <div>
    <el-table
      :data="afterList"
      border
      style="width: 100%;"
      >
      <el-table-column
        type="index" 
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="logRecord"
        label="日志类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="操作用户"
        align="center">
      </el-table-column>
      <el-table-column
        prop="operationTime"
        label="操作时间"
        align="center">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :current-page="query.pageIndex"
      :page-size="query.pageSize"
      :total="pageTotal"
      @current-change="handlePageChange">
    </el-pagination>
  </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/search/index';
export default {
    data() {
        return {
            afterList:[
                
            ],
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
        }
    },
    mounted() {
        this.getafterList()
    },
    methods : {
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getafterList();
      },
      //获取列表
      async getafterList(){
        const res = await service.afterList({
          page : this.query.pageIndex,
          size : this.query.pageSize,
          sldh: this.$route.params.sldh,
          status:'2'
        })
        this.afterList = res.data
        this.pageTotal = res.totalItems
      }
    }
}
</script>
<style scoped>
.el-pagination{
    float: right;
    padding: 40px 0 34px 0;
}
</style>