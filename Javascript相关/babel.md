babel是一个广泛使用的es6转码器，可以将es6代码转换为es5代码。
Babel的配置文件是.babelrc，存放在项目的根目录下，该文件用来设置转码规则和插件。
Babel提供命令行转码工具，babel-cli。
Babel-cli 工具自带一个babel-node命令，提供一个支持es6的REPL环境，它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码
Babel-register模块改写require命令，为它加上一个钩子
Babel-core，如果某些代码需要调用Babel的API进行转码，就要使用Babel-core模块。
Babel-polyfill，Babel默认只转换新的JavaScript句法（syntax），而不转换新的API以及一些定义在全局对象上的方法。
浏览器环境，Babel也可以用于浏览器环境，但是从Babel6.0 开始，不再提供浏览器版本，而是要用构建工具构建出来
Traceur转码器，也可以将ES6代码转换为ES5代码

babel browser.js

在线编译->引入browser.js type text/babel

