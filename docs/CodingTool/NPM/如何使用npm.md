---
title: NPM的使用
---
安装好后  包放在工程目录下的node_modules目录中，因此在代码中只需要通过require('…')方式来引入

包的安装分为本地安装local  全局安装 global 
命令上的区别体现在有没有 -g

npm list -g 查看所有全局安转的模块

npm install packagename --force 强制重新安装


yarn global list --depth=0
Npm list --depth 1 查看顶层级列表

强制删除非空目录
Rm -rf sams[目录名]

本地npm I 的时候，dependcy 和devdependcy里的依赖都会安装。



查看某个包的信息
`npm view vue`
查看某个包当前版本
`npm view vue version`
查看某个包的所有版本
`npm view vue versions`

npm run xxx是执行配置在package.js中的脚本
dev就是你开发环境，配置了hot-loader之类方便调试的工具。
build就是发布也就是生产环境，没有其他多余的东西。

配置了才能run 使用 npm run 查看所有可执行命令

build-doc  js?

Vue 爬坑之路（一）—— 使用 vue-cli 搭建项目 - WiseWrong的博客 - CSDN博客
https://blog.csdn.net/wisewrong/article/details/55212684

vue2.0版cnode社区项目搭建及实战开发 - 简书
https://www.jianshu.com/p/efb08259ee74



https://segmentfault.com/a/1190000004881684
npm hooks

npm scripts 使用指南 - 阮一峰的网络日志
http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html


Cnpm 为了解决的问题是在国内下载国外服务器上的npm包慢的问题

如果仅仅是为了下载的包的速度有提升，直接使用cnpm 和 把npm的registry设置为"https://registry.npm.taobao.org/ 是一样的

---

如何获取命令行的输入
cross-env是为了设置跨平台变量而存在的。
process变量携带了命令执行的信息。
process.argv，属性返回数组，
- 第一个元素是process.execPath，命令的发起方（node
- 第二个参数是正在执行的JavaScript文件的路径，命令的执行方（vue-cli-service
- 后面的都是命令行参数
  -（serve
  -（--open open跟openpage有关系吗


process.env
- BUILD_ARGVS
- Node_ENV


