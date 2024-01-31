let isProduction = process.env.NODE_ENV === 'production'
module.exports = {
    productionSourceMap: !isProduction,
    chainWebpack: config =>{
        config.plugin('html')
            .tap(args => {
                args[0].title = 'SDB-WEB🚀 一款在线调试SWOW｜PHP的调试神器!'
                return args
            })
    },
    devServer: {
        port: 8888
    },
    publicPath: './',
    configureWebpack: config => {
        if (isProduction) {
            config["performance"] = {
                "maxEntrypointSize" : 10_000_000,
                "maxAssetSize": 30_000_000
            }
        }
    }
}
