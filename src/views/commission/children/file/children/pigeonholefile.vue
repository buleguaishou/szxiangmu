<template>
    <div>
        <div v-if="isShow" :key="isKey">
            <el-radio-group style="margin-bottom: 30px">
                <el-button :type="1 == display ? 'primary' : ''" @click="catalogue(1)">目录</el-button>
                <el-button v-if="!noFile" :type="0 == display ? 'primary' : ''" @click="file(0)">文件</el-button>
            </el-radio-group>
            <div v-if="display == 1" style="width: 100%;">
                <el-image
                    :preview-src-list="srcList"
                    v-if="url"
                    :src="this.url"
                    alt=""
                    fit="contain"
                    style="width: 900px; height: 1200px;margin-top:-10px;margin-left:20%; cursor: pointer"
                />
            </div>
            <div v-if="display == 0" style="display: flex">
                <div class="left">
                    <div style="padding: 12px 0 0 16px">
                        <span style="color: #333a4d; height: 19px; line-height: 19px; font-weight: bold; display: flex">
                            <div style="background: #4687ff; width: 4px; height: 12px; border-radius: 2px; margin: 3px 4px"></div>
                            文件分类</span
                        >
                    </div>
                    <!-- <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title">
                                <el-button type="text" @click="file(0)" style="color: #333a4d">
                                    <img style="margin-right: 5px" src="@/assets/img/pig-file-big.png" alt="" /><span>{{
                                        fileList.archiveCode ? fileList.archiveCode : '---------'
                                    }}</span>
                                </el-button>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item  v-for="(el, index) in fileList.elecDocumentVOS" :key="index" :index="index"><el-button
                                    type="text"
                                    @click="elecDocumentVOSList(el.flMc)"
                                    :disabled="el.wjys == '0'"
                                    style="color: #333a4d"
                                >
                                    <img style="margin-right: 5px" src="@/assets/img/pig-file-small.png" alt="" /><span>{{ el.flMc }}</span
                                    >({{ el.wjys }})
                                </el-button>
                            </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu> -->
                    <div style="padding: 18px 0 0 20px; font-size: 14px">
                        <el-button type="text" @click="file(0)" style="color: #333a4d">
                            <img style="margin-right: 5px" src="@/assets/img/pig-file-big.png" alt="" /><span>{{
                                fileList.archiveCode ? fileList.archiveCode : '---------'
                            }}</span>
                        </el-button>
                        <ul>
                            <li v-for="(el, index) in fileList.elecDocumentVOS" :key="index">
                                <el-button
                                    type="text"
                                    @click="elecDocumentVOSList(el.flMc)"
                                    :disabled="el.wjys == '0'"
                                    style="color: #333a4d"
                                >
                                    <img style="margin-right: 5px" src="@/assets/img/pig-file-small.png" alt="" /><span>{{ el.flMc }}</span
                                    >({{ el.wjys }})
                                </el-button>
                            </li>
                        </ul>
                        <ul style="margin-top: 10px" v-if="fileList.ycls && fileList.ycls.length > 0">
                            <img style="margin-right: 5px" src="@/assets/img/pig-file-big.png" alt="" /><span
                                style="cursor: pointer"
                                @click="yclsList(1)"
                                >源文件</span
                            >
                            <div>
                                <li v-for="(p, q) in fileList.ycls" :key="q">
                                    <el-button type="text" @click="yclsList(p.flMc)" :disabled="p.wjys == '0'" style="color: #333a4d">
                                        <img style="margin-right: 5px" src="@/assets/img/pig-file-small.png" alt="" /><span>{{
                                            p.flMc
                                        }}</span
                                        >({{ p.wjys }})
                                    </el-button>
                                </li>
                            </div>
                        </ul>
                        <ul style="margin-top: 10px" v-if="fileList.ysjName">
                            <img v-if="fileList.ysjName" style="margin-right: 5px" src="@/assets/img/pig-file-big.png" alt="" /><span
                                v-if="fileList.ysjName"
                                >元数据</span
                            >
                            <div v-if="fileList.ysjName">
                                <li style="margin-top: 20px">
                                    <div style="display: flex; cursor: pointer">
                                        <img style="margin-right: 5px; height: 14px" src="@/assets/img/pig-file-small.png" alt="" /><span>{{
                                            fileList.ysjName
                                        }}</span
                                        ><el-button @click="psaajson" type="text" style="margin-left: 30px; margin-top: -11px"
                                            >验签</el-button
                                        >
                                    </div>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="right">
                    <ul v-if="yuanData">
                        <div v-for="(n, m) in elecDocumentVOS" :key="m">
                            <li v-if="n.imageinfos && n.imageinfos.length > 0">
                                <div style="padding: 16px 12px 12px 12px">
                                    <span>文件号：{{ n.wjh }}</span
                                    ><el-button type="text"></el-button
                                    ><span style="display: inline-block; float: right">页码：{{ n.pageNum }}</span>
                                </div>
                                <div style="display: flex; flex-wrap: wrap">
                                    <div style="padding-left: 12px" v-for="(j, k) in n.imageinfos" :key="k">
                                        <el-image
                                            style="width: 128px; height: 96px; cursor: pointer"
                                            :class="red[j.id] == true ? 'red' : ''"
                                            :src="j.path"
                                            :preview-src-list="srcList"
                                            alt=""
                                        /><br />
                                        <span
                                            style="
                                                width: 128px;
                                                text-align: center;
                                                display: block;
                                                white-space: nowrap;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                -o-text-overflow: ellipsis;
                                            "
                                            >{{ j.name }}</span
                                        >
                                        <el-button type="text" @click="getpassimg(j.id)">
                                            <span style="width: 128px; text-align: center; display: block">查看电子签名</span>
                                        </el-button>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                    <ul v-if="!yuanData">
                        <div v-for="(n, m) in ycls" :key="m">
                            <li v-if="n.imageinfos && n.imageinfos.length > 0">
                                <div style="padding: 16px 12px 12px 12px"></div>
                                <div style="display: flex; flex-wrap: wrap">
                                    <div style="padding-left: 12px" v-for="(j, k) in n.imageinfos" :key="k">
                                        <el-image
                                            v-if="j.lx == 'jpg' || j.lx == 'png'"
                                            style="width: 128px; height: 96px; cursor: pointer"
                                            :class="red[j.id] == true ? 'red' : ''"
                                            :src="j.path"
                                            :preview-src-list="srcList"
                                            alt=""
                                        /><br />
                                        <img
                                            v-if="j.lx == 'doc' || j.lx == 'docx'"
                                            style="margin-left: 10px; width: 96px; height: 96px; cursor: pointer"
                                            :class="red[j.id] == true ? 'red' : ''"
                                            @click="downLoad(j.path)"
                                            src="../../../../../assets/461603862518_.pic_hd.jpg"
                                            alt=""
                                        /><br />
                                        <img
                                            v-if="j.lx == 'pdf'"
                                            style="margin-left: 10px; width: 96px; height: 96px; cursor: pointer"
                                            :class="red[j.id] == true ? 'red' : ''"
                                            @click="downLoad(j.path)"
                                            src="../../../../../assets/451603862518_.pic_hd.jpg"
                                            alt=""
                                        /><br />
                                        <span
                                            style="
                                                width: 128px;
                                                text-align: center;
                                                display: block;
                                                white-space: nowrap;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                -o-text-overflow: ellipsis;
                                            "
                                            >{{ j.name }}</span
                                        >
                                        <el-button type="text" @click="getpassimg(j.id)">
                                            <span style="width: 128px; text-align: center; display: block">查看电子签名</span>
                                        </el-button>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                    <el-dialog v-dialogDrag title="签名信息" center :visible.sync="visible" width="80%">
                        <table>
                            <tr>
                                <th>验签结果</th>
                                <td style="display: flex">
                                    <img
                                        style="width: 30px; height: 30px; margin-top: 13px; margin-left: 34%; margin-right: 10px"
                                        v-if="!visibleList.failedReason"
                                        src="../../../../../assets/img/pass.png"
                                        alt=""
                                    />
                                    <img
                                        style="width: 30px; height: 30px; margin-top: 13px; margin-left: 43%; margin-right: 10px"
                                        v-if="visibleList.failedReason"
                                        src="../../../../../assets/img/loser.png"
                                        alt=""
                                    />
                                    {{ visibleList.signedResult }}
                                </td>
                            </tr>
                            <tr v-if="this.visibleList.failedReason">
                                <th>错误原因</th>
                                <td>{{ visibleList.failedReason }}</td>
                            </tr>
                            <tr>
                                <th>签名机构</th>
                                <td>{{ visibleList.issuer }}</td>
                            </tr>
                            <tr>
                                <th>签名时间</th>
                                <td>{{ visibleList.signedDate }}</td>
                            </tr>
                            <tr v-if="this.visibleList.publicKey">
                                <th>公钥PK</th>
                                <td style="padding: 20px">
                                    <div id="ididid">{{ visibleList.publicKey }}</div>
                                    <span>...</span>
                                </td>
                            </tr>
                            <tr>
                                <th>签名</th>
                                <td style="padding: 20px">{{ visibleList.signedData }}</td>
                            </tr>
                        </table>
                    </el-dialog>
                </div>
            </div>
        </div>
        <div v-if="!isShow" style="padding: 100px">
            <span>{{ this.noShow }}</span>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Schart from 'vue-schart';
