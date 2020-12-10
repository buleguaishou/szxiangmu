import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'
//挂载Vuex
Vue.use(Vuex)

// const vuexLocal = new VuexPersistence({
//     storage: window.localStorage
//     })
//创建VueX对象
const store = new Vuex.Store({
    state: {
        //存放的键值对就是所要管理的状态
        menuCacheVersion: 0,
        autograph: {}
    },
    getters: {
        menuCacheVersion: state => {
            return state.menuCacheVersion
        },
        autograph: state => {
            return state.autograph
        }
    },
    mutations: {
        increment(state) {
            // 变更缓存状态
            state.menuCacheVersion++
        },
        changAutograph(state, autograph) {
            state.autograph = autograph
        }
    },
    // plugins: [vuexLocal.plugin]
})

export default store