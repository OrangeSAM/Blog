#### 08 第一个 Node.js 小程序, 石头剪刀布

和 JS 一样, Node.js 也有 Date Math 对象, settimeout, setInterval.
requestAnimationFrame, 这个对象由于不是在浏览器环境中, 所以没有.
Node.js 以 setImmediate 作为补偿.

Node.js 特有的. \_fileName 文件所在位置 \_dirName 文件所在目录
process 对象, 很重要.

process.argv 能够获取到从命令行输入的参数

#### 09 CommonJS 规范

**script 标签**

1. 脚本变多时, 需要手动管理加载顺序.
2. 不同脚本之间逻辑调用, 需要通过全局变量的方式.
3. 没有 html 怎么办(Node.js)

**CommonJs**

1. Javascript 社区发起, 在 Node.js 上应用并推广.
2. 后续影响到浏览器端 Javascript.

导出的变量和内部的变量是同一个引用, 即可以通过承接 require 的变量来改变 exports 中的值.

#### 10 使用模块化规范改造石头剪刀布游戏

#### 11 NPM

#### 12 Node.js 内置模块

EventEmitter

1. 观察者模式
2. 调用 VS 事件
   1. 关键在于"不知道被通知者是否存在"
   2. 以及"没有人听还能继续下去"
