import LocalTerminal from "@/components/LocalTerminal.vue";

export default {
    name: "TerminalPage",
    components: {LocalTerminal},
    data() {
        return {
            showEditor: false,
            terminals: {
                default: {
                    show: false,
                    name: 'swow-debugger-terminal [default]',
                    context: '/swow-debugger-terminal/default',
                    localInitCmd: null,
                    showHeader: true,
                    dragConf: null
                },
                bottom: {
                    show: false,
                    name: 'swow-debugger-terminal [bottom]',
                    context: '/swow-debugger-terminal/bottom',
                    localInitCmd: null,
                    showHeader: true,
                    dragConf: null
                },
                list: []
            },
            multiSeq: 1,
            releaseSeq: []
        }
    },
    props: {
        initCmd: String
    },
    mounted() {
        let defaultTerminal

        defaultTerminal = this.terminals.default
        defaultTerminal.name = 'swow-debugger-terminal'
        defaultTerminal.context = '/swow-debugger-terminal'
        defaultTerminal.style = "position:fixed;"

        this.showEditor = true
        defaultTerminal.localInitCmd = this.initCmd
        defaultTerminal.dragConf = this.initWindowSize()
        defaultTerminal.show = true
    },
    methods: {
        initWindowSize() {
            let dragConf = {
                pinned: false
            }
            let width = document.body.clientWidth
            if (width < 960) {
                dragConf = null
            } else if (width >= 960 && width < 1264) {
                dragConf.width = 800
                dragConf.height = 600
            } else if (width >= 1264) {
                dragConf.width = 900
                dragConf.height = 700
            }
            if (this.showEditor && dragConf) {
                let height = document.body.clientHeight
                dragConf.init = {
                    x: (width - 500 - dragConf.width) / 2,
                    y: (height - dragConf.height) / 2
                }
            }
            return dragConf
        },
        showDemo(type) {
            for (let t in this.terminals) {
                if (t !== 'list') {
                    this.terminals[t].show = t === type
                }
            }
            if (type === 'list') {
                this.createNew()
            } else {
                this.resetList()
            }
        },
        resetList() {
            this.terminals.list = []
            this.releaseSeq = []
            this.multiSeq = 1
        },
        createNew() {
            let seq
            if (this.releaseSeq.length === 0) {
                seq = parseInt(this.multiSeq.toString())
            } else {
                seq = this.releaseSeq[0]
            }
            this.terminals.list.push({
                show: true,
                name: `swow-debugger-terminal [multi-${this.multiSeq}]`,
                context: `/swow-debugger-terminal/multi-${this.multiSeq}`,
                localInitCmd: null,
                showHeader: true,
                dragConf: {
                    zIndex: 100,
                    width: 700,
                    height: 500,
                    init: {
                        x: 100 + seq * 50,
                        y: 70 + seq * 30
                    },
                    pinned: false
                }
            })
            if (this.releaseSeq.length !== 0) {
                this.releaseSeq.splice(0, 1)
            }
            this.multiSeq++
        },
        closeWindow(key, name) {
            if (key === 'list') {
                let idx = -1
                for (let i in this.terminals.list) {
                    if (this.terminals.list[i].name === name) {
                        idx = i;
                        break
                    }
                }
                if (idx >= 0) {
                    this.releaseSeq.push(idx)
                    this.terminals.list[idx].show = false
                }

                if (this.releaseSeq.length === this.terminals.list.length) {
                    this.resetList()
                }
            } else {
                this.terminals[key].show = false
            }
            if (!this.showEditor) {
                this.$emit("close")
            }
        },
        onActive(key, name) {
            if (key === 'list') {
                for (const item of this.terminals.list) {
                    if (item.dragConf) {
                        if (item.name === name) {
                            item.dragConf.zIndex = 101
                        } else {
                            item.dragConf.zIndex = 100
                        }
                    }
                }
            }
        }
    }
}
