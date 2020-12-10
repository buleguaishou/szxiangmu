<template>
    <div class="tags" v-if="showTags" :key='ListKey'>
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.meta.group)}" :key="index">
                <!-- <router-link :to="goRouter(item)" class="tags-li-title">
                    {{item.title}}
                </router-link> -->
                <span @click="goRouter(item)" class="tags-li-title">{{item.title}}</span>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary" style="font-size:14px;margin-left: 4px;">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: [],
                setsldh:'',
                stosldh:'',
                signsldh:'',
                searchsldh:'',
                searchwjys:'',
                titleId:'',
                officeId:'',
                terribleId:'',
                ListKey:'',
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            },
            menuCacheVersion() {
                return this.$store.getters.menuCacheVersion
            }
        },
        watch: {
            //监听当前Tags关闭
            $route(newValue, oldValue){
                this.setTags(newValue);
            },
            '$store.state.menuCacheVersion':function (newValue, oldValue){
                this.getTageList();
            }
        },
        created(){
            this.getTageList()
            // 监听关闭当前页面的标签页
            bus.$on('close_current_tags', () => {
                for (let i = 0, len = this.tagsList.length; i < len; i++) {
                    const item = this.tagsList[i];
                    if(item.path === this.$route.fullPath){
                        if(i < len - 1){
                            this.$router.push(this.tagsList[i+1].path);
                        }else if(i > 0){
                            this.$router.push(this.tagsList[i-1].path);
                        }else{
                            this.$router.push('/');
                        }
                        this.tagsList.splice(i, 1);
                        break;
                    }
                }
            })
        },
        methods: {
            //获取缓存中携带参数路由的参数
            async initSldh() {
                this.setsldh = await this.cacheStorage.get("setsldh")
                this.stosldh = await this.cacheStorage.get("stosldh")
                this.signsldh = await this.cacheStorage.get("signsldh")
                this.searchsldh = await this.cacheStorage.get("searchsldh")
                this.searchwjys = await this.cacheStorage.get("searchwjys")
                this.titleId = await this.cacheStorage.get("titleId")
                this.officeId = await this.cacheStorage.get("officeId")
                this.terribleId = await this.cacheStorage.get("terribleId")
            },
            //携带参数跳转的特殊处理
            async goRouter(item) {
                await this.initSldh()
                let path
                switch (item.title) {
                    case '待签收':
                        path = `/commission/settle/pigeonhole/${this.signsldh}/3`;
                        break;
                    case '待整理':
                        path = `/commission/settle/pigeonhole/${this.setsldh}/1`;
                        break;
                    case '待入库':
                        path = `/commission/storages/pigeonhole/${this.stosldh}/2`
                        break;
                    case '检索查看':
                        path = `/search/list/pigeonhole/${this.searchsldh}/${this.searchwjys}`
                        break;
                    case '权利人':
                        path = `/borrow/apply/title/${this.titleId}`
                        break;
                    case '国家机关':
                        path = `/borrow/apply/office/${this.officeId}`
                        break;
                    case '利害人':
                        path = `/borrow/apply/terrible/${this.terribleId}`
                        break;
                    default:
                        path = item.meta.group || item.path
                        break;
                }
                this.$router.push({path})
                this.$emit('SidebarPath',path)
            },
            //刷新页面时tage列表
            async getTageList() {

                const TagsList = await this.cacheStorage.get("tagsList")
                if(TagsList && TagsList.length > 0) {
                    this.tagsList = TagsList;
                } else {
                    this.setTags(this.$route);
                }
                ++this.ListKey
            },
            //选中的标签的路由跳转
            isActive(path) {
                return path === this.$route.meta.group;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                    this.cacheStorage.set("tagsList", this.tagsList)
                    this.$emit('SidebarPath',item.path)
                }else{
                    this.$router.push('/commission');
                    this.$emit('SidebarPath',item.path)
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/commission');
                this.$emit('SidebarPath',"/commission")
                this.tagsList.push({
                    title: '我的待办',
                    code: 'myUpcoming',
                    meta: {
                        group: '/commission',
                        title: '我的待办',
                    },
                    path: '/commission'
                })
                this.cacheStorage.set("tagsList", this.tagsList)
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                // console.log(curItem)
                this.tagsList = curItem;
                this.cacheStorage.set("tagsList", this.tagsList)
            },
            // 设置标签
            async setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.meta.group === route.meta.group;
                })
                if(!isExist){
                    if(this.tagsList.length >= 10){
                        this.tagsList.shift();
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        meta: route.meta,
                        name: route.matched[1].components.default.name
                    })
                    await this.cacheStorage.set("tagsList", this.tagsList)
                    bus.$emit('tags', this.tagsList);
                    return
                }
            },
            //关闭不是全部就是其他
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
    }
</script>


<style>
    .tags {
        position: relative;
        height: 40px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 4px 5px 2px 3px;
        border-radius: 3px;
        font-size: 14px;
        overflow: hidden;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        font-size: 14px !important;
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 5px;
        text-align: center;
        width: 124px;
        height: 40px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>
