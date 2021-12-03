<template lang="pug">
    div(:class="{'pure': pureModel}")
        pro-layout(
            :title="title"
            :menus="menus"
            :collapsed="collapsed"
            :mediaQuery="query"
            :isMobile="isMobile"
            :handleMediaQuery="handleMediaQuery"
            :handleCollapse="handleCollapse"
            :logo="logoRender"
            :siderWidth="216"
            v-bind="settings"
            :menuHeight="menuHeight"
            :defaultOpenKeys="['TenantManage']"
            :hideMenus="headerFlag"
        )
            template(v-slot:menuHeaderRender)
                .logo.flex
                    h1(v-show="!collapsed" style="color: #fff") 模版工程
            template(v-slot:rightContentRender)
                div(style="margin-right: 16px; color: #fff") 头部右侧栏
            template(v-slot:footerRender)
                div 底部内容
            router-view
</template>

<script>
import { mapState } from 'vuex'
import {
    CONTENT_WIDTH_TYPE,
    SIDEBAR_TYPE,
    TOGGLE_MOBILE_TYPE,
    TOGGLE_HEADER_FLAG,
} from '@/store/mutation-types'
import defaultSettings from '@/config/defaultSettings'
import { asyncRouterMap } from '@/config/router.config'
import LogoSvg from '@/assets/logo.png'

export default {
    name: 'BasicLayout',
    components: {},
    data() {
        return {
            // preview.pro.antdv.com only use.
            isProPreviewSite:
                process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development',
            // 侧栏收起状态
            collapsed: false,
            title: defaultSettings.title,
            settings: {
                // 布局类型
                layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
                // CONTENT_WIDTH_TYPE
                contentWidth:
                    defaultSettings.layout === 'sidemenu'
                        ? CONTENT_WIDTH_TYPE.Fluid
                        : defaultSettings.contentWidth,
                // 主题 'dark' | 'light'
                theme: defaultSettings.navTheme,
                // 主色调
                primaryColor: defaultSettings.primaryColor,
                fixedHeader: defaultSettings.fixedHeader,
                fixSiderbar: defaultSettings.fixSiderbar,
                colorWeak: defaultSettings.colorWeak,

                hideHintAlert: false,
                hideCopyButton: false,
            },
            // 媒体查询
            query: {},

            // 是否手机模式
            isMobile: false,
            product: {},
        }
    },
    computed: {
        ...mapState({
            // 动态主路由
            clientSize: state => state.app.clientSize,
            layout: state => state.app.layout,
            headerFlag: state => state.app.headerFlag,
        }),

        collapseIcon() {
            return this.collapsed ? 'menu-unfold' : 'menu-fold'
        },

        menuHeight() {
            return this.clientSize.height - 48 - 48
        },
        pureModel() {
            return !!this.$route.meta.pure
        },
        menus() {
            const menus = asyncRouterMap
            return menus.find(item => item.path === '/').children
        },
    },
    created() {
        // 处理侧栏收起状态
        this.$watch('collapsed', () => {
            this.$store.commit(SIDEBAR_TYPE, this.collapsed)
        })
        this.$watch('isMobile', () => {
            this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
        })
    },
    mounted() {
        const userAgent = navigator.userAgent
        if (userAgent.indexOf('Edge') > -1) {
            this.$nextTick(() => {
                this.collapsed = !this.collapsed
                setTimeout(() => {
                    this.collapsed = !this.collapsed
                }, 16)
            })
        }
    },
    methods: {
        handleMediaQuery(val) {
            this.query = val
        },
        handleCollapse(val) {
            this.collapsed = val
        },
        handleSettingChange({ type, value }) {
            type && (this.settings[type] = value)
            switch (type) {
                case 'contentWidth':
                    this.settings[type] = value
                    break
                case 'layout':
                    if (value === 'sidemenu') {
                        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
                    } else {
                        this.settings.fixSiderbar = false
                        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
                    }
                    break
            }
        },
        logoRender() {
            return <LogoSvg />
        },
    },
    watch: {
        layout(v) {
            this.settings.layout = v
        },

        $route: {
            handler() {
                const flag = this.$route.query.hideMenus === 'true'
                if (flag) {
                    this.$store.commit(TOGGLE_HEADER_FLAG, flag)
                }
            },
            immediate: true,
        },
    },
}
</script>

<style lang="less">
@import './BasicLayout.less';
</style>
