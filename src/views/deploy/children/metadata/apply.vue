<template>
    <div>
        <table >
            <tr style="background:#6F737E;color:#FFFFFF;">
                <th>数据名称</th>
                <td>约束条件</td>
                <th>数据名称</th>
                <td>约束条件</td>
            </tr>
            <tr><th colspan=4 style="height:40px;background:#EBEEF5;">办理业务</th></tr>
            <tr>
                <th>业务名称</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.blyw"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('blyw' , applicationInfoList.blyw)"
                        >
                    </el-switch>
                </td>
                <th>业务代码</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.blywCode"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('blywCode' , applicationInfoList.blywCode)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>受理单号</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.sldh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('sldh' , applicationInfoList.sldh)"
                        >
                    </el-switch>
                </td>
                <th>报件编号</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.bjbh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bjbh' , applicationInfoList.bjbh)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>办理地点</th>
                <td colspan=4>
                    <el-switch
                        v-model="applicationInfoList.bldd"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bldd' , applicationInfoList.bldd)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr><th colspan=4 style="height:40px;background:#EBEEF5;">权利人信息</th></tr>
            <tr>
                <th>权利人类型</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.qlrLx"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrLx' , applicationInfoList.qlrLx)"
                        >
                    </el-switch>
                </td>
                <th>权利人姓名</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.qlrMc"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrMc' , applicationInfoList.qlrMc)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>证件类型</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.qlrZjmc"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrZjmc' , applicationInfoList.qlrZjmc)"
                        >
                    </el-switch>
                </td>
                <th>证件号码</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.qlrZjhm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrZjhm' , applicationInfoList.qlrZjhm)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>电话号码</th>
                <td colspan=4>
                    <el-switch
                        v-model="applicationInfoList.qlrDh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrDh' , applicationInfoList.qlrDh)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>法人代表/负责人姓名</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.qlrFzrXm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrFzrXm' , applicationInfoList.qlrFzrXm)"
                        >
                    </el-switch>
                </td>
                <th>代理人姓名</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.qlrDlrXm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrDlrXm' , applicationInfoList.qlrDlrXm)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>代理人证件类型</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.qlrDlrZjmc"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrDlrZjmc' , applicationInfoList.qlrDlrZjmc)"
                        >
                    </el-switch>
                </td>
                <th>代理人证件号码</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.qlrDlrZjhm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrDlrZjhm' , applicationInfoList.qlrDlrZjhm)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr><th colspan=4 style="height:40px;background:#EBEEF5;">义务人信息</th></tr>
            <tr>
                <th>义务人类型</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.ywrLx"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('ywrLx' , applicationInfoList.ywrLx)"
                        >
                    </el-switch>
                </td>
                <th>义务人姓名</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.ywrMc"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('ywrMc' , applicationInfoList.ywrMc)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>证件类型</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.ywrZjmc"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('ywrZjmc' , applicationInfoList.ywrZjmc)"
                        >
                    </el-switch>
                </td>
                <th>证件号码</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.ywrZjhm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('ywrZjhm' , applicationInfoList.ywrZjhm)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>电话号码</th>
                <td colspan=3>
                    <el-switch
                        v-model="applicationInfoList.ywrDh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('ywrDh' , applicationInfoList.ywrDh)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>法人代表/负责人姓名</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.ywrFzrXm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('ywrFzrXm' , applicationInfoList.ywrFzrXm)"
                        >
                    </el-switch>
                </td>
                <th>代理人姓名</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.ywrDlrXm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('ywrDlrXm' , applicationInfoList.ywrDlrXm)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>代理人证件类型</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.ywrDlrZjmc"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('ywrDlrZjmc' , applicationInfoList.ywrDlrZjmc)"
                        >
                    </el-switch>
                </td>
                <th>代理人证件号码</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.ywrDlrZjhm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('ywrDlrZjhm' , applicationInfoList.ywrDlrZjhm)"
                        >
                    </el-switch>
                </td>
            </tr>
        </table>
        <table>
          <tr><th colspan=4 style="height:40px;background:#EBEEF5;">不动产信息</th></tr>
            <tr>
                <th>不动产类型</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.bdclx"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bdclx' , applicationInfoList.bdclx)"
                        >
                    </el-switch>
                </td>
                <th>不动产权证书号</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.bdcqzsh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bdcqzsh' , applicationInfoList.bdcqzsh)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>不动产证明号</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.bdcdjzmh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bdcdjzmh' , applicationInfoList.bdcdjzmh)"
                        >
                    </el-switch>
                </td>
                <th>不动产单元号</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.bdcdyh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bdcdyh' , applicationInfoList.bdcdyh)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>房屋用途</th>
                <td >
                    <el-switch
                        v-model="applicationInfoList.fwyt"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fwyt' , applicationInfoList.fwyt)"
                        >
                    </el-switch>
                </td>
                <th>房屋坐落</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.fwzl"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fwzl' , applicationInfoList.fwzl)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>房屋面积</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.fwmj"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fwmj' , applicationInfoList.fwmj)"
                        >
                    </el-switch>
                </td>
                <th>房屋类型</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.fwlx"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fwlx' , applicationInfoList.fwlx)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>土地权利性质</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.tdxxQlxz"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxQlxz' , applicationInfoList.tdxxQlxz)"
                        >
                    </el-switch>
                </td>
                <th>土地用途</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.tdxxTdyt"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxTdyt' , applicationInfoList.tdxxTdyt)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>土地坐落</th>
                <td >
                    <el-switch
                        v-model="applicationInfoList.tdxxZl"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxZl' , applicationInfoList.tdxxZl)"
                        >
                    </el-switch>
                </td>
                <th>土地面积</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.tdxxMj"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxMj' , applicationInfoList.tdxxMj)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>土地使用年限起</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.tdxxTtsynxq"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxTtsynxq' , applicationInfoList.tdxxTtsynxq)"
                        >
                    </el-switch>
                </td>
                <th>土地使用年限至</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.tdxxTtsynxz"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxTtsynxz' , applicationInfoList.tdxxTtsynxz)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>附记</th>
                <td colspan=3>
                    <el-switch
                        v-model="applicationInfoList.fj"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fj' , applicationInfoList.fj)"
                        >
                    </el-switch>
                </td>
            </tr>
          <tr><th colspan=4 style="height:40px;background:#EBEEF5;">共有情况</th></tr>
            <tr>
                <th>共有方式</th>
                <td colspan=3>
                    <el-switch
                        v-model="applicationInfoList.gyfs"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('gyfs' , applicationInfoList.gyfs)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>按份共有情况</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.afgyqk"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('afgyqk' , applicationInfoList.afgyqk)"
                        >
                    </el-switch>
                </td>
                <th>其他共有情况</th>
                <td>
                    <el-switch
                        v-model="applicationInfoList.qtgyqk"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qtgyqk' , applicationInfoList.qtgyqk)"
                        >
                    </el-switch>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import service from '@/api/deploy/index';
