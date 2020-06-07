---
title: VuePress搭建博客
sidebarDepth: 10
---
## VuePress是什么
仅从单词上来看就是vue和press，press除了按压的意思外，还有报刊杂志和出版社等意思，所以可以理解为由vue驱动的出版工具。换个说法就是**静态博客编写工具**。
后六字应该都不必解释，静态相对于动态而言即没有后端和数据库的参与，博客的生成仅依赖前端。

与之类似的工具还有Hexo、hugo和jekyll等，今天的主角是VuePress。
![首页.png](https://i.loli.net/2020/06/07/rLh3ojOdlq5BGsT.png)


## 写东西的一点历史
最开始的写东西是直接OneNote上，不管是记学习笔记还是写长篇东西，但OneNote本质上只是一个记录的工具，不便与更多人分享里头的东西，
多少有些浪费。此外，OneNote的单页是一个没有边界的画布，里头可以有文字，可以有图片，甚至视频等文件内容，以至于在内容上显得略微有些松散（用过的朋友应该就懂）。

后面接触到Markdown语言后，就有将OneNote上可以公开的文字都转移到github的仓库上的想法，配合VScode中Markdown相关的插件以及图床，就可以愉快地写东西了。但到这里，
也还是没有把写的东西发布出来，要发在公号上或者掘金上仍然需要手动复制到各平台上。

再到最近接触到VuePress这样的静态博客构建工具后，就准备把纯Markdown格式的文章迁移到VuePress中。其实在这之前也知道了Hexo这样的工具，只是懒一直没行动。VuePress是2018年时尤大(尤雨溪)编写的轻量级静态网站生成器，当时是为了Vue自己的子项目文档的需求而创建的。
将纯Markdown博客迁移到VuePress博客的过程几乎无痛，VuePress本来需要渲染的内容也是Markdown。用VuePress之后，就很好地将写东西和发布内容结合在一块。

## VuePress的使用
以下的内容不会考虑到所有的环境情况和使用情况，也不会完全按照文档中的内容分享，更多的是我如何使用VuePress生成我的博客，以及在这个过程中的一些踩坑。
建议你在搭建的时候还是多看文档，毕竟[文档](https://vuepress.vuejs.org/zh/)的内容才是最全的。

### 安装VuePress
前面说到，我是已有一个由Markdown文件组成的博客仓库，现在要做的就是为这个仓库添加VuePress相关依赖如下。可以全局安装也可以本地安装，
不妨碍正常使用就行。
```json {2}
"dependencies": {
  "vuepress": "^1.5.0"
}
```

安装完成之后，可以继续在这个文件中添加相关运行命令，`dev`是供写东西时本地预览用的；`build`则是将这些markdown文件编译成一个静态的网站；`deploy`是将博客发布到线上，后面会用上。
```json
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "deploy": "start deploy.sh",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
### 目录结构
我的代码结构如图

![](https://i.loli.net/2020/06/07/hxQiXrTGRob9n4a.png)

其中一个最主要的配置就是 .vuepress 目录下的`config.js`文件，这个文件需要包含你希望这个博客拥有的所有配置。
比如博客的名称和描述、对markdown文件的配置、导航栏和侧边栏的内容。在和`.vuepress`平级的目录存放的就是你的文章文件，
最简单的，你可以这个目录下添加一个readme文件，然后在终端中执行`npm run dev`的命令，如果你的`config.js`文件中什么都没有配置，
会看到一个如下几乎空白的界面，这就说明`VuePress`运行成功了。当你修改了`config.js`中的配置时，需要重新运行命令。（ctrl + c停止命令）

![](https://i.loli.net/2020/06/07/8w7xdOAKbucVLRU.png)

### 添砖加瓦
能运行之后，我觉得最重要的事是设想一下的博客结构应该是怎样的，比如导航栏应该要有哪些东西，侧边栏要有哪些东西，侧边栏应不应该随着导航栏变动，或者导航栏只是
侧边栏部分页面的快捷方式。

这里说说我的结构，之前在纯Markdown文件的博客，没有分类的概念，所有目录都是平级存放，比如LeetCode刷题和JavaScript。但实际上他们是两个不同的类别，一个是语言学习，一个是语言的运用。
所以在这个博客中，我为他们设置了不同的侧边栏，即LeetCode有单独自己的侧边栏配置，而语言学习又是另外的一组配置。这在侧边栏的配置叫**多个侧边栏**。


### 导航栏的配置
导航栏的配置较为简单，是一个有对象组成的数组。对象中需要配置`text`(该项导航要显示的名称)、和`link`(该项导航要去去向的地方)。`link`可以是站内链接，也可以是站外链接。
你甚至还可以在对象中配置`target`属性。此外，如果当你在对象中配置了`item`数组而不是单一的`link`时，该项导航会显示为一个下拉列表，在友链的配置中，`item`数组的配置就能排上用场。

![](https://i.loli.net/2020/06/07/VDrgNTIlYLae64H.png)

### 侧边栏的配置
说是侧边栏，本质上是各页面路由的配置。在VuePress中对于路由有如下约定。所以在第一次尝试的时候，你只有一个readme文件，并且`config`中没有任何配置，readme文件里的内容
也能正常显示在页面上。

|  文件的相对路径   | 页面路由地址  |
|  ----  | ----  |
| `/README.md`  | `/` |
| `/guide/README.md ` | `/guide/` |
| `/config.md ` | `/config.html` |

#### 数组形式
以如下代码为例，`sidebar`为一个对象数组，一个对象即一个可收缩的侧边栏分组，我们把用对象的形式分割开各路由称为**侧边栏分组**，
这样的侧边栏默认出现在几乎所有页面。路由配置不限制markdown文件目录，可随意配置有效的文件路径。甚至，你还可以往数组中添加不分组单独存在的文件路径，
```js
let sidebar = [ 
  {
    title: "浏览器",
    collapsable: true,
    sidebarDepth: 2,
    children: [
      "/Browser/character_byte_chinese",
      "/Browser/how_browser_works",
      "/Browser/url_to_display",
    ]
  },
  "/Browser/how_browser_works",
]
```
#### 对象形式
这种形式跟上面一种刚好相反，主要由数组构成了对象的value，如下代码所示。`/brower/`意味着这是一个单独的侧边栏，这样就可以实现为不同的页面组
显示不同的侧边栏。同样，你也可以直接在数组中写markdown文件的路径，而不用分组的形式。
```javascript
let sidebar = {
  "/browser/": [
    "/Browser/url_to_display",
    {
      title: "浏览器",
      sidebarDepth: 2,
      children: [
        "/Browser/url_to_display",
      ]
    }
  ]
}
```

### 首页的配置
首页的配置较为简单，按照文档说得来就行了。以下是我的配置，需要注意的是`heroImage`的图片路径需要是 .vuepress 目录下的 public 路径。
如果你要配置 favico，文件的路径也建议是这里。
```yaml
home: true
heroImage: /hero.jpg
heroText: 一笔的博客
tagline: 对技术、对生活的思考
actionText: 一窥乾坤
actionLink: /LearnTech/Javascript/apply_call_bind
footer: MIT Licensed | Copyright © 2020 刘一笔
```

### 内置的搜索
在第一次尝试的时候，你会看到，即便没有任何配置，也会出现一个搜索框。这个搜索框是自带的，能够为页面的标题、h2、h3以及tags构建索引。

但我遇到了一个坑，最开始配置VuePress的时候，我的版本还是`1.4.0`，这个版本的内置会搜索不到中文内容。此时，只要将`VuePress`升级版本就好了。我现在的VuePress
版本是`1.5.0`。

### 发布博客
使用VuePress的一个目的就是更方便配合GitHub Pages将博客的部署到线上，而不是只能线上预览。

部署之前，需要满足以下条件：
1. 文档放置在项目的docs目录中。
    这就是说，你的Markdown文件（博客内容）需要在`docs`目录下，而不能超出
2. 使用的是默认的构建输出位置
    即没有更改相关的webpack编译配置。
3. 安装了VuePress并且配置了如下npm scripts，因为后面有发布的deploy命令需要用到build命令。
```json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

我是将博客部署在GitHub Pages上，所以这里也只分享对应的配置。

首先需要在`config.js`中设置正确的`base`，比如你打算发布到 `https://<USERNAME>.github.io/<REPO>/（也就是说你的仓库在 https://github.com/<USERNAME>/<REPO>）`，则将 `base` 设置为 `"/<REPO>/"`。
需要注意的是，前后的斜杠不能少。

然后在项目中，创建如下的`deploy.sh`文件（一般是在根目录下）。因为我是发布到自定义域名商，所以注释了部分用不上的代码。创建这个文件的目的是每次发布
的时候不用手动输出如下命令，而是让脚本自行执行。你甚至可以在`package.json`配置相关命令，而不用手动执行脚本。
```shell script
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
 echo 'blog.yibi.host' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:OrangeSAM/Blog.git master:gh-pages

cd -
```
我`package.json`中的scripts，windows可能会遇到`bash deploy`失效的情况，我是替换成`start`就可以了。
```json {4}
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "deploy": "start deploy.sh",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
### 踩坑
小坑不说，一般都是因为自己“近视”造成的。这里分享个我遇到的大坑，当然这个坑也不是`VuePress`造成的，而是因为自己之前写文档时不够规范导致的。

之前在学习`Vue-Router`的时候，也在博客中记录相关的笔记，很多没用代码块包裹，其中一行就是有一个直接的`<router-view>`标签，因为`VuePress`中
有一个`loader`来将`Markdown`文件处理为Vue文件。编译时遇到直接为代码而不是文本的`<router-view>`自然也就报错了。心累的是，当时我已经添加了很多
博客文件，且没有意识到这会导致问题，只好用二分法慢慢排除 =_=|| 。

这篇没有讲的特别细，只是将自己配置完之后觉得重要的地方分享出来，有些细节还是需要看官方文档。

**配置好这些之后，更重要的是写博客。毕竟，搭建博客不是目的，只是手段，写博客才是我们的目的。**