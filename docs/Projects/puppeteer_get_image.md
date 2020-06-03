---
title: 使用Puppeteer获取网页上的图片
---
## 业务上的需求

在网页中配置完 word 报告的指标后，点击生成报告。后端响应生成报告请求，开始异步执行报告导出程序。报告内容中有部分是图表，需要借助前端渲染完后返回下载链接。

## 实现逻辑

基于 egg.js 框架编写 node 服务，以供报告导出程序请求。请求为 post 请求，请求时在消息体中携带图片渲染所需数据。最终数据经由 puppeteer page 实例中的 evaluate 方法传递到 Echart 图片渲染页。

## 代码实现

代码主要分为两部分：Node 接口部分，Echarts 图片渲染部分。

## Node 接口

先说 Node 接口，一直都说 Node 的掌握是一个前端进阶的槛，现在看确实如此。自己调用自己接口的感觉很奇妙，和早之前写.Net 的感觉完全不一样。

由于在实现这部分功能之前对 Egg.js 没有更多的了解(~~一无所知~~)，所以这里会着重分享代码层面如何实现，而如何作为整个项目结构中的一部分出现此处不讨论。

## Router

首先需要在 router.js 文件中添加接口地址，`router.post('/example/my/demo', controller.todo.addTodoItem)`。前一个参数是接口地址，后一个参数是访问该接口时调用的方法(Controller)。而一个 Controller 一般包含多个方法，即 todo 是一个 Controller 文件，addTodoItem 是如下文所说的承担执行动作的方法。

> Router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系。

## Controller

编写 Controller 类时，首先需要将其继承于 egg.controller 。

```
const Controller =  require('egg').Controller
class todoController extends Controller {
    // code
}
```

> 定义的 Controller 类，会在每一个请求访问到 server 时实例化一个全新的对象，而在继承的 todoController 中会有一些需要用到的属性挂载到 this 上。诸如`this.ctx this.service this.logger`。在上下文就可以拿到 post 请求中携带的参数。

在 todoController 中可以对参数进行校验，校验通过后调用 service 进行业务处理。

在 addTodoItem 中的一般性代码如下：

```
try {
    if (paramsCheck) {
        // call service
        ctx.body = {
            status: 0,
            message: '获取成功',
            data:
        }
    } else {
        // 参数并不完整
    }
} catch (e) {
    // service 部分出现问题
}
```