export default {
    data() {
        return {
            radio:'1',
            applicationInfoList:{}
        };
    },
    mounted() {
        this.applicationInfo()
    },
    methods: {
        async applicationInfo() {
            const res = await service.applicationInfo()
            this.applicationInfoList = res
        },
        //状态改变弹框
        changInfo(x, y) {
            this.$confirm('此操作将改变该数据的条件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.getchangapply(x, y)
            }).catch(() => {
            this.applicationInfo()
            this.$message({
                type: 'info',
                message: '已取消更改'
            });
            });
        },
        //状态改变请求
        async getchangapply(x,y) {
            const res = await service.changApply(x,y)
            this.$message.success('更改条件成功');
            this.applicationInfo()
        },
    }
}
</script>
<style scoped>
table{
    width: 100%;
    border-spacing:0;
    color: #6F737E;
    font-size: 14px;
    border-right: solid 1px #EBEEF5;
    border-bottom: solid 1px #EBEEF5;
}
th{
    height: 56px;
    border-left: solid 1px #EBEEF5;
    border-top: solid 1px #EBEEF5;
    width: 17%;
}
td{
    height: 56px;
    border-left: solid 1px #EBEEF5;
    border-top: solid 1px #EBEEF5;
    text-align: center;
    width: 37%;
    line-height: 56px;
}
</style>