---
title: 玩转Webpack
---

## 3. 为什么需要构建工具
1. 转换ES6语法
2. 转换JSX 
3. CSS前缀补全/预处理器
4. 压缩混淆
5. 图片压缩

## 4. 前端构建演变之路
ant + YUI tool => grunt => fis3 gulp => rollup webpack parcel

## 5. 为什么选择webpack
1. 社区生态丰富
2. 配置灵活和插件化开发
3. 官方更新迭代速度快

## 6. 初始webpack
webpack 默认配置文件：webpack.config.js

可以通过webpack --config 指定配置文件

## 10. 通过npm script 运行webpack
原理：模板局部安装会在 node_modules/.bin 目录创建软链接

## 12. 核心概念之loader
webpack 开箱即用只支持js 和 json 两种文件类型，通过loaders 去支持其他文件类型并且把他们转换成有效的模块，
并且可以添加到依赖图中。

本身是一个函数，接收源文件作为参数，返回转换的结果。
babel-loader  css-loader  less-loader ts-loader

## 13. 核心概念之Plugins
插件用于bundle文件的优化，资源管理和环境变量的注入。
作用于整个构建过程。
CommonChunkPlugin 将chunks相同的模板代码提取成公共JS
CleanWebpackPlugin 清理构建目录
ExtractTextWebpackPlugin 将CSS从bundle文件里提取成一个独立的CSS文件。
UglifyjsWebpackPlugin 压缩JS
ZipWebpackPlugin 将打包出的资源生成一个zip包

## 14. 核心概念之Mode
Mode用来指定当前的构建环境是：production development 还是none。
设置mode可以使用webpack内置的函数，默认值为production。
`development` 设置process.env.NODE_ENV 的值为development. 开启NamedChunkPlugin 和 NamedModulesPlugin
`production` 设置process.env.NODE_ENV 的值为production. 开启 FlagDependencyUsagePlugin等
`none` 不开启任何优化项
webpack 4才有的。

## 15. 解析ECMAScript 6 和 React JSX

## 16. 解析CSS、Less和Sass
css-loader 用于加载.css文件，并且转换CommonJs对象
style-loader 将样式通过<style>标签插入到head中

## 17. 解析图片和字体
file-loader 用于处理文件

## 18. webpack中的文件监听
文件监听是在发现源码发生变化时，自动重新构建出新的输出文件。

webpack 开启监听模式，有两种方式。
- 在启动webpack命令时，带上--watch参数
- 在配置webpack.config.js中设置watch: true

文件监听的原理
轮询判断文件的最后编辑时间是否发生变化。
某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等aggregateTimeout。
aggregate(总数的，总计的，聚合的)

配置：
```javascript
module.export  = {
  // 默认false, 即不开启
  watch: true,
  // 只有开启监听模式，watchOptions才有意义
  watchOptions: {
    // 默认为空，不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

## 19. webpack中的热更新及原理分析
热更新 webpack-dev-server
wds 不刷新浏览器
wds 不输出文件，而是放在内存中
使用hotModuleReplacementPlugin插件
// 构建完自动打开浏览器
`"dev": "webpack-dev-server --open"`

另一个选择，使用webpack-dev-middleware
WDM将webpack输出的文件传输给服务器
适用于灵活的定制场景
**原理分析**
webpack Compile将JS编译成bundle
HMR Server将热更新的文件输出给HMR runtime
Bundle Server提供文件在浏览器的访问
HMR Runtime 会被注入到浏览器、更新文件的变化
bundle.js 构建输出的文件

## 20. 文件指纹策略 chunkhash、contenthash和hash
1. 什么是文件指纹
打包后输出的文件名的后缀
2. 文件指纹如何生成
Hash: 和整个项目的构建有关，只要项目文件有修改，整个项目构建的hash值就会更改
Chunkhash：和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值
Contenthash: 根据文件内容来定义hash，文件内容不变，则content不变

1. js的文件指纹设置
设置output的filename，使用[chunkhash]
`filename: '[name][chunkHash:8].js'`

2. css的文件指纹设置
设置miniCssExtractPlugin的fileName, 使用[contenthash]
```json
plugins: [
  new MiniCssExtractPlugin({
  fileName: [name][contenthash:8].css
})
]
```
3. 设置fileLoader的name, 使用[hash]
占位符名称  含义
[ext]   资源后缀名
[name]  文件名称
[path]  文件的相对路径
[folder]    文件所在的文件夹
[contenthash]   文件的内容hash, 默认是md5生成
[hash]  文件的内容hash, 默认是md5生成
[emoji] 一个随机的自带文件内容的emoji