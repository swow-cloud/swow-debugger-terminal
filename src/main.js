import Vue from 'vue'
import App from './App.vue'
import Terminal from 'vue-web-terminal'

import VueCodemirror from 'vue-codemirror'
import {Notification} from "element-ui";

Vue.use(VueCodemirror)
Vue.use(Terminal, {
    codemirror: {
        tabSize: 4,
        mode: 'javascript',
        theme: "darcula",
        lineNumbers: true,
        line: true,
        smartIndent: true
    }
})
Vue.config.productionTip = false
Vue.prototype.$notify = Notification;
new Vue({
    render: h => h(App),
}).$mount('#app')
