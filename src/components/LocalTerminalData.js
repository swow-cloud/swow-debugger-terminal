
export const commands = [
    {
        "key": "ps",
        "group": "demo",
        "usage": 'ps',
        "description": "查看当前所有协程状态"
    },
    {
        "key": "attach",
        "group": "demo",
        "usage": 'attach',
        "description": "进入协程"
    },
    {
        "key": "exec",
        "group": "demo",
        "usage": 'exec',
        "description": "执行命令"
    },
    {
        "key": "vars",
        "group": "demo",
        "usage": 'vars',
        "description": "查看变量"
    },
    {
        "key": "bt",
        "group": "demo",
        "usage": 'bt',
        "description": "查看调用栈"
    },
    {
        "key": "f",
        "group": "demo",
        "usage": 'info',
        "description": "查栈帧"
    },
    {
        "key": "b",
        "group": "demo",
        "usage": 'info',
        "description": "打断点"
    },
    {
        "key": "n",
        "group": "demo",
        "usage": 'n',
        "description": "单步调试"
    },
    {
        "key": "l",
        "group": "demo",
        "usage": 'info',
        "description": "查看更多源码"
    },
    {
        "key": "kill",
        "group": "demo",
        "usage": 'kill',
        "description": "杀死协程"
    },
    {
        "key": "killall",
        "group": "demo",
        "usage": 'killall',
        "description": "杀死所有协程"
    },
    {
        "key": "pool",
        "group": "demo",
        "usage": 'pool',
        "description": "查看mysql,redis连接池"
    },
    {
        "key": "config",
        "group": "demo",
        "usage": 'config',
        "description": "查看线上配置信息"
    },
    {
        "key": "route",
        "group": "demo",
        "usage": 'route',
        "description": "查看路由"
    },
    {
        "key": "crontab",
        "group": "demo",
        "usage": 'crontab',
        "description": "查看定时任务"
    },
    {
        "key": "fail",
        "group": "demo",
        "usage": 'fail',
        "description": "模拟错误结果返回"
    },
    {
        "key": "json",
        "group": "demo",
        "usage": 'json',
        "description": "模拟json结果显示"
    },
    {
        "key": "code",
        "group": "demo",
        "usage": 'code',
        "description": "模拟code结果显示"
    },
    {
        "key": "table",
        "group": "demo",
        "usage": 'table',
        "description": "模拟表格结果显示"
    },
    {
        "key": "html",
        "group": "demo",
        "usage": 'html',
        "description": "模拟自定义html结果显示"
    },
    {
        "key": "loop",
        "group": "demo",
        "usage": 'loop',
        "description": "模拟批量结果显示"
    },
    {
        "key": "context",
        "group": "demo",
        "usage": 'context <ctx>',
        "description": "修改上下文",
        "example": [
            {
                "cmd": "context /vue/terminal/dev",
                "des": "修改上下文为'/vue/terminal/dev'"
            }
        ]
    },
    {
        "key": "fullscreen",
        "group": "demo",
        "usage": 'fullscreen',
        "description": "切换全屏模式"
    },
    {
        "key": "drag",
        "group": "demo",
        "usage": 'drag <x> <y>',
        "description": "模拟拖拽窗口，x为左边界，y为右边界，单位px",
        "example": [
            {
                "cmd": "drag 20 100",
                "des": "拖拽位置到（20,100）"
            }
        ]
    },
    {
        "key": "info",
        "group": "demo",
        "usage": 'info',
        "description": "获取当前窗口信息"
    },
    {
        "key": "list",
        "group": "demo",
        "usage": 'list',
        "description": "查看更多源码"
    },
    {
        "key": "flash",
        "group": "demo",
        "usage": 'flash',
        "description": "即时回显，模拟执行下载命令"
    },
    {
        "key": "ask",
        "group": "demo",
        "usage": 'ask',
        "description": "用户输入，模拟执行登录"
    },
    {
        "key": "edit",
        "group": "demo",
        "usage": 'edit',
        "description": "打开文本编辑器"
    }
]