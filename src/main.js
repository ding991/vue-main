import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import ProLayout, { PageHeaderWrapper } from './components/ProLayout'
import './core/lazy_use'
import router from './router'
import store from './store'
import { registerMicroApps, start } from 'qiankun'

Vue.config.productionTip = false
// 组件全局注册
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        // hash 路由下验证rule
        const getActiveRule = hash => location => location.hash.startsWith(hash)
        registerMicroApps([
            {
                name: 'vue-qiankun-sub', // 子应用package.json name
                entry: '//localhost:8081',
                container: '#sub-container',
                activeRule: getActiveRule('#/sub-vue'),
            },
        ])
        start()
    },
}).$mount('#app')
