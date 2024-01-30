import TerminalPage from "@/components/TerminalPage.vue";
import LoginPage from "@/components/Login.vue";
import {getQuery} from "@/common/util";

import 'vue-web-terminal/lib/theme/dark.css'
import 'element-ui/lib/theme-chalk/index.css';
// import '@/asset/style.css'
// import '@/asset/style.scss'

export default {
    name: 'App',
    components: {TerminalPage,Notification,LoginPage},
    data() {
        return {
            editMode: false,
            localInitCmd:null
        }
    },
    created() {
        let query = getQuery()
        if (query.cmd && query.cmd.trim().length > 0) {
            this.localInitCmd = query.cmd
            this.editMode = true
        }
    },
    mounted() {
    },
    methods: {

    }
}
