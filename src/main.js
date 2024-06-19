import Vue from 'vue'
import App from './App.vue'
import Terminal from 'vue-web-terminal'
import NotificationComponent from '@/components/NotificationComponent.vue';

Vue.prototype.$notify = function(options) {
    const NotificationConstructor = Vue.extend(NotificationComponent);
    const instance = new NotificationConstructor({
        propsData: options,
    }).$mount();

    document.body.appendChild(instance.$el);
};

import VueCodemirror from 'vue-codemirror'
import {Col, Container, Footer, Header, Main, Row} from "element-plus";
// 全局注册通知组件
Vue.use(VueCodemirror)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
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
const app = new Vue({
    render: h => h(App),
}).$mount('#app')
window.app = app;
