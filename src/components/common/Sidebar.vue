<template>
    <div class="sidebar" :key="sidebarKey">
        <el-menu
            class="sidebar-el-menu"
            :default-active="sideIndexPath"
            :collapse="collapse"
            background-color="#212A3D"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
            @select="selectMenu"
        >
            <template v-for="item in items">
                <template v-if="item && item.children">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu v-if="subItem.children" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import service from '@/api/home/index';
import sideBarMenusMap from '@/utils/common';
import children from '@/api/commission/children';
import { del } from '@/utils/service';
import consultLogVue from '@/views/audit/children/consultLog.vue';
export default {
    data() {
        return {
            sidebarKey: 0,
            sideIndexPath: '/commission',
            collapse: false,
            items: [

            ]
        };
    },
    computed: {
        menuCacheVersion() {
            return this.$store.getters.menuCacheVersion
        }
    },
    //监听执行
    watch: {
        '$store.state.menuCacheVersion':function(newValue, oldValue) {
            this.getmenuList();
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        this.checkChoosen();
    },
    mounted() {
        this.getmenuList();
    },
    methods: {
        //获取当前路由
        setSideIndexPath(path) {
            this.sideIndexPath = path;
            ++this.sidebarKey;
        },
        //存储当前路由
        async selectMenu(index) {
            this.cacheStorage.set('sideIndexPath', index);
        },
        //第一次进入页面定义首页
        async checkChoosen() {
            const sideIndexPath = await this.cacheStorage.get('sideIndexPath');
            if (sideIndexPath) {
                this.sideIndexPath = sideIndexPath;
            }
        },
        //根据权限列表展示侧边栏
        async getmenuList() {
            const _this = this;
            const menuList = await this.cacheStorage.get('menuList');
            if (menuList) {
                await _this.checkHasMenu(menuList);
            } else {
                this.getmenuList()
            }
        },
        async checkHasMenu(menuList) {
            const _this = this;
            _this.items = []
            function deal(list) {
                list.map((remote) => {
                    const originLevel1 = sideBarMenusMap.find((origin) => origin.code === remote.code);
                    if (originLevel1) {
                        const item = JSON.parse(JSON.stringify(originLevel1));
                        const children = [];
                        if(originLevel1.children) {
                            if (remote.children && remote.children.length > 0) {
                                remote.children.map((sub) => {
                                    if(item.children){
                                        const subItem = item.children.find((subOrigin) => subOrigin.code === sub.code);
                                        if (subItem) {
                                            children.push(subItem);
                                        }
                                    }
                                });
                                item.children = children;
                            }
                        }
                        _this.items.push(item);
                    }
                });
            }
            deal(menuList);
            const tagsList = await this.cacheStorage.get('tagsList');
            const newtagsList = []
            tagsList.map((tags) => {
                const include = _this.items.find((val) => tags.path.indexOf(val.index) > -1)
                if(include && tags.path == include.index) {
                    newtagsList.push(tags)
                }
                if(include && include.children && include.children.findIndex(el => tags.path.indexOf(el.index) > -1) > -1) {
                    newtagsList.push(tags)
                }
                // if(include.children && include.children.findIndex(el => tags.path == el.index) > -1) {
                //     newtagsList.push(tags)
                // }
            })
            await this.cacheStorage.set('tagsList',newtagsList,10)
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 56px;
    bottom: 0;
    overflow-y: scroll;
    opacity: 0.8;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 240px;
}
.sidebar > ul {
    height: 100%;
}
</style>
