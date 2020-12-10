<template>
  <div>
    <span style="font-size: 14px;color: #333A4D;">选择类型</span>
    <el-select v-model="query.status" placeholder="请选择" @change='getafterList' style="width:136px;margin:0 0 28px 10px">
        <el-option key="0" label="全部" value="2,3"></el-option>
        <el-option key="1" label="归档流程" value="2"></el-option>
        <el-option key="2" label="查阅流程" value="3"></el-option>
    </el-select>
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
                status:'2,3',
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
          status : this.query.status
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