安装好后  包放在工程目录下的node_modules目录中，因此在代码中只需要通过require('…')方式来引入

包的安装分为本地安装local  全局安装 global 
命令上的区别体现在有没有 -g

npm list -g 查看所有全局安转的模块

npm install packagename --force 强制重新安装


yarn global list --depth=0
Npm list --depth 1 查看顶层级列表

强制删除非空目录
Rm -rf sams[目录名]


***
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