import upload from '@/api/common/index';
import bus from '@/components/common/bus';
import service from '@/api/commission/children/index';
import Viewer from '@/assets/js/viewer.js';
import '@/assets/css/viewer.css';
export default {
    data() {
        return {
            isShow: true,
            display: 1,
            noShow: '',
            noFile: false,
            fileList: {},
            srcList: [],
            elecDocumentVOS: [],
            ycls: [],
            url: '',
            type: '',
            isKey: 1,
            wj: 1,
            red: [],
            visibleList: {},
            visible: false,
            yuanData: true
        };
    },
    mounted() {
        this.catalogue(1);
    },
    methods: {
        //获取目录
        async catalogue(flat) {
            this.srcList = [];
            this.display = flat;
            const res = await service.getFile(this.$route.params.sldh, {
                type: 1
            });
            if (res.code == 100004) {
                this.isShow = false;
                this.noShow = res.message;
                return;
            }
            if (!res.filePath) {
                this.noFile = true;
                ++this.isKey;
                return;
            }
            this.url = res.filePath;
            this.srcList.push(this.url);
            ++this.isKey;
        },
        //获取文件
        async file(flat) {
            this.yuanData = true;
            this.wj = 1;
            this.srcList = [];
            this.display = flat;
            const res = await service.getFile(this.$route.params.sldh, {
                type: 2
            });
            this.fileList = res;
            this.elecDocumentVOS = this.fileList.elecDocumentVOS;
            this.elecDocumentVOS.map((el) => {
                if (el.imageinfos) {
                    el.imageinfos.map((j) => {
                        this.srcList.push(j.path);
                    });
                }
                let key = 'wjh';
                let value = this.wj;
                el[key] = '320508001-2020-100Z022-D-2020320508908000077-Y00-C-0100' + value;
                this.wj++;
            });
            this.srcList.push(this.fileList.ysjPath);
        },
        elecDocumentVOSList(flMc) {
            this.yuanData = true;
            this.srcList = [];
            this.elecDocumentVOS = this.fileList.elecDocumentVOS;
            this.elecDocumentVOS.map((el) => {
                if (el.flMc == flMc) {
                    this.elecDocumentVOS = [];
                    this.elecDocumentVOS.push(el);
                    el.imageinfos.map((j) => {
                        this.srcList.push(j.path);
                    });
                }
            });
            ++this.isKey;
        },
        async yclsList(flMc) {
            this.yuanData = false;
            this.srcList = [];
            const res = await service.getFile(this.$route.params.sldh, {
                type: 2
            });
            this.fileList = res;
            if (flMc == 1) {
                this.ycls = this.fileList.ycls;
                return;
            }
            this.ycls = this.fileList.ycls;
            this.ycls.map((el) => {
                if (el.flMc == flMc) {
                    this.ycls = [];
                    this.ycls.push(el);
                    el.imageinfos.map((j) => {
                        this.srcList.push(j.path);
                    });
                }
            });
            ++this.isKey;
        },
        async getpassimg(id) {
            const res = await upload.passimg('image', id);
            if (res.code) {
                this.red[id] = true;
                ++this.isKey;
            } else {
                this.visible = true;
                this.visibleList = res;
            }
        },
        async psaajson() {
            const res = await upload.passimg('metadata', this.$route.params.sldh);
            if (res.code) {
            } else {
                this.visible = true;
                this.visibleList = res;
            }
        },
        ywjload(path) {
            window.open(path);
        },
        downLoad(path) {
            window.open(path);
        }
    }
};
</script>

