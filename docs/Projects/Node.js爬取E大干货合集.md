---
title: Node.js爬取E大干货合集
---
有知有行去年上线了一个很赞的栏目——E大干货合集，如果你想了解E大是谁，可以点击这个[链接](https://youzhiyouxing.cn/materials/673)。

受到微信读书各种浏览器插件启发，同时也想写个代码练练手，便产生了整理E大干货合集中所有“金句”的想法。

## 代码的逻辑
干货合集中分了三个模块，每个模块包含多篇文章。投资理念、投资策略和人生哲学三个模块下的金句我都已经导出，有需要的朋友可以在公众号后台回复“ETF拯救世界”获取完整版。

在此项目中，对于金句的定义是文章中被标注的内容，包括作者(整理合集的有知有行工作人员)标注的、热门划线的和个人标注的。

由此，获取所有金句的逻辑便是，先获取模块下包含的文章，再逐个获取文章中的金句，然后再写入到文件中。

但是在有知有行官网的页面处理逻辑上，作者标注和另外两个标注的实现方式有区别，前者是服务端渲染的，后者是脚本逻辑处理的，所有在金句获取的逻辑上也要区别处理。

## 核心代码
以下是对核心代码逻辑的分析，完整代码点击文末原文链接。

如上所述，需要先获取模块下的文章列表。这里使用`cheerio`直接获取文档内容就可整理出所有文章的标题和对应的url。

对于服务端渲染的内容，都可以使用这种方式，这也包括上面说到的作者标注金句。
```javascript
// 页面内容
const pageContent = cheerio.default.load(await request.text())
// 原始的文章列表数据
const articleListOrigin = pageContent('.materials li a')
// 处理后的文章列表
const articleList = []

//获取当前模块中文章的标题和url
for (let i = 0; i < articleListOrigin.length; i++) {
  const current = articleListOrigin.eq(i)
  articleList.push({
    url: current.attr('href'),
    title: current.text()
  })
}
```

而对于脚本处理的金句内容，就无法通过直接在文档内获取，而是需要puppeteer，模拟正常的网页访问，然后获取网页内容。

```javascript
await page.goto(`${siteUrl}${item.url}`, {waitUntil: 'networkidle0'})

// 获取目标内容
const selector = args[1] === 'hotLine' ? '.zx-rangy-hot' : '.zx-rangy-mark'
item.markContent = await page.$$eval(selector, function getText(ele) {
  return ele.map(e => e.innerText)
})
```


## 代码的使用
在命令行中执行index.js文件，需配置参数，第一个参数为模块名称，第二个参数为划线类型。

```markdown
可选的模块名称：
- idea
- strategy
- philosophy

可选的划线类型
- official
- hotLine
- personal
```
举个例子
```javascript
node index idea official 
```
由于有知有行网站需要登录后才能浏览文章，在使用此代码时，需要获取有效的cookie。

具体方法为，在浏览器（建议chrome）中打开有知有行官网[此链接](https://youzhiyouxing.cn/topics/ezone/nodes/2) 后，
点击鼠标右键选择检查，出现开发人员工具界面，点击network一栏，刷新页面，找到 path 为 `topics/ezone/nodes/2`的请求，点击右键后如图操作。

![](img/Snipaste_2022-03-03_20-54-18.png)

替换掉当前目录下 config 文件中requestHeader 等号后的值。


## 使用提示
代码中使用到了`puppeteer`这个依赖，但是由于安装`puppeteer`过程中，需要下载 `chromium`，失败概率较高。

本代码使用本地下载好的的chromium， 也即如下代码中对应的逻辑，如果代码执行报相关错误，需要保证该路径下有可执行的 chrome 程序。

```javascript
const browser = await puppeteer.launch({
    executablePath: './chrome-win/chrome.exe',
  });

当然，除此之外，还有别的办法可以解决，此处不再赘述，可自行上网搜寻。
```
