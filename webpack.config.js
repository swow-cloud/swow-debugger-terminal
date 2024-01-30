module.exports = {
    module: {
      rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
              // 将JS字符串中的“style”节点创建为“style”标签
              'style-loader', 
              // 把CSS转换成CommonJS模块
              'css-loader'
            ],
          },
      ],
    },
  };