---
title: HTTP URL模块
---
// http
res.writeHead()
res.write()
res.end()

// url
url.parse() // 第二个参数为 true, 表示把 query 转换为对象
url.format()// 上述的反向操作
url.resolve()

commonjs 模块化的规范

在 node 中，node 提供的模块称为核心模块，另一类是用户提供的模块，称为文件模块。

核心模块可以直接引入使用，文件模块需要在运行时动态加载，需要完整的路径分析文件定位和编译执行过程。

// 一个问题，在之前没有模块化概念的时候是如何引用别个文件的方法的。

// 现在又为什么可以通过 module.export 和 import 来导出和引用。

node.js 是 require, vue 是 import

// exports.tools = tools
module.exports = tools

当 require 时，在当前目录找不到的话，会在 node_modules 里面找这个模块。

package.json

完全符合 CommonJs 规范的包目录一般包含如下这些文件
package.json
bin 存放可执行二进制文件的目录
lib 用于存放 JavaScript 代码的目录
doc 用于存放文件的目录

npm info jquery 查看包信息

cls 清屏

npm install jquery@版本号

devDependencies 配置当前程序所依赖的其他包，只会下载模块，而不会下载这些模块的测试和文档