<style scoped>
.el-radio-button {
    border-radius: 4px !important;
}
table {
    width: 100%;
    border-spacing: 0;
    color: black;
    font-size: 14px;
    border-right: solid 1px black;
    border-bottom: solid 1px black;
}
.both {
    width: 83%;
}
th {
    height: 56px;
    border-left: solid 1px black;
    border-top: solid 1px black;
    width: 20%;
}
td {
    height: 56px;
    border-left: solid 1px black;
    border-top: solid 1px black;
    text-align: center;
    line-height: 56px;
}
.left {
    width: 20%;
    min-width: 268px;
    height: auto;
    background-color: #eff1f5;
    border-radius: 4px;
    margin-right: 8px;
    border: 1px solid #e1e4e8;
}
.el-menu-vertical-demo{
    background-color: #eff1f5;
    padding: 0;
}
.left ul li {
    list-style-type: none;
    padding-left: 10px;
}
.right {
    width: 80%;
}
.right ul li {
    /* height: 215px; */
    background: #ffffff;
    box-shadow: 0px 0px 6px rgba(51, 58, 77, 0.16);
    opacity: 1;
    border-radius: 4px;
    list-style-type: none;
    margin-bottom: 8px;
}
.el-upload {
    width: 70%;
}
.red {
    border: 1px solid red;
}

#ididid {
    position: relative;
    height: 220px;
    text-overflow: ellipsis;
    white-space: normal;
    *white-space: nowrap;
    overflow: hidden;
}
#ididid span {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    float: left;
}
#ididid span:after {
    content: '...';
}
</style>