---
title: vue cli的使用
---
1. 查看当前vue项目配置
   1. 使用vue-cli-service inspect 来查看一个vue-cli3项目的webpack配置信息（包括development production）
   2. --mode 指定环境模式，默认development
   3. 运行命令
      1. 开发环境`npx vue-cli-service inspect --mode development`
      2. 生产环境`npx vue-cli-service inspect --mode producttion`
      3. 将输出导出到js文件
         1. 开发环境：`npx vue-cli-service inspect --mode development > webpack.config.development.js`
         1. 生产环境：`npx vue-cli-service inspect --mode production > webpack.config.development.js`
   4. 实际上只要在项目目录执行 vue inspect --mode production > 1.js
   5. 打印当前项目的打包报告
      1. vue-cli-service build "--report"
