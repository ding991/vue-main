import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import ProLayout, { PageHeaderWrapper } from './components/ProLayout'
import './core/lazy_use'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 组件全局注册
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
