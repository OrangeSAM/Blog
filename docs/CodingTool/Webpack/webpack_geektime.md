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

## 解析ECMAScript 6 和 React JSX

## 解析CSS、Less和Sass
css-loader 用于加载.css文件，并且转换CommonJs对象
style-loader 将样式通过<style>标签插入到head中