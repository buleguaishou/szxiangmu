<template>
    <div class="wrapper">
        <v-head v-if="show"></v-head>
        <v-sidebar ref="sidebar" v-if="show"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags @SidebarPath='upSidebar' v-if="show"></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <el-scrollbar class="content-scrollbar">
                            <router-view></router-view>
                        </el-scrollbar>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
import service from '@/api/home/index';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            show:1
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
        this.getmenuList()
    },
    methods: {
        //存储权限信息
        async getmenuList() {
            const _this = this
            const res = await service.menuList()
            await this.cacheStorage.set("menuList", res.itemVOList, 10)
            await this.cacheStorage.set("code", res.code, 10)
        },
        //侧边栏导航特殊处理
        upSidebar(path) {
            if(path === '/deploy/metadata/apply'){
                this.$refs.sidebar.setSideIndexPath('/deploy/metadata')
                return
            }
            if(path === '/system/dictionaries/department'){
                this.$refs.sidebar.setSideIndexPath('/system/dictionaries')
                return
            }
            if(path.indexOf('commission') > -1) {
                this.$refs.sidebar.setSideIndexPath('/commission')
                return
            }
            this.$refs.sidebar.setSideIndexPath(path)
            this.$router.push({path})
        }
    }
};
</script>
