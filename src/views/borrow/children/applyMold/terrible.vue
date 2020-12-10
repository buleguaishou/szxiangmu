<template>
    <div>
        <div class="container" :key="Keyup">
            <table class="heard">
                <tr>
                    <th rowspan="5" class="rows">查<br />询<br />申<br />请<br />人</th>
                    <th>类别</th>
                    <td style="text-align: left">
                        <span style="margin-left: 50px">利害关系人</span>
                    </td>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th class="sqs"><i>*</i>姓名（名称）</th>
                    <td>
                        <el-input class="paperview-input-text" :disabled="type === 'check'" v-model="form.applicationName"> </el-input>
                    </td>
                    <th><i>*</i>电话号码</th>
                    <td>
                        <el-input class="paperview-input-text" :disabled="type === 'check'" v-model="form.applicationMobile"> </el-input>
                    </td>
                </tr>
                <tr>
                    <th><i>*</i>证件类型</th>
                    <td style="text-align: left">
                        <el-select
                            class="paperview-input-text"
                            :disabled="type === 'check'"
                            v-model="form.applicationlx"
                            placeholder="请选择"
                        >
                            <el-option v-for="item in papersList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </td>
                    <th><i>*</i>证件号码</th>
                    <td>
                        <el-input class="paperview-input-text" :disabled="type === 'check'" v-model="form.applicationNo"> </el-input>
                    </td>
                </tr>
                <tr>
                    <th>代理人</th>
                    <td>
                        <el-input class="paperview-input-text" :disabled="type === 'check'" v-model="form.dlrName"> </el-input>
                    </td>
                    <th>电话号码</th>
                    <td>
                        <el-input class="paperview-input-text" :disabled="type === 'check'" v-model="form.dlrMobile"> </el-input>
                    </td>
                </tr>
                <tr>
                    <th>证件类型</th>
                    <td style="text-align: left">
                        <el-select class="paperview-input-text" :disabled="type === 'check'" v-model="form.dlrLx" placeholder="请选择">
                            <el-option v-for="item in papersList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </td>
                    <th>证件号码</th>
                    <td>
                        <el-input class="paperview-input-text" :disabled="type === 'check'" v-model="form.dlrNo"> </el-input>
                    </td>
                </tr>
            </table>
            <table class="body">
                <tr style="height: 83px">
                    <th><i>*</i>提交的申请材料</th>
                    <td style="text-align: left">
                        <el-checkbox-group style="margin-left: 50px" v-model="form.submitApplicationFlies" :disabled="type === 'check'">
                            <el-checkbox v-if="type === 'edit' || (form.submitApplicationFlies.includes('1') && type === 'check')" label="1"
                                >查询人身份证明</el-checkbox
                            ><br />
                            <el-checkbox v-if="type === 'edit' || (form.submitApplicationFlies.includes('5') && type === 'check')" label="5"
                                >存在利害关系的证明材料</el-checkbox
                            ><br />
                            <el-checkbox v-if="type === 'edit' || (form.submitApplicationFlies.includes('6') && type === 'check')" label="6"
                                >其他</el-checkbox
                            >
                            <el-input
                                class="paperview-input"
                                :disabled="type === 'check'"
                                v-if="form.submitApplicationFlies.includes('6')"
                                v-model="form.submitOtherApplicationFlie"
                            ></el-input>
                        </el-checkbox-group>
                    </td>
                </tr>
                <tr style="height: 121px">
                    <th class="sqs"><i>*</i>上传材料</th>
                    <td style="padding-bottom:20px">
                        <el-upload
                            class="upload-demo"
                            :auto-upload="false"
                            action="#"
                            :on-change="handleChange"
                            list-type="picture"
                            :show-file-list="false"
                            :disabled="type === 'check'"
                        >
                            <el-button v-if="type === 'edit'" size="small" type="primary" :disabled="type === 'check'">浏览</el-button>
                        </el-upload>
                        <ul style="margin-left:40px" v-for="(val, index) in fileUploadResults" :key="index" >
                            <li v-if="val.signImage == 0"  class="el-upload-list--picture el-upload-list__item">
                                <el-image
                                    v-if="['jpg', 'png'].includes(val.fileType)"
                                    :src="val.fileFullPath"
                                    :preview-src-list="srcList"
                                    style="width: 70px; height: 70px; margin-left: -200px;cursor:pointer;"
                                />
                                <img
                                    v-if="['doc', 'docx'].includes(val.fileType)"
                                    src="../../../../assets/461603862518_.pic_hd.jpg"
                                    style="width: 70px; height: 70px; margin-left: -200px;cursor:pointer;"
                                    @click="downLoad(val.fileFullPath)"
                                />
                                <img
                                    v-if="val.fileType == 'pdf'"
                                    src="../../../../assets/451603862518_.pic_hd.jpg"
                                    style="width: 70px; height: 70px; margin-left: -200px;cursor:pointer;"
                                    @click="downLoad(val.fileFullPath)"
                                />
                                <a
                                    style="
                                        display: block;
                                        margin: -60px 0 0 80px;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                    "
                                    >{{ val.fileName }}</a
                                >
                                <a
                                    v-if="type === 'edit'"
                                    style="float: right; margin-top: -50px"
                                    @click="type === 'check' ? '' : remove(index)"
                                    >x</a
                                >
                            </li>
                        </ul>
                        <span v-if="type === 'edit'" style="padding: 0">支持jpg，png，word，pdf多种格式上传，每个文件大小不超过5M.</span>
                    </td>
                </tr>
                <tr style="height: 90px">
                    <th><i>*</i>查询目的或用途</th>
                    <td style="text-align: left">
                        <el-radio-group style="margin-left: 50px" v-model="form.applicationUseType" :disabled="type === 'check'">
                            <el-radio v-if="type === 'edit' || (form.applicationUseType == '1' && type === 'check')" label="1"
                                >公正</el-radio
                            >
                            <el-radio v-if="type === 'edit' || (form.applicationUseType == '2' && type === 'check')" label="2"
                                >贷款</el-radio
                            >
                            <el-radio v-if="type === 'edit' || (form.applicationUseType == '3' && type === 'check')" label="3"
                                >交易</el-radio
                            >
                            <el-radio v-if="type === 'edit' || (form.applicationUseType == '4' && type === 'check')" label="4"
                                >拆迁</el-radio
                            >
                            <el-radio v-if="type === 'edit' || (form.applicationUseType == '5' && type === 'check')" label="5"
                                >上学</el-radio
                            >
                            <el-radio v-if="type === 'edit' || (form.applicationUseType == '6' && type === 'check')" label="6"
                                >自查</el-radio
                            >
                            <el-radio v-if="type === 'edit' || (form.applicationUseType == '7' && type === 'check')" label="7"
                                >诉讼</el-radio
                            >
                            <el-radio v-if="type === 'edit' || (form.applicationUseType == '8' && type === 'check')" label="8"
                                >其他</el-radio
                            >
                            <el-input
                                class="paperview-input"
                                :disabled="type === 'check'"
                                v-if="form.applicationUseType == '8'"
                                v-model="form.applicationUse"
                                maxlength="100"
                                show-word-limit
                            ></el-input>
                        </el-radio-group>
                    </td>
                </tr>
                <tr style="height: 198px">
                    <th><i>*</i>需要查询的坐落</th>
                    <td style="text-align: left;padding-left:30px">
                        <el-input
                            class="paperview-input"
                            style="width: 30%; margin-right: 24px"
                            v-if="type === 'edit'"
                            v-model="form.keyword"
                        >
                        </el-input>
                        <el-button type="primary" style="" @click="getquery" v-if="type === 'edit'">获取</el-button>
                        <el-checkbox-group
                            v-for="(val, index) in getzlList"
                            :key="index"
                            v-model="form.type"
                            style="display: flex; flex-direction: column"
                            :disabled="type === 'check'"
                        >
                            <el-checkbox :label="val" @change="pushList()">
                                <span style="margin-right: 30px">坐落 ： {{ val.zl }}</span>
                                <span
                                    >档案号 ：
                                    <el-button type="text" :disabled="type === 'edit'" @click="goDetails(val.sldh)">
                                        {{ val.archiveCode }}
                                    </el-button>
                                </span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </td>
                </tr>
            </table>
            <table class="footer">
                <tr style="height: 254px">
                    <th style="padding-top:50px">
                        <div>
                            承诺：本表填写内容以及提交的材料真实、合法、有效，并严格按照有关要求查阅、利用不动产登记资料，严格按照查询目的使用查询结果，如有虚假或者违反由本人（单位）承担相关法律责任。
                        </div>
                        <div style="margin-top: 100px; padding-left: 65%;margin-bottom:40px;width:15%;">
                            查询申请人：<el-button @click="screen" v-if="type === 'edit'&& qianming ">全屏</el-button>
                            <!-- <div  v-if="qianming" style="position: fixed; top: 0%; left: 0%;height:100%;width:100%;z-index:99">
                                <div v-if="type === 'edit'" class="esigns" id="con_lf_top_div" style="background-color:white;height:100%">
                                    <vue-esign
                                        ref="esign"
                                        :isCrop="isCrop"
                                        :lineWidth="lineWidth"
                                        :lineColor="lineColor"
                                        :bgColor.sync="bgColor"
                                        style="height:90%;border:solid 2px #EBEEF5;position: fixed; top: 15%; left: 0%;"
                                    />

                                    <div class="footbutton" style="position: fixed; top: 74%; left: 42%;">
                                        <el-button type="info" v-if="type === 'edit' " @click="handleReset">重置</el-button>
                                        <el-button type="primary" v-if="type === 'edit' " @click="handleGenerate">确定</el-button>
                                    </div>
                                </div>
                            </div> -->
                            <div v-if="!qianming">
                                <ul v-for="(val, index) in fileUploadResults" :key="index" >
                                    <li v-if="val.signImage == 1 "  class="el-upload-list--picture el-upload-list__item">
                                        <el-image
                                            :src="val.fileFullPath"
                                            :preview-src-list="srcList"
                                            style="width: 100%; height: 100%;cursor:pointer;"
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div v-if="type === 'check'" style="margin: 20px 50px 10px 0">
                                <span style="width:300px">{{this.borrowDate}}</span>
                            </div>
                        </div>
                    </th>
                </tr>
            </table>
            <div class="footbutton" v-if="type === 'edit'">
                <el-button @click="getBorrowAdd(1)" style="margin-right: 40px">暂存</el-button>
                <el-button type="primary" @click="getBorrowAdd(2)">提交</el-button>
            </div>
            <div class="footbutton" v-if="type === 'check'">
                <el-button type="primary" @click="getBorrow">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import upload from '@/api/common/index';
