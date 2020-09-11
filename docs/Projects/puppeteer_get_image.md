---
title: Puppeteer 获取前端页面数据
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

在 todoController 中的一般性代码如下：

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

## Service

以下为service中的主要代码，注释都在里头了。

```javascript

url = targetUrl(
  `${config.webUrl}/exam/report/chart`,
  {
    userId: data.userId,
    userName: data.userName,
    userType: data.userType
  }
)
// target为截图页面URL，自行配置。
page.goto(url)

// 进入页面后通过evaluate方法向页面注入请求传来的数据
// 通过window这个公共桥梁，可以使得两端能够通信
page.evaluate(score => {
  // eslint-disable-next-line no-undef
  window.chartData = score
  // if (data.token) {
  //   // eslint-disable-next-line no-undef
  //   window.token = data.token
  // }
  setTimeout(() => {
    // eslint-disable-next-line no-undef
    window.startRender()
  }, 1000) 
  // 为了解决一个怪异的问题，延迟执行页面端的渲染
  // startRender 是页面端提供的渲染方法，等待注入数据后，开始渲染页面
}, data)

// 等待页面渲染完成 #render-finish
// 持续监听目标页面的相关DOM元素的display情况，如果未true，则可以认定渲染完成
page.waitForSelector('#renderFinish', {visible: true, timeout: 1000 * 60})

// 获取渲染完之后，上传至OSS的URL
const ossUrl = page.evaluate(() => {
  // eslint-disable-next-line no-undef
  return window.ossUrl
})

page.close()
browser.disconnect()

logger.info('word报告图片渲染完成')
return ossUrl
```

前端页面就相对简单了，就只是个工具人，一切都被Node端安排的明明白白。