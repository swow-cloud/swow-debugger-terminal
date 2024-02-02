import {api as TerminalApi} from "vue-web-terminal";
import {Notification} from 'element-ui';

let socket = "";
let lockReconnect = false; //是否真正建立连接
let timeout = 20 * 1000; //20秒一次心跳
let timeoutObj = null; //心跳心跳倒计时
let serverTimeoutObj = null; //心跳倒计时
let timeoutnum = null;
let weburl = "";
let global_callback = function (data) {
    if (data === 'pong') {
        Notification.success(
            {
                title: 'SDB🚀',
                message: `${data}`
            }
        )
    } else {
        TerminalApi.pushMessage('SDB', {
            type: 'ansi',
            content: `${data}`
        })
    }

};

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
        Notification.success(
            {
                title: 'SDB🚀',
                message: "服务端连接成功..."
            }
        )
        start();
    };
}

function socketOnClose() {
    socket.onclose = () => {
        console.log("socket已经关闭");
        Notification.error(
            {
                title: 'SDB🚀',
                message: "服务端已断开..."
            }
        )
    };
}

function socketOnSend(data) {
    //数据发送
    socket.send(data);
}

function socketOnError() {
    socket.onerror = () => {
        reconnect();
        Notification.error(
            {
                title: 'SDB🚀',
                message: "服务端连接失败..."
            }
        )
        console.log("socket 链接失败");
    };
}

function socketOnMessage() {
    socket.onmessage = (e) => {
        global_callback(e.data);
        reset();
    };
}

export function socketState() {
    if (socket.readyState === 3 || socket.readyState === 2) {
        Notification.error(
            {
                title: 'SDB🚀',
                message: "服务端连接已断开..."
            }
        )
    }
}