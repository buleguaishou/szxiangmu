<template>
    <div>
        <table >
            <tr style="background:#6F737E;color:#FFFFFF;">
                <th>数据名称</th>
                <td>约束条件</td>
                <th>数据名称</th>
                <td>约束条件</td>
            </tr>
            <tr>
                <th>受理单号</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.sldh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('sldh' , registerInfoList.sldh)"
                        >
                    </el-switch>
                </td>
                <th>登簿日期</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.dbrq"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('dbrq' , registerInfoList.dbrq)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>登簿人</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.dbr"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('dbr' , registerInfoList.dbr)"
                        >
                    </el-switch>
                </td>
                <th>登簿原因</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.djyy"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('djyy' , registerInfoList.djyy)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr><th colspan=4 style="height:40px;background:#EBEEF5;">登记机构</th></tr>
            <tr>
                <th>登记机构名称</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.djjg"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('djjg' , registerInfoList.djjg)"
                        >
                    </el-switch>
                </td>
                <th>登记机构代码</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.djjgCode"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('djjgCode' , registerInfoList.djjgCode)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>登记机构所在区县</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qxmc"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qxmc' , registerInfoList.qxmc)"
                        >
                    </el-switch>
                </td>
                <th>登记区县代码</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qxdm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qxdm' , registerInfoList.qxdm)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>

                <th>登记类型</th>
                <td colspan=4>
                    <el-switch
                        v-model="registerInfoList.djlx"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('djlx' , registerInfoList.djlx)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr><th colspan=4 style="height:40px;background:#EBEEF5;">权利人信息</th></tr>
            <tr>
                <th>权利人类型</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qlrLx"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrLx' , registerInfoList.qlrLx)"
                        >
                    </el-switch>
                </td>
                <th>权利人姓名</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qlrLx"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrLx' , registerInfoList.qlrLx)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>证件类型</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qlrZjmc"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrZjmc' , registerInfoList.qlrZjmc)"
                        >
                    </el-switch>
                </td>
                <th>证件号码</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qlrZjhm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrZjhm' , registerInfoList.qlrZjhm)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>电话号码</th>
                <td colspan=4>
                    <el-switch
                        v-model="registerInfoList.qlrDh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrDh' , registerInfoList.qlrDh)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>法人代表/负责人姓名</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qlrFzrXm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrFzrXm' , registerInfoList.qlrFzrXm)"
                        >
                    </el-switch>
                </td>
                <th>代理人姓名</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qlrDlrXm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrDlrXm' , registerInfoList.qlrDlrXm)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>代理人证件类型</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qlrDlrZjmc"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrDlrZjmc' , registerInfoList.qlrDlrZjmc)"
                        >
                    </el-switch>
                </td>
                <th>代理人证件号码</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qlrDlrZjhm"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qlrDlrZjhm' , registerInfoList.qlrDlrZjhm)"
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
                        v-model="registerInfoList.bdclx"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bdclx' , registerInfoList.bdclx)"
                        >
                    </el-switch>
                </td>
                <th>不动产权证书号</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.bdcqzsh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bdcqzsh' , registerInfoList.bdcqzsh)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>不动产证明号</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.bdcdjzmh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bdcdjzmh' , registerInfoList.bdcdjzmh)"
                        >
                    </el-switch>
                </td>
                <th>不动产单元号</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.bdcdyh"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('bdcdyh' , registerInfoList.bdcdyh)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>房屋用途</th>
                <td >
                    <el-switch
                        v-model="registerInfoList.fwyt"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fwyt' , registerInfoList.fwyt)"
                        >
                    </el-switch>
                </td>
                <th>房屋坐落</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.fwzl"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fwzl' , registerInfoList.fwzl)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>房屋面积</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.fwmj"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fwmj' , registerInfoList.fwmj)"
                        >
                    </el-switch>
                </td>
                <th>房屋类型</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.fwlx"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fwlx' , registerInfoList.fwlx)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>土地权利性质</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.tdxxQlxz"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxQlxz' , registerInfoList.tdxxQlxz)"
                        >
                    </el-switch>
                </td>
                <th>土地用途</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.tdxxTdyt"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxTdyt' , registerInfoList.tdxxTdyt)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>土地坐落</th>
                <td >
                    <el-switch
                        v-model="registerInfoList.tdxxZl"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxZl' , registerInfoList.tdxxZl)"
                        >
                    </el-switch>
                </td>
                <th>土地面积</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.tdxxMj"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxMj' , registerInfoList.tdxxMj)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>土地使用年限起</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.tdxxTtsynxq"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxTtsynxq' , registerInfoList.tdxxTtsynxq)"
                        >
                    </el-switch>
                </td>
                <th>土地使用年限至</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.tdxxTtsynxz"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('tdxxTtsynxz' , registerInfoList.tdxxTtsynxz)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>附记</th>
                <td colspan=3>
                    <el-switch
                        v-model="registerInfoList.fj"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('fj' , registerInfoList.fj)"
                        >
                    </el-switch>
                </td>
            </tr>
          <tr><th colspan=4 style="height:40px;background:#EBEEF5;">共有情况</th></tr>
            <tr>
                <th>共有方式</th>
                <td colspan=3>
                    <el-switch
                        v-model="registerInfoList.gyfs"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('gyfs' , registerInfoList.gyfs)"
                        >
                    </el-switch>
                </td>
            </tr>
            <tr>
                <th>按份共有情况</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.afgyqk"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('afgyqk' , registerInfoList.afgyqk)"
                        >
                    </el-switch>
                </td>
                <th>其他共有情况</th>
                <td>
                    <el-switch
                        v-model="registerInfoList.qtgyqk"
                        :active-value = "true"
                        :inactive-value = "false"
                        active-text="必选"
                        inactive-text="可选"
                        @change="changInfo('qtgyqk' , registerInfoList.qtgyqk)"
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
            registerInfoList:{}
        };
    },
    mounted() {
        this.registerInfo()
    },
    methods: {
        async registerInfo() {
            const res = await service.registerInfo()
            this.registerInfoList = res
        },
        //状态改变弹框
        changInfo(x, y) {
            this.$confirm('此操作将改变该数据的条件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.getchangRegister(x, y)
            }).catch(() => {
            this.registerInfo()
            this.$message({
                type: 'info',
                message: '已取消更改'
            });
            });
        },
        //状态改变请求
        async getchangRegister(x,y) {
            const res = await service.changRegister(x,y)
            this.$message.success('更改条件成功');
            this.registerInfo()
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