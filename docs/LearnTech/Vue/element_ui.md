---
title: Element-UI 源码学习 
---
## 代码结构分析
如下，在element的第一层目录中。

```shell script
Element
├── build               // 存放打包配置工具的配置文件
├── .github             // 贡献指南
├── CHANGELOG.en-US.md  // 更新日志 (美英)
├── CHANGELOG.es.md     // 更新日志 (英英)
├── CHANGELOG.fr-FR.md  // 更新日志 (法语)
├── CHANGELOG.zh-CN.md  // 更新日志 (中文)
├── components.json     // 组件路径信息
├── element_logo.svg    // svg格式的Element logo
├── examples            // 在官网上看到的组件文档示例
├── FAQ.md              // frequently asked question, 常见问题解答
├── LICENSE             // 开源许可证
├── Makefile            // 
├── node_modules        // 项目中依赖包
├── package.json        // 工程的所有配置
├── packages            // 组件源码, 学习的核心
├── README.md           // 对于这个项目的详细介绍
├── src                 // 存放入口文件以及各种辅助文件
├── test                // 存放单元测试文件
├── types               // 类型声明文件
└── yarn.lock           // yarn版本锁定
```
待看的资源
- https://juejin.im/user/184373682909502/posts 超级索尼一系列
- https://juejin.im/post/6844903891981565959 单篇结构分析
- https://segmentfault.com/a/1190000022725899
- https://space.bilibili.com/390120104/favlist?fid=333106404&ftype=create 山地人视频
- https://www.jianshu.com/u/b56b02622381 liril

