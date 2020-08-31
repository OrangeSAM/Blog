---
title: 网页截图的实现
---
## 需求

上礼拜做了一个需求：将网页上的内容按顺序保存为图片，并上传至OSS返回URL给后端生成PPT。这里主要分享如何将网页的上的内容保存为图片。至于保存为图片之后的事，比如直接保存为本地，或者上传至服务器等，这里就不探索了。

## 实现

### html2canvas
html2canvas是一个实现网页截图的库，允许你直接在用户浏览器上获取网页的截图或部分内容。屏幕截图是基于DOM的，因为它不做实际的屏幕截图，而是基于页面上可用的信息构建屏幕截图，因此它可能不是100%准确的。即，它只能正确地描述它所理解的属性，这意味着有许多CSS属性不起作用，比如动画。

如官网所说的，它的使用非常之简单。

```bash
	npm install html2canvas
	import html2canvas from 'html2canvas'
    
    html2canvas(document.body).then(function(canvas) {
    	document.body.appendChild(canvas);
	});
```
实际上只要一行代码就能拿到转换好的canvas数据，`await html2canvas(the element you want to convert)`。

> 我的示例代码
```HTML
    <button @click="shot">click me to convert</button>
    <div>below here are something that i want to take them to screenshot</div>
    <div class="wrap" ref="wrap">
      <div>尤雨溪说，看不懂文档你就回家去喂猪吧。IE说，你们都看我干嘛。</div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
```
```javascript
    async shot() {
      let ele = this.$refs["wrap"];
      let canvas = await html2canvas(ele);
      var img = canvas.toDataURL("image/png");
      this.debugBase64(img);
    },
    // 这个方法会将渲染好的图片在新页面打开。
    debugBase64(base64URL) {
      var win = window.open();
      win.document.write(
        '<iframe src="' +
          base64URL +
          '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
      );
    },
```
效果如下图所示：
![](https://i.loli.net/2020/05/17/8GWBVvXzb4OfLk5.png)

但实际上我在这里踩了大坑，我需要渲染的东西和公式有关，使用了`mathjax`渲染公式，其底层实现是svg，这导致我的公式无法被转换成canvas。（当然也有可能是其他原因导致的，欢迎指点）对此，就只好上绝招了，使用puppeteer。

### puppeteer
之前有篇文章就写过使用这个node库将网页渲染成PDF并保存到本地，详见[文章](/Projects/node_getArticle.html)。渲染成PDF只是这个库的一个小功能，比如还可以用它截图。

`screenshot`是`page`实例中的一个方法，主要有以下配置项。可以全屏截图，也可以提供坐标和长宽对指定区域截图。
![](https://i.loli.net/2020/05/17/qTpxBc3mKh59LSI.png)

使用上倒是其次，安装puppeteer库倒是更麻烦点，因为这个需要下载一个完整的chrome应用，如果因为网络原因下载不了。可以在package.json中只安装其核心即`puppeteer-core`。在使用的时候自行配置本地的下载好chrome程序。这里不展开讲，可以搜索得到相关解决方案。以对知乎官网全屏截图为例。
```javascript
const puppeteer = require("puppeteer-core");

async function getPic() {
  const browser = await puppeteer.launch({
    executablePath: "./chrome-win/chrome.exe",
  });
  const page = await browser.newPage();
  await page.goto("https://zhihu.com", {
    waitUntil: 'networkidle0',
  });
  await page.setViewport({ width: 1980, height: 1080 });
  await page.content();
  await page.screenshot({
    path: "zhihu.png",
    type: "jpeg",
    quality: 100,
    fullPage: true
  });

  await browser.close();
}

getPic();
```
声明`browser`实例就配置了相对路径的本地应用，`executablePath: "./chrome-win/chrome.exe"`。有些单页面应用或许还要配置等待所有请求加载完毕，即`waitUntil: 'networkidle0'`。

截图效果如下：
![](https://i.loli.net/2020/05/17/FspBZGebKfudtWM.png)

而如果要对指定区域截图，就要知道截图区域的坐标和长宽。一般来说，需要截图的部分都会有一个完整的DOM元素来渲染，如果不是，那就把它写在一个DOM元素内。

而对于如何获取一个DOM元素在页面上的位置，需要用到这几个DOM中的属性，`offsetleft` `offsettop` `offsetWidth` `offsetheight`。如果布局上有特殊的情况，那坐标的获取可能还需要特殊处理。

坐标拿到了，截图也跑通了。但似乎还有另一个问题：坐标只是存在于页面上，而需要坐标的是node端。如何构建其node和页面的桥梁将坐标传递给node。这就要用到page实例中的`evaluate`方法，该方法可以传递两个参数：`pageFunction`和`args`。前者是要在当前页面实例执行的方法，后者是要传递给当前方法的参数。用在这里就是，页面上将获取好的元素坐标信息放到window对象中，那在`pageFunction`中return `window`对象上的相关信息就好了。有时还需要将相关数据传递到页面供其使用，这个时候就是用第二个参数。代码如下：
```javascript
const position = await page.evaluate(() => {
    // eslint-disable-next-line no-undef
    return window.elePostion
})
```
拿到坐标后就可以依次截图了，截图可以保存为本地文件，也可以拿到该图片的buffer。