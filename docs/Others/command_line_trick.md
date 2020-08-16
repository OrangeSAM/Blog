---
title：命令行基本使用
---

方方有说，写程序不用命令行，不如回家卖肥肠。

#### 关于命令行的一些前置知识

##### 概念

shell，中文意思为`壳`，是指为使用者提供操作界面的软件，接收用户命令，然后调用相应的应用程序。我们常说的shell一般是指命令行式shell，而我们在Git中的用的bash是其中的一种shell。除了执行用户直接输入的命令外，bash还能从文件中读取命令，这样的文件称为脚本。后面提及的bashrc就是一种脚本文件

##### 命令

`touch`在当前路径新建一个文件

`mkdir`新建目录

`cd`进入某个目录

`pwd`查看当前路径

`rm`删除当前目录

`mv`重命名文件


#### 使用z快速跳转

使用命令在各个路径下操作的时候，由于不会像文件管理系统一样有路径导航，在跳转几次之后可能就忘记来时的路了。此时如果有一个工具能帮助我们记录最近操作的一些路径，那相比之下会好很多。`Z`就是一个这样的工具。

你对于它的理解可以是，一个增强bash功能的插件，先到GitHub搜索`Z`，一般情况下第一个就是了。clone或者download之后，到bash的初始化文件.bashrc中写入对于刚刚`Z`的引用。如下图。f是我盘符，前面有一个`.`+ 空格，点也可以换成source。

![](https://user-gold-cdn.xitu.io/2019/7/7/16bccbc5ef8f8218?w=197&h=22&f=png&s=923)

安装完之后就可以输入`Z`查看最近使用的路径，或者直接输入`Z +` 刚刚路径中的某个关键字，如下图。当然你还可以为`Z`专门配置一个alias(别称)，这样可以使得你的命令更具语义化，比如改成把`Z`改成`jump`(命令`alias jump = 'z'`)。在配置完bashrc后，本应关掉bash窗口重启才有效，使用`. ~/.bashrc`让刚刚的改动立即生效。

![](https://user-gold-cdn.xitu.io/2019/7/7/16bccbdfa2c1bba2?w=303&h=162&f=png&s=5700)


#### alias的使用
如果你在日常的开发不使用开发环境中配好的Git功能而选择使用命令进行Git操作，那对常使用的Git 命令进行alias设置会较大程度地提高你的开发效率。

值得一改的alias
```
alias gi='git init'
alias gs='git status'
alias ga='git add'
alias gp='git push'
alias gl='git pull'
```
需要注意的是，编写别名时`=`两边不能有空格，否则无效。所以在.bashrc文件中写入需要的简化操作格式是：alias command='the original command'。

#### 让你的bash好看点
吸引你走入的编程世界的或许就是Windows cmd那个黑洞洞的窗口，但“陷入”其中后你可能就会觉得这框也太丑了，git bash也和cmd差不了多少。

那对于外观的稍微改变可以从以下几个方面着手(此处只讨论git bash)，代码字体、界面颜色与风格、界面窗口大小。字体我现在是使用consolas，你也可以选择使用稍微粗点的souce code Pro for PowerLine，可在GitHub搜索下载。此外，还可以设置bash主题变暗或亮以及窗口透明度。对于窗口大小，你可以设置一打开时的大小是矮肥还是瘦高。

![](https://user-gold-cdn.xitu.io/2019/7/7/16bcd09e6d8af7ee?w=595&h=657&f=png&s=222027)

显示乱码问题，在使用ping命令的时候都会遇到黑白相间的小方块，那就是乱码，可以更改字符集为GBK解决，但此时用`curl`命令又会出现乱码，所以这应该是一个不可调和的矛盾。


![](https://user-gold-cdn.xitu.io/2019/7/7/16bcd0aa3422fa6c?w=564&h=400&f=png&s=92181)

#### tree命令的使用
mac上有一个以树形化显示当前目录结构的`tree`命令，但是Windows上没有。仍可以按照第一步安装`Z`插件的思路进行操作，网络有对应的tree命令文件下载，下载[链接](https://sourceforge.net/projects/gnuwin32/files/tree/1.5.2.2/tree-1.5.2.2-setup.exe/download?use_mirror=jaist)，安装路径可以选择在Git的bin目录下。

安装完后，在bashrc文件引入即可使用，脚本是`export PATH="$PATH:/c/Software/GnuWin32/bin/"`，path后面的内容按照你的实际安装路径输入。以我resume小项目为例。
![](https://user-gold-cdn.xitu.io/2019/7/7/16bcd124945c28a6?w=446&h=381&f=png&s=122201)
#### 提高效率的快捷键
只要你快捷键耍的够快，其他程序员就看不懂你的操作。: )   

在git bash中复制粘贴，可在选项中设置选中复制，粘贴则是鼠标中键。

![](https://user-gold-cdn.xitu.io/2019/7/7/16bcd18d3c83944f?w=387&h=135&f=png&s=6861)
命令行中的其他快捷键：
`Ctrl + A`到达行首

`Ctrl + E`到达行尾(end)

`Ctrl + B`在代码中后退 (back)

`Ctrl + F`在代码中前进 (forward)

`Ctrl + W`删除一个单词

`Ctrl + K`删除以光标开始的后面代码(kill)

`Ctrl + C`中端当前操作(cancel)
对于上面命令的使用录了个Gif。
![](https://user-gold-cdn.xitu.io/2019/7/8/16bcd373ba0aeb86?w=594&h=241&f=gif&s=148356)

谢谢看完，觉得不错欢迎点个赞^_^。