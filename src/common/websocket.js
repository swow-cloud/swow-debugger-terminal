import {api as TerminalApi} from "vue-web-terminal" ;

let socket = "";
let lockReconnect = false; //是否真正建立连接
let timeout = 20 * 1000; //20秒一次心跳
let timeoutObj = null; //心跳心跳倒计时
let serverTimeoutObj = null; //心跳倒计时
let timeoutnum = null;
let global_callback = null;
let weburl = "";

export const sendWebsocket = function (agentData, callback) {
    global_callback = callback;
    socketOnSend(agentData);
}

/**
 * 关闭websocket函数
 */
export const closeWebsocket = function () {
    if (socket) {
        socket.close();
    }
    clearTimeout(timeoutObj);
    clearTimeout(serverTimeoutObj);
}

export const initWebSocket = function (url) {
    weburl = url;
    if (!window.WebSocket) {
        console.error({
            message: "您的浏览器不支持websocket,请升级或更换浏览器！",
            type: "error",
            center: true,
        });
        return;
    }
    if (!socket) {
        socket = new WebSocket(weburl);
        socketOnOpen();
        socketOnClose();
        socketOnError();
        socketOnMessage();
    }
}

function reconnect() {
    if (lockReconnect) {
        return;
    }
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    timeoutnum && clearTimeout(timeoutnum);
    timeoutnum = setTimeout(function () {
        //新连接
        initWebSocket();
        lockReconnect = false;
    }, 5000);
}

//重置心跳
function reset() {
    //清除时间
    clearTimeout(timeoutObj);
    clearTimeout(serverTimeoutObj);
    //重启心跳
    start();
}

//开启心跳
function start() {
    timeoutObj && clearTimeout(timeoutObj);
    serverTimeoutObj && clearTimeout(serverTimeoutObj);
    timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (socket.readyState === 1) {
            //如果连接正常
            socket.send('ping');
            // console.log("发送消息");
        } else {
            //否则重连
            reconnect();
        }
        serverTimeoutObj = setTimeout(function () {
            //超时关闭
            socket.close();
        }, timeout);
    }, timeout);
}

function socketOnOpen() {
    socket.onopen = () => {
        console.log("socket连接成功");
        TerminalApi.pushMessage('swow-debugger-terminal', {
            type: 'normal',
            class: 'success',
            tag: 'success',
            content: '服务端已连接'
        })
        start();
    };
}

function socketOnClose() {
    socket.onclose = () => {
        console.log("socket已经关闭");
        TerminalApi.pushMessage('swow-debugger-terminal', {
            type: 'normal',
            class: 'error',
            tag: 'error',
            content: '服务端已断开'
        })
    };
}

function socketOnSend(data) {
    //数据发送
    socket.send(data);
}

function socketOnError() {
    socket.onerror = () => {
        reconnect();
        console.log("socket 链接失败");
    };
}

function socketOnMessage() {
    socket.onmessage = (e) => {
        global_callback(e.data);
        reset();
        global_callback = function (data){
            TerminalApi.pushMessage('swow-debugger-terminal', {
                type: 'ansi',
                content: `${data}`
            })
        }
    };
}