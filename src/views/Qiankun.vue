<template lang="pug">
    page-header-wrapper
        #sub-container
</template>

<script>
export default {
    name: 'Qiankun',
    data() {
        return {}
    },
    beforeCreate() {
        this.$router.push({
            query: {
                ...this.$route.query,
                hideMenus: true,
            },
        })
    },
}
</script>

<style lang="less" scoped>
#sub-container {
    width: 100%;
    height: 100%;
}
</style>
