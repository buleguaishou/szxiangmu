<template>
  <div>
    <div style="background:#4687FF; width: 4px; height: 12px;margin-bottom:12px;border-radius:2px;" ></div>
    <div style="margin:-29px 0 12px 10px">受理单号：{{this.$route.params.sldh}}</div>
      <el-table
      :data="auditListData.reviewInfos"
      border
      style="width: 100%;margin-bottom:20px;"
      >
      <el-table-column
        prop="bljd"
        label="办理节点"
        align="center">
      </el-table-column>
      <el-table-column
        prop="blr"
        label="办理人"
        align="center">
      </el-table-column>
      <el-table-column
        prop="blrq"
        label="办理日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="blyj"
        label="办理意见"
        align="center">
      </el-table-column>
    </el-table>
    办结结果：<span style="color:#333A4D">{{auditListData.bljg}}</span>
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
          auditListData:{
            reviewInfos:[]
          },
        };
    },
    mounted() {
        this.getauditList();
    },
    methods: {
      //获取列表
      async getauditList() {
        const res = await service.auditList(this.$route.params.sldh);
        this.auditListData = res;
      },
    }
}
</script>

<style scoped>

</style>