import service from '@/api/borrow/children/index';
export default {
    name: 'baseform',
    props : {
        row : Object,
        required : true
    },
    data() {
        return {
            form: {
                applicationName: '',
                applicationType: '利害关系人',
                submitApplicationFlies: [],
                submitOtherApplicationFlie: '',
                applicationUse: '',
                applicationlx: '身份证',
                applicationNo: '',
                applicationMobile: '',
                dlrName: '',
                dlrMobile: '',
                dlrLx: '',
                dlrNo: '',
                type: [],
                status: '',
                keyword: ''
            },
            papers: '',
            papersList: [
                { value: '身份证', label: '身份证' },
                { value: '港澳台身份证', label: '港澳台身份证' },
                { value: '护照', label: '护照' },
                { value: '外国护照', label: '外国护照' },
                { value: '户口薄', label: '户口薄' },
                { value: '军官证', label: '军官证' },
                { value: '士兵证', label: '士兵证' },
                { value: '组织机构代码', label: '组织机构代码' },
                { value: '营业执照', label: '营业执照' },
                { value: '其他', label: '其他' },
                { value: '其他个人证件', label: '其他个人证件' }
            ],
            srcList:[],
            fileList: [],
            fileUploadResults: [],
            getzlList: {},
            zls: [],
            archiveCodes: [],
            type: '',
            downloadInformation: '',
            selectInformation: '',
            Keyup: '',
            sldh: '',
            lineWidth: 6,
            lineColor: '#000000',
            bgColor: '',
            resultImg: '',
            isCrop: false,
            fullscreen:false,
            qianming:true,
            borrowDate:''
        };
    },
    watch:{
        row(){
            if(this.row.index == 0) {
                this.form.applicationName = this.row.cardData.empName
                this.form.applicationNo = this.row.cardData.empIndentity
            }
            if(this.row.index == 1) {
                this.getbase64(this.row.base64capture)
            }
        }
    },
    mounted() {
        this.init();
        window.addEventListener("message", this.receiveMessage);
    },
    methods: {
        async receiveMessage(event) {
            const autograph = await this.getCookie("autograph")
            // JSON.parse
            if(autograph) {
                this.fileUploadResults.map((val) => {
                    if(val.signImage == 1) {
                        this.fileUploadResults.splice(val.index, 1)
                        this.srcList.splice(val.index, 1)
                    }
                })
                const { fileName, fileType, filePath,signImage, fileFullPath} = JSON.parse(autograph);
                this.fileUploadResults.push({ fileName, fileType, filePath ,signImage, fileFullPath});
                this.srcList.push(fileFullPath)
                this.qianming = false
                this.$nextTick(() => {
                    this.$emit("initEloam", '.sqs')
                })
                ++this.Keyup
            }
        },
        getCookie(name) {
            //web中cookie是以分号+空格隔开的
            var res = document.cookie.split('; ');
            for (let i = 0; i < res.length; i++)
                if (res[i].split('=')[0] === name) return res[i].split('=')[1];
                //未找到
            return '';
        },
        async init() {
            const _this = this
            await this.getDetailsList();
            this.checkType();
            await this.cacheStorage.set('titleId', this.$route.params.id);
            this.$nextTick(() => {
                this.$emit("initEloam", '.sqs')
            })
            this.rmCookie("autograph")
        },
        async rmCookie(name) {
            this.setCookie(name, '', -1);
        },
        async setCookie(name, value, iTime) {
            const iDate = new Date();
            iDate.setDate(iDate.getDate() + iTime);
            document.cookie = name + '=' + value + ';expires=' + iDate.toGMTString();
        },
        //64
        async getbase64(base64capture) {
            const res = await upload.base64('jysq', {
                file : base64capture,
                signImage : 0
            });
            res.map((el) => {
                if (el.code && el.fileName) {
                    const { fileName, fileType, filePath,signImage,fileFullPath} = el;
                    this.fileUploadResults.push({ fileName, fileType, filePath ,signImage, fileFullPath});
                    this.srcList.push(fileFullPath)
                } else {
                    if (el.code == 110000) {
                        this.$message.warning(res.message);
                    }
                }
            });
        },
        downLoad(fileFullPath) {
            window.open(filePath)
        },
        //获取状态
        checkType() {
            switch (this.form.status) {
                case '1':
                case '':
                    this.type = 'edit';
                    this.$nextTick(() => {
                        this.$emit("initEloam", '.sqs')
                    })

                    break;
                case '2':
                    this.type = 'check';
                    break;
            }
        },
        //上传
        handleChange(file, fileList) {
            if (['.doc', '.docx', '.jpg', '.png', '.pdf'].includes(file.name)) {
                this.$message.warning('上传文件的格式不正确，请上传jpg，png，doc，docx,pdf格式的文件');
                return;
            }
            if (file.size / (1024 * 1024) > 5) {
                this.$message.warning('每个文件不能超过5M');
                return;
            }
            const params = new FormData();
            params.append('signImage', 0);
            params.append('file', file.raw);
            this.upfile(params);
        },
        //删除文件
        remove(index) {
            this.fileUploadResults.splice(index, 1);
        },
        //上传文件
        async upfile(params) {
            const res = await upload.upfile('jysq', params);
            if (res.code && res.fileName) {
                const { filePath, fileName, fileType ,signImage, fileFullPath} = res;
                this.fileUploadResults.push({ filePath, fileName, fileType ,signImage, fileFullPath});
                this.srcList.push(fileFullPath)
                if(signImage == 1){
                    this.fullscreen = false
                    this.qianming = false
                    this.$nextTick(() => {
                        this.$emit("initEloam", '.sqs')
                    })
                    ++this.Keyup
                }
            } else {
                if (res.code == 110000) {
                    this.$message.warning(res.message);
                }
            }
        },
        //获取坐落
        async getquery() {
            const res = await service.query({
                keyword: this.form.keyword,
                type: 1
            });
            if (res.code) {
            } else {
                this.getzlList = res;
                this.$nextTick(() => {
                    this.$emit("initEloam", '.sqs')
                })
                ++this.Keyup;
            }
        },
        //复选框
        async pushList() {
            this.zls = [];
            this.archiveCodes = [];
            this.form.type.forEach((e) => {
                this.zls.push(e.zl);
            });
            this.form.type.forEach((e) => {
                this.archiveCodes.push(e.archiveCode);
            });
            console.log(this.zls,this.archiveCodes)
            this.$nextTick(() => {
                this.$emit("initEloam", '.sqs')
            })
            ++this.Keyup;
        },
        //暂存/提交
        async getBorrowAdd(status) {
            const {
                applicationName,
                applicationUseType,
                applicationUse,
                applicationType,
                applicationlx,
                applicationNo,
                applicationMobile,
                dlrName,
                dlrMobile,
                dlrLx,
                dlrNo,
                type,
                submitApplicationFlies,
                submitOtherApplicationFlie
            } = this.form;
            const validate = this.validate;
            if (status === 2) {
                if (
                    !validate.isNull(applicationName, '申请人姓名不能为空') ||
                    !validate.isNull(applicationNo, '证件号码不能为空') ||
                    // !validate.isCard(applicationNo) ||
                    // !validate.isCard(dlrNo) ||
                    !validate.isNull(applicationMobile, '联系电话不能为空') ||
                    !validate.isPhone(applicationMobile) ||
                    !validate.isNull(applicationlx, '证件类型不能为空') ||
                    !validate.isArrayLen(submitApplicationFlies, '提交的申请材料不能为空') ||
                    !validate.isArrayLen(this.fileUploadResults, '上传资料不能为空') ||
                    !validate.isNull(this.zls, '查询内容不能为空') ||
                    !validate.isNull(applicationUseType, '目的或用途不能为空')
                ) {
                    this.$message.warning(validate.error);
                    return;
                }
            }
            const params = {
                applicationName,
                applicationUseType,
                applicationUse,
                applicationType,
                applicationlx,
                applicationNo,
                applicationMobile,
                dlrName,
                dlrMobile,
                dlrLx,
                dlrNo,
                status,
                zl: this.zls.join('&&'),
                archiveCode: this.archiveCodes.join(','),
                submitApplicationFlies: submitApplicationFlies.join(','),
                fileUploadResults: this.fileUploadResults,
                submitOtherApplicationFlie,
                id: this.$route.params.id
            };
            const res = await service.borrowAdd(params);
            if (res.code) {
            } else {
                if (status == 1) {
                    this.$message.success('暂存申请成功');
                    this.$router.push({ path: `/borrow/record` });
                } else {
                    this.$message.success('提交申请成功');
                    this.form.status = '2';
                    ++this.Keyup;
                    this.checkType();
                }
            }
        },
        //跳转详情
        goDetails(sldh) {
            this.$router.push({ path: `/search/list/pigeonhole/${sldh}/1` });
        },
        //返回借阅记录
        getBorrow() {
            this.$router.push({ path: `/borrow/record` });
        },
        //编辑
        async getDetailsList() {
            if (this.$route.params.id == '000') {
            } else {
                const res = await service.detailsList(this.$route.params.id);
                this.qianming = false
                this.form = res.borrowApplication;
                this.borrowDate = res.borrowApplicationDetailVO.borrowDate
                this.fileUploadResults = this.form.files;
                this.form.submitApplicationFlies = this.form.submitApplicationFlies.split(',');
                this.getzlList = res.borrowApplicationDetailVO.fileLocationVOS;
                this.form.type = this.getzlList;
                this.form.type.forEach((e) => {
                    this.zls.push(e.zl);
                });
                this.form.type.forEach((e) => {
                    this.archiveCodes.push(e.archiveCode);
                });
                ++this.Keyup;
            }
        },
        //quanping
        screen(){
            // this.qianming = true
            let { href } = this.$router.resolve({ path: '/screen' })
            window.open(href, '_blank',  'width=1900px, height=2000px, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=yes, location=no, status=no')
        },
    }
};
</script>
<style scoped>
/* span{
    color: #6F737E;
    font-size: 14px;
}
.el-form-item{
    padding-bottom: 4px;
}*/
.el-upload--text {
    width: 82px;
    height: 33px;
}
.el-upload {
    margin-left: 150px;
    width: 82px;
    height: 33px;
}
.el-upload-list--picture {
    width: 300px;
    height: 90px;
    list-style-type: none;
    padding: 10px 10px 10px 10px;
    border: 1px solid #c0ccda;
    border-radius: 6px;
}
table {
    width: 100%;
    border-spacing: 0;
    font-size: 14px;
    border-right: solid 1px #EBEEF5;
    /* border-bottom: solid 1px #EBEEF5; */
}
th {
    color: #6F737E;
    height: 56px;
    border-left: solid 1px #EBEEF5;
    border-top: solid 1px #EBEEF5;
}
td {
    height: 56px;
    color: #333A4D;
    border-left: solid 1px #EBEEF5;
    border-top: solid 1px #EBEEF5;
    text-align: center;
    line-height: 56px;
    /* padding-left: 24px; */
}
.heard th {
    width: 150px;
}
.heard td {
    width: 374px;
}
.heard .rows {
    width: 62px;
    color: #333A4D;
    font-weight: bold;
}
.body th {
    width: 220px;
}
.body td {
    width: 899px;
}
.footer {
    border-bottom: solid 1px #EBEEF5;
    margin-bottom: 40px;
    text-align: left;
}
.footer span {
    display: inline-block;
    width: 34px;
}
.footbutton {
    display: flex;
    justify-content: center;
}
.paperview-input-text >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 0px;
    width: 86%;
}
.paperview-input >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 0px;
    width: 100%;
}
.paperview-input {
    display: inline-block;
    border-bottom: solid 2px #EBEEF5;
    width: 175px;
    margin-left: 24px;
}
th i {
    color: red;
    display: inline-block;
    margin-right: 2px;
}
.el-select {
    margin-left: 36px;
}
</style>