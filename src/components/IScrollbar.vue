<style lang="less" scoped>
.root-scrollbar {
    position: relative;
    height: 100%;
    min-width: 100%;
}
</style>
<template lang="pug" scoped>
.root-scrollbar(ref="scrollbar" id="root-scrollbar")
    slot
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'

export default {
    name: 'i-scrollbar',
    components: {},
    props: {
        suppressScrollX: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {}
    },
    created() {
        this.ps = undefined
    },
    mounted() {
        this.$nextTick(() => {
            this.ps = new PerfectScrollbar(this.$refs.scrollbar, {
                wheelSpeed: 2,
                minScrollbarLength: 20,
                suppressScrollX: this.suppressScrollX,
            })
        })
    },
    methods: {
        gotoTop() {
            this.$refs.scrollbar.scrollTop = 0
        },

        // 纵轴滚动
        scrollY(distance) {
            this.$refs.scrollbar.scrollTop = distance
        },

        // 平滑滚动到指定位置
        scrollTo(distance) {
            this.$nextTick(() => {
                this.$refs.scrollbar.scrollTo({
                    top: distance,
                    left: 0,
                    behavior: 'smooth',
                })
            })
        },
        // 更新
        update() {
            this.ps && this.ps.update()
        },
        smoothScroll(distance) {
            const scrollEle = this.$refs.scrollbar
            if (typeof distance !== 'number' || !scrollEle) return
            const isUp = distance > scrollEle.scrollTop
            let step = () => {
                const { scrollTop, clientHeight, scrollHeight } = scrollEle
                const stepDistance = Math.abs(distance - scrollTop) / 5
                if (stepDistance <= 1 || scrollTop + clientHeight == scrollHeight) {
                    return
                } else {
                    scrollEle.scrollTop = isUp ? scrollTop + stepDistance : scrollTop - stepDistance
                    requestAnimationFrame(step)
                }
            }
            requestAnimationFrame(step)
        },
    },
}
</script>
