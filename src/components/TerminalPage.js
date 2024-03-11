import LocalTerminal from "@/components/LocalTerminal.vue";
import MarkdownIt from 'markdown-it';

export default {
    name: "TerminalPage",
    components: {LocalTerminal},
    data() {
        return {
            showEditor: true,
            rawMarkdown: '', // The raw Markdown content that you want to display
            renderedMarkdownContent: '', // The rendered HTML from Markdown,
            terminals: {
                default: {
                    show: false,
                    name: 'SDB [default]',
                    context: '/SDB/default',
                    localInitCmd: null,
                    showHeader: true,
                    dragConf: null
                },
                bottom: {
                    show: false,
                    name: 'SDB [bottom]',
                    context: '/SDB/bottom',
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
    computed: {
    },
    mounted() {
        let defaultTerminal

        defaultTerminal = this.terminals.default
        defaultTerminal.name = 'SDB'
        defaultTerminal.context = 'SDB'
        defaultTerminal.style = "position:fixed;"

        this.showEditor = true
        defaultTerminal.localInitCmd = this.initCmd
        defaultTerminal.dragConf = this.initWindowSize()
        defaultTerminal.show = true
        this.rawMarkdown = "支持命令: \n" +
            "1. 查看当前所有协程状态(`ps`)\n" +
            "2. 窥视协程(`co id`)\n" +
            "3. 进入协程(`attach id`)\n" +
            "4. 查看调用栈(`bt`)\n" +
            "5. 查栈帧(`f index`)\n" +
            "6. 打断点(`b`)\n" +
            "7. 单步调试(`n`)\n" +
            "8. 恢复运行(`c`)\n" +
            "9. 查看更多源码(`l`)\n" +
            "10. 打印变量(`p $var`)\n" +
            "11. 修改变量(`p $var =x`)\n" +
            "12. 执行命令(`p command0`)\n" +
            "13. 查看变量(`vars`)\n" +
            "14. 扫描僵尸协程(`z 时间`)\n" +
            "15. 杀死协程(`kill id`)\n" +
            "16. 杀死所有协程(`killall`)  \n" +
            "17. 查看配置(`config`)          \n" +
            "18. 查看路由(`route`)\n" +
            "19. 查看定时任务(`crontab`)\n" +
            "20. 查看代理类(`cacheable`)";
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
        // 使用 markdown-it 来解析 Markdown 内容
        renderedMarkdown() {
            const md = new MarkdownIt();
            this.renderedMarkdownContent =  md.render(this.rawMarkdown);
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
                name: `SDB [multi-${this.multiSeq}]`,
                context: `/SDB/multi-${this.multiSeq}`,
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
