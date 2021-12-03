import { mapState } from 'vuex'
import elementResizeDetectorMaker from 'element-resize-detector'

const tableMixin = {
    data() {
        return {
            scrollAreaHeight: 0,
            loading: false,
            pagination: {
                current: 1,
                pageSize: 10,
                pageSizeOptions: ['10', '20', '50', '100', '200'],
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal: total => `共${total}条`,
                total: 0,
            },
        }
    },

    mounted() {
        const erd = elementResizeDetectorMaker()
        const tableElement = document.querySelector('.ant-table')

        erd.listenTo(tableElement, () => {
            this.calcScrollAreaHeight()
        })

        this.$once('hook:beforeDestroy', () => {
            erd.uninstall(tableElement)
        })
    },

    computed: {
        ...mapState({
            clientSize: state => state.app.clientSize,
        }),
    },

    methods: {
        calcScrollAreaHeight() {
            this.$nextTick(() => {
                const tableElement = document.querySelector('.ant-table')
                if (!tableElement) return
                const PADDING_BASE_HEIGHT = 16
                const MARGIN_BASE_HEIGHT = 16
                const tableHeaderElement = document.querySelector('.ant-table-thead')
                const paginationElement = document.querySelector('.ant-pagination')
                const tableRect = tableElement.getBoundingClientRect()
                const tableRelativeTop = tableRect.top
                const tableHeaderHeight = tableHeaderElement.clientHeight
                const paginationHeight = (paginationElement && paginationElement.clientHeight) || 0
                const tableBodyHeight = document.querySelector('.ant-table-tbody').scrollHeight

                const scrollHeight =
                    this.clientSize.height -
                    tableRelativeTop -
                    tableHeaderHeight -
                    paginationHeight -
                    PADDING_BASE_HEIGHT * (paginationHeight ? 2 : 1) -
                    MARGIN_BASE_HEIGHT

                this.scrollAreaHeight = tableBodyHeight <= scrollHeight ? null : scrollHeight
            })
        },
    },

    watch: {
        clientSize: {
            handler() {
                this.$nextTick(() => {
                    this.calcScrollAreaHeight()
                })
            },
            immediate: true,
        },
    },
}

export default tableMixin
