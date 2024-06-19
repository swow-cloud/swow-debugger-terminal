import TerminalPage from "@/components/TerminalPage.vue";
import LoginPage from "@/components/Login.vue";
import {getQuery} from "@/common/util";

import 'vue-web-terminal/lib/theme/dark.css'
import 'element-plus/dist/index.css';


export default {
    name: 'App',
    components: {TerminalPage,LoginPage},
    data() {
        return {
            editMode: true,
            toLogin: false,
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
        this.toLogin  = true
    },
    methods: {
        updateToLogin(val) {
            console.log(val)
            // 更新父组件的数据
            this.toLogin = val;
        }
    }
}
